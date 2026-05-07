import { type CvData } from "@/types/cv";

export function MinimalTemplate({ data }: { data: CvData }) {
  return (
    <article className="space-y-5 rounded-2xl bg-white p-8 text-zinc-900 shadow-xl">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{data.fullName}</h2>
          <p className="text-lg text-zinc-600">{data.title}</p>
          <div className="mt-2 grid gap-1 text-xs text-zinc-600">
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
            className="h-28 w-28 rounded-2xl border border-zinc-300 object-cover"
          />
        ) : null}
      </header>
      <section>
        <h3 className="font-semibold">Hakkımda</h3>
        <p className="text-sm text-zinc-700">{data.about}</p>
      </section>
      <section>
        <h3 className="font-semibold">Eğitim</h3>
        <p className="text-sm whitespace-pre-line text-zinc-700">{data.education}</p>
      </section>
      <section>
        <h3 className="font-semibold">Deneyim</h3>
        <p className="text-sm whitespace-pre-line text-zinc-700">
          {data.experience}
        </p>
      </section>
      <section>
        <h3 className="font-semibold">Yetenekler</h3>
        <p className="text-sm whitespace-pre-line text-zinc-700">{data.skills}</p>
      </section>
      <section>
        <h3 className="font-semibold">Projeler</h3>
        <p className="text-sm whitespace-pre-line text-zinc-700">{data.projects}</p>
      </section>
      <section>
        <h3 className="font-semibold">Sertifikalar</h3>
        <p className="text-sm whitespace-pre-line text-zinc-700">
          {data.certificates}
        </p>
      </section>
      <section>
        <h3 className="font-semibold">Diller</h3>
        <p className="text-sm whitespace-pre-line text-zinc-700">{data.languages}</p>
      </section>
    </article>
  );
}
