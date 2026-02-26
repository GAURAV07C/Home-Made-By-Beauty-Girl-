"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Is this skincare range suitable for daily use?",
    answer: "Yes. Our formulas are designed for regular use with a gentle, skin-friendly approach.",
  },
  {
    question: "Which product is available right now?",
    answer: "Currently Glow Soap is live. More products like cream and serum will be added soon.",
  },
  {
    question: "Where can I buy the soap?",
    answer: "You can directly shop from the Soap page and go to the Buy section.",
  },
  {
    question: "Is this suitable for all skin types?",
    answer: "The product is crafted to be balanced for most skin types, including daily-care routines.",
  },
];

export function GlobalFaqAccordion() {
  return (
    <section id="faq" className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-amber-50/20 p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-foreground/75">
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
