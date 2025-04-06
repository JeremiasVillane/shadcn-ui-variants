import {
  AccordionStyleVariant,
  AccordionVariant
} from "@/components/ui/accordion"

import { ComponentDetails } from "../site-index"
import {
  AccordionPlayground,
  AccordionPlaygroundProps
} from "./accordion-playground"
import { accordionPlaygroundCode } from "./accordion-playground-code"

export const accordion: ComponentDetails<AccordionPlaygroundProps> = {
  title: "Accordion",
  url: "/components/accordion",
  componentName: "accordion",
  description:
    "An accordion component with many variations, styles and animations.",
  playground: {
    variant: [
      "default",
      "separated",
      "contained",
      "tabs"
    ] satisfies AccordionVariant[],
    styleVariant: ["outline", "fill"] satisfies AccordionStyleVariant[],
    type: ["multiple", "single"],
    collapsible: true
  },
  cliCommand: "add accordion",
  PlaygroundComponent: AccordionPlayground,
  playgroundCode: accordionPlaygroundCode
}
