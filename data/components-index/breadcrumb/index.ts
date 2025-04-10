import { ComponentDetails } from "../site-index"
import {
  BreadcrumbPlayground,
  BreadcrumbPlaygroundProps
} from "./breadcrumb-playground"
import { breadcrumbPlaygroundCode } from "./breadcrumb-playground-code"

export const breadcrumb: ComponentDetails<BreadcrumbPlaygroundProps> = {
  PlaygroundComponent: BreadcrumbPlayground,
  playgroundCode: breadcrumbPlaygroundCode
}
