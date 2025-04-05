import {
  AlertDialogStyleVariant,
  AlertDialogVariant
} from "@/components/ui/alert-dialog"

import AlertDialogPlayground, {
  AlertDialogPlaygroundProps
} from "./alert-dialog-playground"
import { alertDialogPlaygroundCode } from "./alert-dialog-playground-code"

export const alertDialog = {
  title: "Alert Dialog",
  url: "/components/alert-dialog",
  componentName: "alert-dialog",
  description:
    "Custom alert dialog variants and extra props to handle different scenarios",
  playground: {
    variant: [
      "default",
      "success",
      "destructive",
      "warning",
      "info"
    ] satisfies AlertDialogVariant[],
    styleVariant: ["left", "center"] satisfies AlertDialogStyleVariant[],
    withIcon: true,
    customIcon: [
      "CircleUserRound",
      "CircleDollarSign",
      "CircleHelp",
      "CircleFadingArrowUp",
      "none"
    ],
    separatedHeader: false,
    separatedFooter: false
  } satisfies Record<keyof AlertDialogPlaygroundProps, any>,
  cliCommand: "add alert-dialog",
  PlaygroundComponent: AlertDialogPlayground,
  playgroundCode: alertDialogPlaygroundCode
}
