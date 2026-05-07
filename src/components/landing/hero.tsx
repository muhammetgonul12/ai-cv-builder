import Link from "next/link";
import { Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
      <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-violet-500/30 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="relative space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1 text-sm text-violet-200">
          <Sparkles className="h-4 w-4" />
          Yapay Zeka Destekli CV Platformu
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Dakikalar İçinde Profesyonel CV Oluşturun
        </h1>
        <p className="max-w-2xl text-zinc-300">
          Yapay zeka destekli modern CV ve portföy oluşturucu ile kariyerinizi
          öne çıkarın.
        </p>
        <Link
          href="/dashboard"
          className={buttonVariants({
            size: "lg",
            className: "bg-violet-600 text-white hover:bg-violet-500",
          })}
        >
          Hemen Başla
        </Link>
      </div>
    </section>
  );
}
