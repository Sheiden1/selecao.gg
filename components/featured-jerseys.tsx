import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { SiteCta } from "@/components/site-cta"

const products = [
  {
    name: "Camisa Brasil Jordan I 2026/27",
    badge: "EDICAO LIMITADA",
    price: "R$ ???",
    image: "/images/banner1.png",
    whatsappMessage: "Ola! Tenho interesse na camisa Pre-Jogo Jordan",
  },
  {
    name: "Camisa Brasil II 2026/27 Torcedor",
    badge: "HOME KIT",
    price: "R$ ???",
    image: "/images/banner1.png",
    whatsappMessage: "Ola! Tenho interesse na camisa Brasil I 2024",
  },
  {
    name: "Camisa Brasil 2002 Pentacampeão",
    badge: "JOGADOR",
    price: "R$ ???",
    image: "/images/banner3.png",
    whatsappMessage: "Ola! Tenho interesse na camisa Brasil Retro",
  },
]

const cardClassName =
  "group site-surface overflow-hidden transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/70 hover:shadow-[0_18px_36px_rgba(0,0,0,0.28)]"

type Product = (typeof products)[number]

function ProductCard({ product }: { product: Product }) {
  return (
    <article className={cardClassName}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111111]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {product.badge ? (
          <div className="absolute left-4 top-4">
            <span className="site-pill">{product.badge}</span>
          </div>
        ) : null}
      </div>

      <div className="site-panel-soft flex flex-col gap-4 border-x-0 border-b-0 px-5 py-5">
        <div className="space-y-1.5">
          <p className="site-meta">Camisa oficial</p>
          <h3 className="font-heading text-[1.05rem] uppercase tracking-[0.08em] text-foreground">
            {product.name}
          </h3>
        </div>
        <div className="flex items-end justify-between gap-4 border-t border-border/60 pt-4">
          <p className="site-meta">Preço</p>
          <p className="font-heading text-xl tracking-[0.06em] text-[var(--primary)] tabular-nums">
            {product.price}
          </p>
        </div>
        <SiteCta
          href={`google.com`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-full"
        >
          Comprar
        </SiteCta>
      </div>
    </article>
  )
}

export function FeaturedJerseys() {
  return (
    <section id="colecao" className="site-section">
      <div className="site-section-rule" />
      <div className="site-shell relative">
        <SectionHeading
          kicker=""
          title="Camisas em destaque"
          accent
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
