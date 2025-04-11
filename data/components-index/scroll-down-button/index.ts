import { ComponentDetails } from "../site-index"
import {
  ScrollDownButtonPlayground,
  ScrollDownButtonPlaygroundProps
} from "./scroll-down-button-playground"
import { scrollDownButtonPlaygroundCode } from "./scroll-down-button-playground-code"

export const scrollDownButton: ComponentDetails<ScrollDownButtonPlaygroundProps> =
  {
    playground: {
      targetId: "installation",
      iconContainerClassName: undefined as any,
      iconElementClassName: undefined as any,
      textClassName: undefined as any
    },
    PlaygroundComponent: ScrollDownButtonPlayground,
    playgroundCode: scrollDownButtonPlaygroundCode
  }
