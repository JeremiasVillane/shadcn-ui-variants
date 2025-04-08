import { ComponentDetails } from "../site-index"
import { AlertPlayground, type AlertPlaygroundProps } from "./alert-playground"
import { alertPlaygroundCode } from "./alert-playground-code"

export const alert: ComponentDetails<AlertPlaygroundProps> = {
  playground: {
    customIcon: [
      "none",
      "<CircleUserRound />",
      "<CircleDollarSign />",
      "<CircleHelp />",
      "<CircleFadingArrowUp />"
    ]
  },
  cliCommand: "add alert",
  PlaygroundComponent: AlertPlayground,
  playgroundCode: alertPlaygroundCode
}
