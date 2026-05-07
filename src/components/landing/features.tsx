import { Bot, Download, Eye, LayoutTemplate } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: Bot, title: "AI İçerik Üretimi", desc: "Biyografi ve proje metinleri." },
  { icon: Eye, title: "Canlı Önizleme", desc: "Anında CV çıktısı görünümü." },
  { icon: LayoutTemplate, title: "3 Premium Şablon", desc: "Minimal, Modern, Siberpunk." },
  { icon: Download, title: "PDF Export", desc: "Tek tıkla indirilebilir CV." },
];

export function Features() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {features.map((item) => (
        <Card key={item.title} className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <item.icon className="h-5 w-5 text-violet-300" />
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-300">{item.desc}</CardContent>
        </Card>
      ))}
    </section>
  );
}
