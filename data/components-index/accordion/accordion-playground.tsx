"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps
} from "@/components/ui/accordion"

const items = [
  {
    title: "Who am I?",
    content: "An organized collection of atoms... for now."
  },
  {
    title: "What am I doing here?",
    content: "Trying not to cause too much trouble."
  },
  {
    title: "Does it make sense?",
    content: "Probably not, but let's roll with it."
  }
]

export function AccordionPlayground({
  variant,
  styleVariant,
  type,
  collapsible
}: AccordionProps) {
  return type === "single" ? (
    <Accordion
      type="single"
      variant={variant}
      styleVariant={styleVariant}
      collapsible={collapsible}
      defaultValue="item-0"
    >
      {items.map(({ title, content }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-base md:text-xl lg:text-2xl">
            {title}
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
      variant={variant}
      styleVariant={styleVariant}
      defaultValue={["item-0"]}
    >
      {items.map(({ title, content }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-base md:text-xl lg:text-2xl">
            {title}
          </AccordionTrigger>
          <AccordionContent className="text-xs md:text-sm">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
