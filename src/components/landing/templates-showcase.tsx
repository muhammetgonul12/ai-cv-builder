import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TemplatesShowcase() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Şablon Önizlemeleri</h2>
        <Badge className="border border-violet-300/30 bg-violet-500/10 text-violet-200">
          3 Premium Seçenek
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="group overflow-hidden border-zinc-300/30 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(228,228,231,0.18)]">
          <CardContent className="space-y-4 p-5">
            <div className="relative h-32 rounded-xl border border-zinc-200/25 bg-gradient-to-br from-zinc-200/50 via-zinc-100/30 to-zinc-400/30">
              <div className="absolute inset-3 rounded-lg bg-white/65 p-3">
                <div className="h-2 w-20 rounded-full bg-zinc-700/70" />
                <div className="mt-3 grid gap-2">
                  <div className="h-2 rounded-full bg-zinc-500/50" />
                  <div className="h-2 w-5/6 rounded-full bg-zinc-500/40" />
                  <div className="h-2 w-4/6 rounded-full bg-zinc-500/35" />
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-zinc-200/20 text-zinc-100">
              Minimal
            </Badge>
            <p className="text-sm text-zinc-400">Temiz ve kurumsal görünüm</p>
            <Link
              href="/dashboard?template=minimal"
              className={buttonVariants({
                size: "sm",
                className: "h-8 rounded-lg bg-zinc-200/20 text-zinc-100 hover:bg-zinc-200/30",
              })}
            >
              Canlı Dene
            </Link>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-violet-300/40 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]">
          <CardContent className="space-y-4 p-5">
            <div className="relative h-32 rounded-xl border border-violet-200/20 bg-gradient-to-br from-violet-500/55 via-fuchsia-500/45 to-indigo-500/35">
              <div className="absolute inset-3 rounded-lg bg-black/20 p-3">
                <div className="h-2 w-20 rounded-full bg-violet-100/90" />
                <div className="mt-3 grid gap-2">
                  <div className="h-2 rounded-full bg-white/40" />
                  <div className="h-2 w-5/6 rounded-full bg-white/30" />
                  <div className="h-2 w-4/6 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-violet-500/25 text-violet-100">
              Modern
            </Badge>
            <p className="text-sm text-zinc-400">Startup odaklı premium stil</p>
            <Link
              href="/dashboard?template=modern"
              className={buttonVariants({
                size: "sm",
                className:
                  "h-8 rounded-lg bg-violet-500/25 text-violet-100 hover:bg-violet-500/35",
              })}
            >
              Canlı Dene
            </Link>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-cyan-300/50 bg-[#111111] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(34,211,238,0.35)]">
          <CardContent className="space-y-4 p-5">
            <div className="relative h-32 rounded-xl border border-cyan-200/25 bg-gradient-to-br from-cyan-400/55 via-blue-500/45 to-emerald-400/40">
              <div className="absolute inset-3 rounded-lg bg-black/30 p-3">
                <div className="h-2 w-20 rounded-full bg-cyan-100/95" />
                <div className="mt-3 grid gap-2">
                  <div className="h-2 rounded-full bg-cyan-100/45" />
                  <div className="h-2 w-5/6 rounded-full bg-blue-100/30" />
                  <div className="h-2 w-4/6 rounded-full bg-emerald-100/25" />
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-cyan-500/25 text-cyan-100">
              Siberpunk
            </Badge>
            <p className="text-sm text-zinc-400">Cesur ve futuristik tasarım</p>
            <Link
              href="/dashboard?template=cyberpunk"
              className={buttonVariants({
                size: "sm",
                className: "h-8 rounded-lg bg-cyan-500/25 text-cyan-100 hover:bg-cyan-500/35",
              })}
            >
              Canlı Dene
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
