import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  kicker?: string
  title: string
  description?: string
  aside?: string
  accent?: boolean
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  description,
  aside,
  accent = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:mb-10 md:flex-row md:items-end md:justify-between md:pb-7",
        className,
      )}
    >
      <div className="max-w-2xl space-y-3">
        {kicker ? (
          <p className={cn("site-kicker", accent && "site-kicker-accent")}>{kicker}</p>
        ) : null}
        <h2 className="site-heading">{title}</h2>
        {description ? <p className="site-copy max-w-[42rem]">{description}</p> : null}
      </div>
      {aside ? <p className="site-meta hidden md:block">{aside}</p> : null}
    </div>
  )
}
