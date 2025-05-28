"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTrigger,
  type AccordionProps
} from "@/components/ui/accordion"

const items = [
  {
    title: "Is this service beginner-friendly?",
    content:
      "Yes! Our platform is designed with simplicity in mind. We offer a comprehensive onboarding process and detailed guides to help you get started quickly, regardless of your previous experience."
  },
  {
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and direct bank transfers for annual subscriptions."
  },
  {
    title: "Can I cancel my subscription at any time?",
    content:
      "Absolutely. You can cancel your subscription at any time from your account settings. If you cancel, you'll retain access until the end of your current billing period."
  }
]

export function AccordionPlayground({
  variant,
  styleVariant,
  trigger,
  triggerPosition,
  type,
  collapsible
}: AccordionProps) {
  return type === "single" ? (
    <Accordion
      type="single"
      {...{ variant, styleVariant, trigger, triggerPosition, collapsible }}
      defaultValue="item-0"
    >
      {items.map(({ title, content }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <AccordionTitle className="text-left text-base md:text-xl lg:text-2xl">
              {title}
            </AccordionTitle>
          </AccordionTrigger>
          <AccordionContent className="text-xs md:text-sm">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <Accordion
      type="multiple"
      {...{ variant, styleVariant, trigger, triggerPosition }}
      defaultValue={["item-0"]}
    >
      {items.map(({ title, content }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <AccordionTitle className="text-left text-base md:text-xl lg:text-2xl">
              {title}
            </AccordionTitle>
          </AccordionTrigger>
          <AccordionContent className="text-xs md:text-sm">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
