import { accordion } from "./accordion"
import { alert } from "./alert"
import { autoTOC } from "./auto-toc"
import { badge } from "./badge"
import { breadcrumb } from "./breadcrumb"
import { bubbleMenu } from "./bubble-menu"
import { button } from "./button"
import { checkbox } from "./checkbox"
import { colorPicker } from "./color-picker"
import { dynamicBreadcrumb } from "./dynamic-breadcrumb"
import { flexTable } from "./flex-table"
import { input } from "./input"
import { kinetic } from "./kinetic"
import { kineticText } from "./kinetic-text"
import { list } from "./list"
import { modal } from "./modal"
import { prose } from "./prose"
import { ratingStarsInput } from "./rating-stars-input"
import { scrollDownButton } from "./scroll-down-button"
import { separator } from "./separator"
import { simpleToast } from "./simple-toast"
import { slider } from "./slider"
import { tabs } from "./tabs"
import { tagBox } from "./tag-box"
import { timeline } from "./timeline"

export interface ComponentDetails<T = any> {
  playground?: Partial<T>
  showReload?: boolean
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
  "auto-toc": autoTOC,
  badge,
  breadcrumb,
  "bubble-menu": bubbleMenu,
  button,
  checkbox,
  "color-picker": colorPicker,
  "dynamic-breadcrumb": dynamicBreadcrumb,
  "flex-table": flexTable,
  input,
  kinetic,
  "kinetic-text": kineticText,
  list,
  modal,
  prose,
  "rating-stars-input": ratingStarsInput,
  "scroll-down-button": scrollDownButton,
  separator,
  "simple-toast": simpleToast,
  slider,
  "tag-box": tagBox,
  timeline,
  tabs
}
