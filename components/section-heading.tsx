import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  kicker: string
  title: string
  aside?: string
  accent?: boolean
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  aside,
  accent = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 md:mb-10 md:flex-row md:items-end md:justify-between md:pb-7",
        className,
      )}
    >
      <div className="space-y-2">
        <p className={cn("site-kicker", accent && "site-kicker-accent")}>{kicker}</p>
        <h2 className="site-heading">{title}</h2>
      </div>
      {aside ? <p className="site-meta hidden md:block">{aside}</p> : null}
    </div>
  )
}
