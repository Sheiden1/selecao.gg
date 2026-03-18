import { cn } from "@/lib/utils"

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <span className={cn("site-brand", className)}>
      SELECAO<span className="site-brand-accent">.GG</span>
    </span>
  )
}
