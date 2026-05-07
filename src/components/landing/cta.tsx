import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="rounded-3xl border border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-8 text-center">
      <h3 className="text-2xl font-bold text-white">
        Kariyerin için güçlü bir ilk izlenim bırak
      </h3>
      <p className="mt-2 text-zinc-300">
        Yapay zeka ile profesyonel CV&apos;ni şimdi oluştur.
      </p>
      <Link
        href="/dashboard"
        className={buttonVariants({
          className: "mt-5 bg-violet-600 hover:bg-violet-500",
        })}
      >
        Hemen Başla
      </Link>
    </section>
  );
}
