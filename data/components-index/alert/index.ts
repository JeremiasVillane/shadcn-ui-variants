import { type AlertProps } from "@/components/ui/alert"

import { ComponentDetails } from "../site-index"
import { AlertPlayground } from "./alert-playground"
import { alertPlaygroundCode } from "./alert-playground-code"

export const alert: ComponentDetails<AlertProps> = {
  playground: { customIcon: undefined },
  PlaygroundComponent: AlertPlayground,
  playgroundCode: alertPlaygroundCode
}
