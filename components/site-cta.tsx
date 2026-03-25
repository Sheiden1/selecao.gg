import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type SiteCtaVariant = "primary" | "secondary" | "muted"

type SiteCtaProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode
  variant?: SiteCtaVariant
  disabled?: boolean
}

const variantClassNames: Record<SiteCtaVariant, string> = {
  primary: "site-cta-primary",
  secondary: "site-cta-secondary",
  muted: "site-cta-muted",
}

export function SiteCta({
  children,
  className,
  variant = "primary",
  disabled = false,
  href = "#",
  ...props
}: SiteCtaProps) {
  const classes = cn(
    variantClassNames[variant],
    disabled && "pointer-events-none opacity-55",
    className,
  )

  if (disabled) {
    return (
      <span aria-disabled="true" className={classes}>
        {children}
      </span>
    )
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
