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

export interface AccordionPlaygroundProps {
  variant: AccordionProps["variant"]
  styleVariant: AccordionProps["styleVariant"]
  type: "single" | "multiple"
  collapsible: boolean
}

export function AccordionPlayground({
  variant,
  styleVariant,
  type,
  collapsible
}: AccordionPlaygroundProps) {
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
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
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
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
