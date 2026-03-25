import { ArrowUpRight, Instagram } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { SiteCta } from "@/components/site-cta"
import { instagramHref, navLinks, whatsappHref } from "@/content/home"

export function Footer() {
  return (
    <footer id="rodape" className="border-t border-white/10 bg-[#050505] py-10 sm:py-12">
      <div className="site-shell">
        <div className="site-panel site-shadow-panel overflow-hidden px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-8 border-b border-white/10 pb-7 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-end">
            <div className="max-w-xl space-y-4">
              <BrandMark />
              <p className="text-sm leading-7 text-[#b2ab9f] sm:text-[15px]">
                Seleção de camisas de futebol com atendimento direto.
              </p>
            </div>

            <div className="space-y-5 md:justify-self-end md:text-right">
              <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="site-link-muted text-[13px]">
                    {link.label}
                  </a>
                ))}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-link-muted inline-flex items-center gap-2 text-[13px]"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
                <SiteCta
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto sm:px-4"
                >
                  Abrir atendimento
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </SiteCta>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f5a52]">
              2026 SELECAO.GG
            </p>
            <p className="site-kicker text-[#90897d]">Camisas de futebol</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
