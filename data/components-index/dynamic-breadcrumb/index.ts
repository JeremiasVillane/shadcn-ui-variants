import { DynamicBreadcrumbProps } from "@/components/ui/dynamic-breadcrumb"

import { ComponentDetails } from "../site-index"
import { DynamicBreadcrumbPlayground } from "./dynamic-breadcrumb-playground"
import { dynamicBreadcrumbCode } from "./dynamic-breadcrumb-playground-code"

export const dynamicBreadcrumb: ComponentDetails<DynamicBreadcrumbProps> = {
  playground: { className: undefined },
  PlaygroundComponent: DynamicBreadcrumbPlayground,
  playgroundCode: dynamicBreadcrumbCode
}
