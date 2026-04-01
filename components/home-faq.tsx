import { SectionHeading } from "@/components/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqItems } from "@/content/home"

export function HomeFaq() {
  return (
    <section id="faq" className="site-section">
      <div className="site-section-rule" />

      <div className="site-shell">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            kicker="FAQ"
            title="Perguntas frequentes"
            
            className="items-start text-left"
          />

          <div className="site-panel site-shadow-panel rounded-[26px] p-3 sm:p-4">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="hover:no-underline">
                    <span className="max-w-[32rem] pr-2 text-[15px] font-medium leading-7 text-[#ede8df] sm:text-[17px]">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pr-14 text-sm leading-7 text-[#a9a397] sm:text-[15px]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
