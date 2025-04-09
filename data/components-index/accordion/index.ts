import { ComponentDetails } from "../site-index"
import {
  AccordionPlayground,
  type AccordionPlaygroundProps
} from "./accordion-playground"
import { accordionPlaygroundCode } from "./accordion-playground-code"

export const accordion: ComponentDetails<AccordionPlaygroundProps> = {
  cliCommand: "add accordion",
  PlaygroundComponent: AccordionPlayground,
  playgroundCode: accordionPlaygroundCode
}
