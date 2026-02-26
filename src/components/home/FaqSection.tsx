import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Can I use this soap daily?",
    answer: "Yes. The formula is designed for daily cleansing on face and body.",
  },
  {
    question: "Is it suitable for sensitive skin?",
    answer: "The soap is crafted for broad skin compatibility, including sensitive skin types.",
  },
  {
    question: "When can I expect visible results?",
    answer: "Most users report brighter and softer feel within 1-2 weeks of consistent use.",
  },
  {
    question: "Can I pair it with active skincare products?",
    answer: "Yes. It works well in routines that include serums and moisturizer.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Common Questions</h2>
        </div>

        <div className="mt-10 rounded-2xl border border-border/60 bg-amber-50/20 p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
