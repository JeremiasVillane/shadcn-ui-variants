"use client"

import { AccordionPlaygroundProps } from "./accordion-playground"

export const accordionPlaygroundCode = ({
  variant,
  styleVariant,
  type,
  collapsible
}: AccordionPlaygroundProps) => {
  let code = `"use client"
  
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    AccordionVariant
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

`
  if (type === "single") {
    code += `<Accordion type="single" defaultValue="item-0"${!!variant && variant !== "default" ? ` variant="${variant}"` : ""}${!!styleVariant && !!variant && variant !== "default" ? ` styleVariant="${styleVariant}"` : ""}${collapsible ? " collapsible" : ""}>
  `
  } else {
    code += `<Accordion type="multiple" defaultValue={["item-0"]${!!variant && variant !== "default" ? ` variant="${variant}"` : ""}${!!styleVariant && !!variant && variant !== "default" ? ` styleVariant="${styleVariant}"` : ""}>
  `
  }

  code += `{items.map(({ title, content }, index) => (
      <AccordionItem key={index} value={\`item-\${index}\`}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>`

  return code
}
