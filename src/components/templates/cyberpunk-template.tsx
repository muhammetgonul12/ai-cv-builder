import { type CvData } from "@/types/cv";

export function CyberpunkTemplate({ data }: { data: CvData }) {
  return (
    <article className="space-y-5 rounded-2xl border border-fuchsia-400/50 bg-black p-8 text-fuchsia-100 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
      <header className="flex items-center justify-between gap-4 border-b border-fuchsia-400/30 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-wide text-fuchsia-300">
            {data.fullName}
          </h2>
          <p className="text-cyan-300">{data.title}</p>
        </div>
        {data.photo ? (
          <img
            src={data.photo}
            alt={`${data.fullName} profil fotoğrafı`}
            className="h-28 w-28 rounded-2xl border border-fuchsia-400/50 object-cover"
          />
        ) : null}
      </header>
      <section className="grid gap-1 text-xs text-fuchsia-200">
        <p>LinkedIn: {data.linkedin}</p>
        <p>Email: {data.email}</p>
        <p>GitHub: {data.github}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Hakkımda
        </h3>
        <p className="text-sm">{data.about}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Eğitim
        </h3>
        <p className="text-sm whitespace-pre-line">{data.education}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Deneyim
        </h3>
        <p className="text-sm whitespace-pre-line">{data.experience}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Yetenekler
        </h3>
        <p className="text-sm whitespace-pre-line">{data.skills}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Projeler
        </h3>
        <p className="text-sm whitespace-pre-line">{data.projects}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Sertifikalar
        </h3>
        <p className="text-sm whitespace-pre-line">{data.certificates}</p>
      </section>
      <section>
        <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-cyan-300">
          Diller
        </h3>
        <p className="text-sm whitespace-pre-line">{data.languages}</p>
      </section>
    </article>
  );
}
