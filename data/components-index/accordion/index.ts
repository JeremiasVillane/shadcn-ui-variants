import { type AccordionProps } from "@/components/ui/accordion"

import { ComponentDetails } from "../site-index"
import { AccordionExtras } from "./accordion-extras"
import { AccordionPlayground } from "./accordion-playground"
import { accordionPlaygroundCode } from "./accordion-playground-code"

export const accordion: ComponentDetails<AccordionProps> = {
  playground: { collapsible: true },
  PlaygroundComponent: AccordionPlayground,
  playgroundCode: accordionPlaygroundCode,
  ExtrasComponent: AccordionExtras
}
