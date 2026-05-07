import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prompts, type PromptType } from "@/lib/prompts";

function parseItems(input?: string) {
  return (input ?? "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function pickBySeed<T>(items: T[], seedText: string, offset = 0) {
  if (items.length === 0) return undefined;
  const seed = [...seedText].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return items[(seed + offset) % items.length];
}

function getMockText(type: PromptType, payload: Record<string, string>) {
  const title = payload.title?.trim() || "Yazılım mühendisi adayı";
  const about = payload.about?.trim() || "";
  const projectText = payload.projects?.trim() || "";
  const nonce = payload.nonce?.trim() || "";
  const skills = parseItems(payload.skills);
  const primarySkill = skills[0] || "modern backend teknolojileri";
  const secondarySkill = skills[1] || "yapay zeka uygulamaları";

  const toneOptions = [
    "disiplinli ve çözüm odaklı",
    "analitik düşünen ve öğrenmeye açık",
    "ürün ve kullanıcı etkisine odaklanan",
  ];
  const impactOptions = [
    "ölçeklenebilir sistemler geliştirmeyi",
    "yüksek performanslı servis mimarileri kurmayı",
    "iş değeri üreten yazılım çözümleri tasarlamayı",
  ];
  const selectedTone = pickBySeed(toneOptions, `${title}${about}`) ?? toneOptions[0];
  const selectedImpact =
    pickBySeed(impactOptions, `${title}${primarySkill}`, 1) ?? impactOptions[0];

  if (type === "bio") {
    return `${title} olarak ${selectedTone} bir çalışma yaklaşımı benimsiyorum. ${primarySkill} ve ${secondarySkill} alanlarında kendimi sürekli geliştiriyor, ${selectedImpact} hedefliyorum. Ekip içi iletişime önem veren, sorumluluk alan ve teknik kaliteyi önceliklendiren bir geliştiriciyim.`;
  }

  if (type === "linkedin") {
    const fullName = payload.fullName?.trim();
    const experience = payload.experience?.trim();
    const education = payload.education?.trim();
    const profileFocus = about
      ? `Profilimde özellikle ${about.slice(0, 80)}... yaklaşımımı vurguluyorum.`
      : "Profilimde backend, sistem tasarımı ve yapay zeka odaklı çalışma yaklaşımımı vurguluyorum.";
    const intro = fullName
      ? `Merhaba, ben ${fullName}. ${title} olarak`
      : `${title} olarak`;
    const expLine = experience
      ? `Deneyim tarafında ${experience.slice(0, 90)}... başlıklarında aktif olarak çalışıyorum.`
      : "Backend geliştirme ve ürün odaklı mühendislik yaklaşımıyla aktif üretim yapıyorum.";
    const eduLine = education
      ? `Eğitim geçmişim ${education.slice(0, 80)}... ile teknik temelimi güçlendiriyor.`
      : "";
    return `${intro} yazılım geliştirme yolculuğumda ${primarySkill} ve ${secondarySkill} üzerine yoğunlaşıyorum. ${profileFocus} ${expLine} ${eduLine} Gerçek problemleri teknik doğrulukla çözen, sürdürülebilir ve ölçeklenebilir ürünler geliştirmeyi hedefliyorum.`.trim();
  }

  if (type === "project") {
    const projectItems = parseItems(projectText);
    const projects = projectItems.length > 0 ? projectItems : ["Bu proje"];
    const focusPool = [
      "ölçeklenebilir mimari",
      "performans optimizasyonu",
      "kullanıcı deneyimi",
      "bakımı kolay kod yapısı",
    ];
    const valuePool = [
      "gerçek kullanım senaryolarında daha hızlı sonuç üretir",
      "ekibin geliştirme hızını artırır",
      "ürün kalitesini sürdürülebilir şekilde yükseltir",
      "son kullanıcı tarafında daha akıcı bir deneyim sağlar",
    ];
    const closePool = [
      "Bu yaklaşım, projenin teknik borcunu azaltırken uzun vadeli gelişime de açık bir temel oluşturur.",
      "Sonuç olarak proje, hem teknik ekip hem de kullanıcı tarafında ölçülebilir bir iyileşme sunar.",
      "Böylece proje, hızlı iterasyona uygun ve üretim ortamında güvenle sürdürülebilir hale gelir.",
    ];

    const enhanced = projects.map((project, index) => {
      const focus =
        pickBySeed(focusPool, `${project}${nonce}`, index) ?? focusPool[0];
      const value =
        pickBySeed(valuePool, `${project}${title}${nonce}`, index + 2) ??
        valuePool[0];
      return `${project}: ${focus} odaklı yeniden ele alınmış, modern geliştirme pratikleriyle güçlendirilmiş ve ${value}.`;
    });

    const closing =
      pickBySeed(closePool, `${projectText}${nonce}`, enhanced.length) ??
      closePool[0];
    return `${enhanced.join("\n")}\n${closing}`;
  }

  const suggestionsPool = [
    "TypeScript",
    "Node.js",
    "Express.js",
    "NestJS",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Redis",
    "GitHub Actions",
    "CI/CD",
    "REST API Tasarımı",
    "Sistem Tasarımı",
  ];
  const existing = new Set(skills.map((skill) => skill.toLowerCase()));
  const suggestions = suggestionsPool
    .filter((item) => !existing.has(item.toLowerCase()))
    .slice(0, 6);
  return suggestions.join(", ");
}

async function resolveAvailableModels(apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    let detail = "";
    try {
      const err = (await response.json()) as { error?: { message?: string } };
      detail = err.error?.message ?? "";
    } catch {
      detail = "";
    }
    throw new Error(
      detail
        ? `Model listesi alınamadı: ${detail}`
        : "Model listesi alınamadı."
    );
  }

  const data = (await response.json()) as {
    models?: Array<{ name?: string; supportedGenerationMethods?: string[] }>;
  };

  const available = (data.models ?? [])
    .filter((model) =>
      (model.supportedGenerationMethods ?? []).includes("generateContent")
    )
    .map((model) => (model.name ?? "").replace("models/", ""))
    .filter(Boolean);

  const preferredOrder = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
  ];

  const preferredAvailable = preferredOrder.filter((name) =>
    available.includes(name)
  );

  return preferredAvailable.length > 0 ? preferredAvailable : available;
}

