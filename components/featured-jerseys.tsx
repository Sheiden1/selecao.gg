import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { SiteCta } from "@/components/site-cta"
import { featuredJerseys, instagramHref } from "@/content/home"

type FeaturedProduct = (typeof featuredJerseys)[number]

function JerseyCard({ product }: { product: FeaturedProduct }) {
  return (
    <article className="site-surface site-shadow-lift group flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/16 hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.14)_38%,rgba(0,0,0,0.86)_100%)]" />

        <div className="absolute left-4 top-4">
          <span className="site-pill">{product.label}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-white/8 px-5 py-5 sm:px-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="site-meta">{product.category}</p>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <p className="site-meta">{product.edition}</p>
          </div>

          <h3 className="font-heading text-[21px] uppercase leading-[0.96] tracking-[0.08em] text-foreground sm:text-[22px]">
            {product.name}
          </h3>

          <p className="text-sm leading-6 text-[#aaa497]">{product.description}</p>
        </div>

        <div className="mt-auto space-y-4 border-t border-white/8 pt-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="site-meta">Preço</p>
              <p className="mt-1 font-heading text-xl tracking-[0.06em] text-[var(--primary)] tabular-nums">
                {product.price}
              </p>
            </div>
          </div>

          <SiteCta
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full justify-center rounded-[10px] shadow-none"
          >
            Consultar peça
            <ArrowUpRight className="h-3.5 w-3.5" />
          </SiteCta>
        </div>
      </div>
    </article>
  )
}

export function FeaturedJerseys() {
  return (
    <section id="destaques" className="site-section">
      <div className="site-section-rule" />

      <div className="site-shell">
        <SectionHeading
          kicker="Camisas em destaque"
          title="Modelos selecionados para facilitar a escolha."
          description="Uma vitrine enxuta, com leitura clara e informação objetiva."
          accent
        />

        <div className="grid grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
          {featuredJerseys.map((product) => (
            <JerseyCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
