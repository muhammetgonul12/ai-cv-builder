import { Badge } from "@/components/ui/badge";
import { type CvData } from "@/types/cv";

export function ModernTemplate({ data }: { data: CvData }) {
  return (
    <article className="space-y-6 rounded-2xl border border-white/15 bg-[#101018] p-8 text-white shadow-2xl">
      <header className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">{data.fullName}</h2>
          <p className="text-violet-300">{data.title}</p>
          <div className="grid gap-1 text-xs text-zinc-400">
            <p>Telefon Numarası: {data.phone}</p>
            <p>Email: {data.email}</p>
            <p>LinkedIn: {data.linkedin}</p>
            <p>GitHub: {data.github}</p>
          </div>
        </div>
        {data.photo ? (
          <img
            src={data.photo}
            alt={`${data.fullName} profil fotoğrafı`}
            className="h-28 w-28 rounded-2xl border border-white/20 object-cover"
          />
        ) : null}
      </header>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">Profil</h3>
        <p className="text-sm text-zinc-200">{data.about}</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">Eğitim</h3>
        <p className="text-sm whitespace-pre-line text-zinc-200">{data.education}</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">Deneyim</h3>
        <p className="text-sm whitespace-pre-line text-zinc-200">{data.experience}</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">Yetenekler</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.split("\n").map((skill) => (
            <Badge key={skill} className="bg-violet-500/20 text-violet-100">
              {skill}
            </Badge>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">Projeler</h3>
        <p className="text-sm whitespace-pre-line text-zinc-200">{data.projects}</p>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">
          Sertifikalar
        </h3>
        <p className="text-sm whitespace-pre-line text-zinc-200">
          {data.certificates}
        </p>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-zinc-400">Diller</h3>
        <p className="text-sm whitespace-pre-line text-zinc-200">{data.languages}</p>
      </section>
    </article>
  );
}
