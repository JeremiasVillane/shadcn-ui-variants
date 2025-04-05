import { BreadcrumbVariant } from "@/components/ui/breadcrumb"

import {
  BreadcrumbPlayground,
  BreadcrumbPlaygroundProps
} from "./breadcrumb-playground"
import { breadcrumbPlaygroundCode } from "./breadcrumb-playground-code"

export const breadcrumb = {
  title: "Breadcrumb",
  url: "/components/breadcrumb",
  componentName: "breadcrumb",
  description:
    "Custom breadcrumb variants with different styles and separators",
  playground: {
    variant: [
      "default",
      "contained",
      "badge-active",
      "badge-outline",
      "badge-fill"
    ] satisfies BreadcrumbVariant[],
    separatorVariant: ["default", "chevrons", "dot", "step", "slash"]
  } satisfies Record<keyof BreadcrumbPlaygroundProps, any>,
  cliCommand: "add badge",
  PlaygroundComponent: BreadcrumbPlayground,
  playgroundCode: breadcrumbPlaygroundCode
}
