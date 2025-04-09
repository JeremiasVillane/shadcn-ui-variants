import { ComponentDetails } from "../site-index"
import { InputPlayground, InputPlaygroundProps } from "./input-playground"
import { inputPlaygroundCode } from "./input-playground-code"

export const input: ComponentDetails<InputPlaygroundProps> = {
  playground: {
    startIcon: ["none", "<SearchIcon />", "<AtSignIcon />"],
    endIcon: ["<ArrowRightIcon />", "none"],
    startAddon: ["https://", "€", "none"],
    endAddon: ["none", "<MailIcon />", "gmail.com"],
    maxLength: 33,
  },
  PlaygroundComponent: InputPlayground,
  playgroundCode: inputPlaygroundCode
}
