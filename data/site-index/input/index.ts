import { ComponentDetails } from "../site-index"
import { InputPlayground, InputPlaygroundProps } from "./input-playground"
import { inputPlaygroundCode } from "./input-playground-code"

export const input: ComponentDetails<InputPlaygroundProps> = {
  title: "Input",
  url: "/components/input",
  componentName: "input",
  description: "An advanced input component with toggable extensions.",
  playground: {
    startIcon: ["none", "SearchIcon", "AtSignIcon"],
    endIcon: ["ArrowRightIcon", "none"],
    startInline: "",
    endInline: "",
    startAddon: ["https://", "€", "none"],
    endAddon: ["none", "MailIcon", "gmail.com"],
    maxLength: 33,
    showMaxLength: ["false", "outside", "inside"]
  },
  PlaygroundComponent: InputPlayground,
  playgroundCode: inputPlaygroundCode
}
