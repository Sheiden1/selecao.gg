import { BrandMark } from "@/components/brand-mark"
import { SiteCta } from "@/components/site-cta"

export function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-[#050505]/88 backdrop-blur-xl">
      <div className="site-shell flex h-14 items-center justify-between sm:h-16">
        <a href="/" className="inline-flex items-center gap-2">
          <BrandMark className="text-[1.1rem] sm:text-xl" />
        </a>

        <SiteCta
          href="google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 sm:px-5"
        >
          Entrar em contato
        
        </SiteCta>
      </div>
    </nav>
  )
}
