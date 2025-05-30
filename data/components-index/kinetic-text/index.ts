import { KineticTextProps } from "@/components/ui/kinetic-text"

import { ComponentDetails } from "../site-index"
import { KineticTextExtras } from "./kinetic-text-extras"
import { KineticTextPlayground } from "./kinetic-text-playground"
import { kineticTextPlaygroundCode } from "./kinetic-text-playground-code"

export const kineticText: ComponentDetails<KineticTextProps> = {
  playground: {
    animation: [
      "fadeIn",
      "fadeInUp",
      "fadeInDown",
      "fadeInLeft",
      "fadeInRight",
      "scaleIn",
      "slideInUp",
      "slideInDown",
      "slideInLeft",
      "slideInRight",
      "blurIn",
      "blurInUp",
      "blurInDown",
      "blurInLeft",
      "blurInRight",
      "rotateIn",
      "bounce",
      "elastic"
    ] as any,
    duration: 0.5,
    delay: 0,
    startOnView: false,
    once: true,
    loop: false,
    onScroll: false,
    offset: 0,

    className: undefined,
    style: undefined,
    children: undefined,
    viewportOptions: undefined,
    transition: undefined
  },
  showReload: true,
  PlaygroundComponent: KineticTextPlayground,
  playgroundCode: kineticTextPlaygroundCode,
  ExtrasComponent: KineticTextExtras
}
