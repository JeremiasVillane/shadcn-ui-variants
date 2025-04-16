import { type AlertDialogProps } from "@/components/ui/alert-dialog"

import { ComponentDetails } from "../site-index"
import { AlertDialogExtras } from "./alert-dialog-extras"
import AlertDialogPlayground from "./alert-dialog-playground"
import { alertDialogPlaygroundCode } from "./alert-dialog-playground-code"

export const alertDialog: ComponentDetails<AlertDialogProps> = {
  playground: { customIcon: undefined },
  PlaygroundComponent: AlertDialogPlayground,
  playgroundCode: alertDialogPlaygroundCode,
  ExtrasComponent: AlertDialogExtras
}
