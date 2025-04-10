import { accordion } from "./accordion"
import { alert } from "./alert"
import { alertDialog } from "./alert-dialog"
import { breadcrumb } from "./breadcrumb"
import { button } from "./button"
import { input } from "./input"
import { scrollDownButton } from "./scroll-down-button"
import { separator } from "./separator"
import { slider } from "./slider"
import { tabs } from "./tabs"

export interface ComponentDetails<T = any> {
  playground?: Record<string, string[] | string | number | boolean>
  PlaygroundComponent: (args: T) => React.JSX.Element
  playgroundCode: (args: T) => string
}

type ComponentsIndex = Record<string, ComponentDetails>

export const componentsIndex: ComponentsIndex = {
  accordion,
  alert,
  "alert-dialog": alertDialog,
  breadcrumb,
  button,
  input,
  "scroll-down-button": scrollDownButton,
  separator,
  slider,
  tabs
}
