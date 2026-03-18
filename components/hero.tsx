import { SiteCta } from "@/components/site-cta"

export function Hero() {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden pb-14 pt-24 sm:pb-16 lg:pb-20 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,107,58,0.16),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(245,196,0,0.12),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0,transparent_42%,rgba(0,0,0,0.32)_62%,transparent_100%)] mix-blend-soft-light opacity-[0.2]" />

      <div className="site-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="max-w-[36rem] space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--accent-green)]" />
              <p className="site-kicker site-kicker-accent">
                xxxxx
              </p>
            </div>

            <h1 className="font-heading text-[38px] uppercase leading-[0.92] tracking-[0.06em] text-foreground sm:text-[52px] lg:text-[68px]">
              Camisas de futebol
              <br />
              <span className="text-[var(--primary)]">para quem veste o jogo</span>
            </h1>

            <p className="site-copy max-w-[33rem]">
            Cada camisa conta uma história. Aqui você encontra as dos clubes e seleções que você ama, com atendimento direto e sem complicação.
            </p>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <SiteCta
                href="google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8"
              >
                Entrar em contato
              </SiteCta>
              <a href="#colecao" className="site-cta-secondary">
                Ver coleção
                <span className="h-px w-7 bg-[#3a372f]" />
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-8 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.1),transparent_60%),radial-gradient(circle_at_bottom,rgba(26,107,58,0.14),transparent_60%)] opacity-80 blur-2xl" />
            <div className="site-shadow-panel relative inline-flex rotate-[-1.5deg]">
              <div className="site-panel relative min-w-[320px] max-w-[420px] overflow-hidden py-6 sm:min-w-[360px] lg:min-w-[420px]">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/60 px-6 pb-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    <span className="site-meta text-[#a39e93]">
                      xxxx
                    </span>
                  </div>
                  <span className="site-meta">
                    Clubes + selecoes
                  </span>
                </div>

                <div className="relative mb-5">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.92)_100%)]" />
                  <div className="site-shadow-lift relative h-[390px] bg-[url('/images/jogadores.png')] bg-cover bg-left sm:h-[410px]" />
                </div>

                <div className="grid gap-5 px-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <div className="space-y-1">
                    <p className="site-meta">
                      Brasil - Home kit
                    </p>
                    <p className="font-heading text-lg uppercase tracking-[0.1em] text-foreground">
                      Edição 2026
                    </p>
                  </div>
                  <div className="space-y-1 text-left sm:text-right">
                    <p className="site-meta">
                      A partir de
                    </p>
                    <p className="font-heading text-xl tracking-[0.06em] text-[var(--primary)] tabular-nums">
                      R$ ???
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
