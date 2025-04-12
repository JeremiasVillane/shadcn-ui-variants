import { ComponentDetails } from "../site-index"
import { ButtonExtras } from "./button-extras"
import { ButtonPlayground, ButtonPlaygroundProps } from "./button-playground"
import { buttonPlaygroundCode } from "./button-playground-code"

export const button: ComponentDetails<ButtonPlaygroundProps> = {
  playground: {
    iconLeft: ["<MailIcon />", "<PrinterIcon />", "<ArrowLeftIcon />", "none"],
    iconRight: [
      "<ArrowRightIcon />",
      "<PlusIcon />",
      "<SparklesIcon />",
      "none"
    ]
  },
  PlaygroundComponent: ButtonPlayground,
  playgroundCode: buttonPlaygroundCode,
  ExtrasComponent: ButtonExtras
}
