import {
  AccordionStyleVariant,
  AccordionVariant
} from "@/components/ui/accordion"

import {
  AccordionPlayground,
  AccordionPlaygroundProps
} from "./accordion-playground"
import { accordionPlaygroundCode } from "./accordion-playground-code"

export const accordion = {
  title: "Accordion",
  url: "/components/accordion",
  componentName: "accordion",
  description:
    "Custom accordion variants with different styles and animations.",
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
  } satisfies Record<keyof AccordionPlaygroundProps, any>,
  cliCommand: "add accordion",
  PlaygroundComponent: AccordionPlayground,
  playgroundCode: accordionPlaygroundCode
}
