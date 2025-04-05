"use client"

import { AccordionPlaygroundProps } from "./accordion-playground"

export const accordionPlaygroundCode = ({
  variant,
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
    code += `<Accordion
    type="single"
    variant="${variant}"
    collapsible=${collapsible}
    defaultValue="item-0"
  >
  `
  } else {
    code += `<Accordion
    type="multiple"
    variant="${variant}"
    defaultValue={["item-0"]}
  >
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
