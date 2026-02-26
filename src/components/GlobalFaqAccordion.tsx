"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { defaultFaqItems, type FaqItem } from "@/lib/default-faqs";

export function GlobalFaqAccordion() {
  const pathname = usePathname();
  const [faqItems, setFaqItems] = useState<FaqItem[]>(defaultFaqItems);

  useEffect(() => {
    const match = pathname.match(/^\/products\/([^/]+)$/);
    if (!match) {
      setFaqItems(defaultFaqItems);
      return;
    }

    const slug = match[1];
    fetch(`/api/products/${slug}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const productFaqs = Array.isArray(data?.product?.faqs) ? data.product.faqs : [];
        const sanitized = productFaqs
          .map((item: { question?: unknown; answer?: unknown }) => ({
            question: String(item?.question || "").trim(),
            answer: String(item?.answer || "").trim(),
          }))
          .filter((item: FaqItem) => item.question && item.answer);

        setFaqItems(sanitized.length > 0 ? sanitized : defaultFaqItems);
      })
      .catch(() => setFaqItems(defaultFaqItems));
  }, [pathname]);

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
