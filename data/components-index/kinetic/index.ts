import { KineticProps } from "@/components/ui/kinetic"

import { ComponentDetails } from "../site-index"
import { KineticExtras } from "./kinetic-extras"
import { KineticPlayground } from "./kinetic-playground"
import { kineticPlaygroundCode } from "./kinetic-playground-code"

export const kinetic: ComponentDetails<KineticProps> = {
  playground: {
    className: undefined,
    style: undefined,
    children: undefined,
    viewportOptions: undefined,
    transition: undefined
  },
  showReload: true,
  PlaygroundComponent: KineticPlayground,
  playgroundCode: kineticPlaygroundCode,
  ExtrasComponent: KineticExtras
}
