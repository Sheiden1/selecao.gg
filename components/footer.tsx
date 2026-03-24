import { Instagram } from "lucide-react"
import { BrandMark } from "@/components/brand-mark"
import { SiteCta } from "@/components/site-cta"

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-[#050505] py-10">
      <div className="site-shell grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:items-start">
        <div className="space-y-4">
          <BrandMark />
          <p className="max-w-md text-sm leading-7 text-[#8b857a]">
          Feito para quem entende de futebol.
          </p>
        </div>

        <div className="space-y-4 md:justify-self-end md:text-right">
          <p className="site-kicker">
            Contato
          </p>
          <div className="flex flex-col gap-3 text-sm md:items-end">
            <a
              href="https://instagram.com/selecao.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="site-link-muted inline-flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
            <SiteCta
              href="https://wa.me/5583999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-4"
            >
              WhatsApp
            </SiteCta>
          </div>
        </div>
      </div>

      <div className="site-shell mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#171717] pt-5 sm:flex-row sm:items-center">
        <p className="text-[11px] text-[#5c574f]">
          2026 selecao.gg 
        </p>
        <p className="site-kicker">
          Para quem veste o jogo
        </p>
      </div>
    </footer>
  )
}
