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
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern."
    },
    {
      title: "Is it styled?",
      content:
        "Yes. It comes with default styles that matches the other components' aesthetic."
    },
    {
      title: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer."
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
