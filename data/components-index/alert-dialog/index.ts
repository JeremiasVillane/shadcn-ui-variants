import { ComponentDetails } from "../site-index"
import AlertDialogPlayground, {
  type AlertDialogPlaygroundProps
} from "./alert-dialog-playground"
import { alertDialogPlaygroundCode } from "./alert-dialog-playground-code"

export const alertDialog: ComponentDetails<AlertDialogPlaygroundProps> = {
  playground: {
    customIcon: [
      "none",
      "<CircleUserRound />",
      "<CircleDollarSign />",
      "<CircleHelp />",
      "<CircleFadingArrowUp />"
    ],
    separatedHeader: false,
    separatedFooter: false
  },
  PlaygroundComponent: AlertDialogPlayground,
  playgroundCode: alertDialogPlaygroundCode
}
