import { AlertStyleVariant, AlertVariant } from "@/components/ui/alert"

import { ComponentDetails } from "../site-index"
import { AlertPlayground, AlertPlaygroundProps } from "./alert-playground"
import { alertPlaygroundCode } from "./alert-playground-code"

export const alert: ComponentDetails<AlertPlaygroundProps> = {
  title: "Alert",
  url: "/components/alert",
  componentName: "alert",
  description:
    "Alert component with variants and styles for different statuses.",
  playground: {
    variant: [
      "default",
      "destructive",
      "success",
      "warning",
      "info"
    ] satisfies AlertVariant[],
    styleVariant: [
      "outline",
      "fill",
      "bootstrap"
    ] satisfies AlertStyleVariant[],
    withIcon: true,
    customIcon: [
      "CircleUserRound",
      "CircleDollarSign",
      "CircleHelp",
      "CircleFadingArrowUp",
      "none"
    ]
  },
  cliCommand: "add alert",
  PlaygroundComponent: AlertPlayground,
  playgroundCode: alertPlaygroundCode
}
