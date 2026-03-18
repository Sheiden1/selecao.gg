import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SiteCtaProps = {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
}

export function SiteCta({
  href,
  children,
  className,
  target,
  rel,
}: SiteCtaProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn("site-cta-primary", className)}
    >
      {children}
    </a>
  )
}
