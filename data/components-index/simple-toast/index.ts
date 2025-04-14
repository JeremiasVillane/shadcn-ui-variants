import { ComponentDetails } from "../site-index"
import { SimpleToastApiReference } from "./simple-toast-api-reference"
import { SimpleToastExtras } from "./simple-toast-extras"
import { SimpleToastPlayground } from "./simple-toast-playground"
import { simpleToastPlaygroundCode } from "./simple-toast-playground-code"

export const simpleToast: ComponentDetails = {
  playground: {
    type: ["info", "success", "warning", "error"],
    position: [
      "top-left",
      "top-right",
      "top-center",
      "bottom-left",
      "bottom-right",
      "bottom-center"
    ],
    enterAnimationType: [
      "fade-in",
      "slide-down",
      "slide-up",
      "slide-left",
      "slide-right",
      "zoom-in"
    ],
    exitAnimationType: [
      "fade-out",
      "slide-out-up",
      "slide-out-down",
      "slide-out-right",
      "slide-out-left",
      "zoom-out"
    ],
    duration: 5000,
    showCloseButton: true,
    showProgressBar: false,
    defaultDuration: undefined as any,
    defaultPosition: undefined as any,
    defaultEnterAnimationType: undefined as any,
    defaultExitAnimationType: undefined as any,
    defaultShowCloseButton: undefined as any,
    defaultShowProgressBar: undefined as any,
    gap: undefined as any
  },
  PlaygroundComponent: SimpleToastPlayground,
  playgroundCode: simpleToastPlaygroundCode,
  ExtrasComponent: SimpleToastExtras,
  ApiReference: SimpleToastApiReference
}
