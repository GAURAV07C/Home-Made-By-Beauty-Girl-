export interface FaqItem {
  question: string;
  answer: string;
}

export const defaultFaqItems: FaqItem[] = [
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
