import { type ScrollDownButtonProps } from "@/components/ui/scroll-down-button"

import { ComponentDetails } from "../site-index"
import { ScrollDownButtonPlayground } from "./scroll-down-button-playground"
import { scrollDownButtonPlaygroundCode } from "./scroll-down-button-playground-code"

export const scrollDownButton: ComponentDetails<ScrollDownButtonProps> = {
  playground: {
    targetId: "installation",
    iconContainerClassName: undefined,
    iconElementClassName: undefined,
    textClassName: undefined
  },
  PlaygroundComponent: ScrollDownButtonPlayground,
  playgroundCode: scrollDownButtonPlaygroundCode
}
