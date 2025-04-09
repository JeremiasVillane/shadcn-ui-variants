import { ComponentDetails } from "../site-index"
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
  cliCommand: "add button",
  PlaygroundComponent: ButtonPlayground,
  playgroundCode: buttonPlaygroundCode
}
