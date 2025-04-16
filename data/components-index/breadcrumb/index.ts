import { type BreadcrumbProps } from "@/components/ui/breadcrumb"

import { ComponentDetails } from "../site-index"
import { BreadcrumbPlayground } from "./breadcrumb-playground"
import { breadcrumbPlaygroundCode } from "./breadcrumb-playground-code"

export const breadcrumb: ComponentDetails<BreadcrumbProps> = {
  PlaygroundComponent: BreadcrumbPlayground,
  playgroundCode: breadcrumbPlaygroundCode
}
