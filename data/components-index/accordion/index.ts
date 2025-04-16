import { type AccordionProps } from "@/components/ui/accordion"

import { ComponentDetails } from "../site-index"
import { AccordionPlayground } from "./accordion-playground"
import { accordionPlaygroundCode } from "./accordion-playground-code"

export const accordion: ComponentDetails<AccordionProps> = {
  PlaygroundComponent: AccordionPlayground,
  playgroundCode: accordionPlaygroundCode
}
