import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteCta } from "@/components/site-cta"
import { instagramHref } from "@/content/home"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/8 pt-18 sm:pt-20 lg:pt-22">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(circle_at_top_left,rgba(44,122,80,0.12),transparent_38%),radial-gradient(circle_at_top_right,rgba(245,196,0,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="site-shell relative z-10 pb-10 sm:pb-12 lg:pb-14">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center xl:gap-10">
          <div className="max-w-[30rem] space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--primary)]/55" />
              <p className="site-kicker site-kicker-accent">Camisas selecionadas</p>
            </div>

            <div className="space-y-3">
              <h1 className="font-heading text-[34px] uppercase leading-[0.92] tracking-[0.06em] text-foreground sm:text-[44px] lg:text-[56px] xl:text-[64px]">
                Camisas de futebol
                <span className="mt-1.5 block text-[var(--primary)]">
                  para clubes e seleções
                </span>
              </h1>

              <p className="max-w-[28rem] text-[14px] leading-7 text-[#b8b1a6] sm:text-[15px] sm:leading-7">
                Modelos de clubes e seleções com apresentação clara e atendimento
                direto.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
              <SiteCta href="#destaques" className="px-5">
                Ver destaques
                <ArrowRight className="h-3.5 w-3.5" />
              </SiteCta>

              <SiteCta
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="px-5"
              >
                Abrir atendimento
                <ArrowUpRight className="h-3.5 w-3.5" />
              </SiteCta>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-x-10 top-6 h-36 rounded-full bg-[radial-gradient(circle,rgba(245,196,0,0.14),transparent_72%)] blur-3xl" />

            <div className="site-surface site-shadow-panel overflow-hidden">
              <div className="relative aspect-[4/5] min-h-[18rem] overflow-hidden sm:aspect-[16/10] lg:aspect-[5/4]">
                <Image
                  src="/images/jogadores.png"
                  alt="Imagem principal com jogadores usando camisas de futebol"
                  fill
                  priority
                  sizes="(max-width: 639px) 100vw, (max-width: 1024px) 60vw, 52vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.04)_40%,rgba(0,0,0,0.18)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
