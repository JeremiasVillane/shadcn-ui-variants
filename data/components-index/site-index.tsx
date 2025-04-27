import { accordion } from "./accordion"
import { alert } from "./alert"
import { alertDialog } from "./alert-dialog"
import { autoTOC } from "./auto-toc"
import { breadcrumb } from "./breadcrumb"
import { bubbleMenu } from "./bubble-menu"
import { button } from "./button"
import { dynamicBreadcrumb } from "./dynamic-breadcrumb"
import { input } from "./input"
import { list } from "./list"
import { prose } from "./prose"
import { ratingStarsInput } from "./rating-stars-input"
import { scrollDownButton } from "./scroll-down-button"
import { separator } from "./separator"
import { simpleToast } from "./simple-toast"
import { slider } from "./slider"
import { tabs } from "./tabs"
import { timeline } from "./timeline"

export interface ComponentDetails<T = any> {
  playground?: Partial<T>
  PlaygroundComponent?: (args: T) => React.JSX.Element
  playgroundCode?: (args: T) => string
  DemoComponent?: () => React.JSX.Element
  ExtrasComponent?: () => React.JSX.Element | Promise<React.JSX.Element>
  ApiReference?: () => React.JSX.Element
}

type ComponentsIndex = Record<string, ComponentDetails>

export const componentsIndex: ComponentsIndex = {
  accordion,
  alert,
  "alert-dialog": alertDialog,
  "auto-toc": autoTOC,
  breadcrumb,
  "bubble-menu": bubbleMenu,
  button,
  "dynamic-breadcrumb": dynamicBreadcrumb,
  input,
  list,
  prose,
  "rating-stars-input": ratingStarsInput,
  "scroll-down-button": scrollDownButton,
  separator,
  "simple-toast": simpleToast,
  slider,
  timeline,
  tabs
}
