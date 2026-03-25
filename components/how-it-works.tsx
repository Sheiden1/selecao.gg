import { SectionHeading } from "@/components/section-heading"
import { howItWorksSteps } from "@/content/home"

export function HowItWorks() {
  return (
    <section id="como-funciona" className="site-section">
      <div className="site-section-rule" />

      <div className="site-shell">
        <SectionHeading
          kicker="Como funciona"
          title="Etapas simples e diretas."
          description="Você escolhe a peça, confirma a disponibilidade e segue o atendimento."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <article
              key={step.step}
              className="site-panel-soft group relative overflow-hidden px-5 py-5 sm:px-6"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center gap-3">
                <span className="font-heading text-[26px] leading-none text-white/16">
                  {step.step}
                </span>
                <div className="h-px flex-1 bg-white/8" />
              </div>

              <h3 className="mt-4 font-heading text-[22px] uppercase leading-[0.96] tracking-[0.08em] text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 max-w-[28rem] text-sm leading-7 text-[#aba498]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
