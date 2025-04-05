import { AlertStyleVariant, AlertVariant } from "@/components/ui/alert"

import { AlertPlayground, AlertPlaygroundProps } from "./alert-playground"
import { alertPlaygroundCode } from "./alert-playground-code"

export const alert = {
  title: "Alert",
  url: "/components/alert",
  componentName: "alert",
  description:
    "Custom alert variants with different styles for different statuses.",
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
  } satisfies Record<keyof AlertPlaygroundProps, any>,
  cliCommand: "add alert",
  PlaygroundComponent: AlertPlayground,
  playgroundCode: alertPlaygroundCode
}