export async function POST(request: Request) {
  try {
    const useMockAi = process.env.USE_MOCK_AI === "true";
    const apiKey = process.env.GEMINI_API_KEY;
    const body = (await request.json()) as {
      type: PromptType;
      payload: Record<string, string>;
    };
    const allowedTypes: PromptType[] = ["bio", "linkedin", "project", "skills"];
    if (!body?.type || !allowedTypes.includes(body.type)) {
      return NextResponse.json(
        { error: "Geçersiz AI işlem türü gönderildi." },
        { status: 400 }
      );
    }

    if (useMockAi || !apiKey) {
      return NextResponse.json({ text: getMockText(body.type, body.payload ?? {}) });
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key bulunamadı. .env.local dosyasını kontrol edin." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let promptText = "";
    if (body.type === "bio") promptText = prompts.bio(body.payload.title ?? "");
    if (body.type === "linkedin") {
      promptText = `${prompts.linkedin(body.payload.title ?? "")}
CV Bilgileri:
- Ad Soyad: ${body.payload.fullName ?? ""}
- Ünvan: ${body.payload.title ?? ""}
- Hakkımda: ${body.payload.about ?? ""}
- Yetenekler: ${body.payload.skills ?? ""}
- Deneyim: ${body.payload.experience ?? ""}
- Eğitim: ${body.payload.education ?? ""}
Çıktıyı tek parça, paylaşılabilir bir LinkedIn özeti olarak üret.`;
    }
    if (body.type === "project") {
      promptText = `${prompts.project(body.payload.projects ?? "")}
Her proje satırını ayrı değerlendir ve çıktıyı satır satır geri döndür.`;
    }
    if (body.type === "skills") {
      promptText = prompts.skills(body.payload.skills ?? "");
    }

    const modelsToTry = await resolveAvailableModels(apiKey);
    if (modelsToTry.length === 0) {
      return NextResponse.json(
        { error: "Kullanılabilir Gemini modeli bulunamadı." },
        { status: 500 }
      );
    }

    let lastErrorMessage = "Gemini yanıt veremedi.";
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(promptText);
        const text = result.response.text();

        if (text?.trim()) {
          return NextResponse.json({ text });
        }
      } catch (error) {
        lastErrorMessage =
          error instanceof Error ? error.message : "Gemini isteği başarısız oldu.";
      }
    }

    return NextResponse.json(
      {
        error: `AI isteği başarısız: ${lastErrorMessage}`,
        fallbackText: getMockText(body.type, body.payload ?? {}),
      },
      { status: 500 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
