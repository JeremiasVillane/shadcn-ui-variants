import { ComponentDetails } from "../site-index"
import {
  AccordionPlayground,
  type AccordionPlaygroundProps
} from "./accordion-playground"
import { accordionPlaygroundCode } from "./accordion-playground-code"

export const accordion: ComponentDetails<AccordionPlaygroundProps> = {
  PlaygroundComponent: AccordionPlayground,
  playgroundCode: accordionPlaygroundCode
}
