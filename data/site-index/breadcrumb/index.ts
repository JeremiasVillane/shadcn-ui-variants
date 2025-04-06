import { BreadcrumbVariant } from "@/components/ui/breadcrumb"

import { ComponentDetails } from "../site-index"
import {
  BreadcrumbPlayground,
  BreadcrumbPlaygroundProps
} from "./breadcrumb-playground"
import { breadcrumbPlaygroundCode } from "./breadcrumb-playground-code"

export const breadcrumb: ComponentDetails<BreadcrumbPlaygroundProps> = {
  title: "Breadcrumb",
  url: "/components/breadcrumb",
  componentName: "breadcrumb",
  description:
    "Breadcrumb component with variants, different styles and separators.",
  playground: {
    variant: [
      "default",
      "contained",
      "badge-active",
      "badge-outline",
      "badge-fill"
    ] satisfies BreadcrumbVariant[],
    separatorVariant: ["default", "chevrons", "dot", "step", "slash"]
  },
  cliCommand: "add badge",
  PlaygroundComponent: BreadcrumbPlayground,
  playgroundCode: breadcrumbPlaygroundCode
}
