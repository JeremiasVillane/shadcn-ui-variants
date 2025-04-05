import { AccordionVariant } from "@/components/ui/accordion"
import { AlertVariant } from "@/components/ui/alert"
import { AlertDialogVariant } from "@/components/ui/alert-dialog"
import { TabsVariant } from "@/components/ui/tabs"

import {
  AccordionPlayground,
  accordionPlaygroundCode,
  AccordionPlaygroundProps
} from "./accordion"
import {
  AlertPlayground,
  alertPlaygroundCode,
  AlertPlaygroundProps
} from "./alert"
import AlertDialogPlayground, {
  AlertDialogPlaygroundProps
} from "./alert-dialog/alert-dialog-playground"
import { BreadcrumbPlayground, breadcrumbPlaygroundCode } from "./breadcrumb"
import { TabsPlayground, tabsPlaygroundCode, TabsPlaygroundProps } from "./tabs"

interface ComponentDetails {
  title: string
  url: string
  componentName: string
  description?: string
  playground: Record<string, string[] | string | number | boolean>
  cliCommand?: string
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
  className?: string
}

type ComponentsIndex = Record<string, ComponentDetails>

export const componentsIndex: ComponentsIndex = {
  accordion: {
    title: "Accordion",
    url: "/components/accordion",
    componentName: "accordion",
    description:
      "Custom accordion variants with different styles and animations.",
    playground: {
      variant: [
        "default",
        "separated-outline",
        "separated-fill",
        "contained-outline",
        "contained-fill",
        "tabs-outline",
        "tabs-fill"
      ] satisfies AccordionVariant[],
      type: ["multiple", "single"],
      collapsible: true
    } satisfies Record<keyof AccordionPlaygroundProps, any>,
    cliCommand: "add accordion",
    PlaygroundComponent: AccordionPlayground,
    playgroundCode: accordionPlaygroundCode
  },
  alert: {
    title: "Alert",
    url: "/components/alert",
    componentName: "alert",
    description:
      "Custom alert variants with different styles for different statuses.",
    playground: {
      variant: [
        "default-oultine",
        "default-fill",
        "default-bootstrap",
        "destructive-outline",
        "destructive-fill",
        "destructive-bootstrap",
        "success-outline",
        "success-fill",
        "success-bootstrap",
        "warning-outline",
        "warning-fill",
        "warning-bootstrap",
        "info-outline",
        "info-fill",
        "info-bootstrap"
      ] satisfies AlertVariant[],
      withIcon: true,
      customIcon: [
        "CircleUserRound",
        "CircleDollarSign",
        "CircleHelp",
        "CircleFadingArrowUp",
        "none"
      ]
    } satisfies Record<keyof AlertPlaygroundProps, any>,
    cliCommand: "add alert",
    PlaygroundComponent: AlertPlayground,
    playgroundCode: alertPlaygroundCode
  },
  "alert-dialog": {
    title: "Alert Dialog",
    url: "/components/alert-dialog",
    componentName: "alert-dialog",
    description:
      "Custom alert dialog variants and extra props to handle different scenarios",
    playground: {
      variant: [
        "default",
        "center",
        "success-left",
        "success-center",
        "destructive-left",
        "destructive-center",
        "warning-left",
        "warning-center",
        "info-left",
        "info-center"
      ] satisfies AlertDialogVariant[],
      withIcon: true,
      customIcon: [
        "CircleUserRound",
        "CircleDollarSign",
        "CircleHelp",
        "CircleFadingArrowUp",
        "none"
      ]
    } satisfies Record<keyof AlertDialogPlaygroundProps, any>,
    cliCommand: "add alert-dialog",
    PlaygroundComponent: AlertDialogPlayground,
    playgroundCode: alertPlaygroundCode
  },
  breadcrumb: {
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
      ],
      separatorVariant: ["default", "chevrons", "dot", "step", "slash"]
    },
    cliCommand: "add breadcrumb",
    PlaygroundComponent: BreadcrumbPlayground,
    playgroundCode: breadcrumbPlaygroundCode
  },
  tabs: {
    title: "Tabs",
    url: "/components/tabs",
    componentName: "tabs",
    description: "Custom tabs variants with different styles and animations.",
    playground: {
      variant: [
        "default",
        "underlined",
        "brutalist",
        "pill-filled",
        "pill-outlined",
        "pill-boxed",
        "segmented",
        "bootstrap",
        "vercel"
      ] satisfies TabsVariant[]
    } satisfies Record<keyof TabsPlaygroundProps, any>,
    cliCommand: "add tabs",
    PlaygroundComponent: TabsPlayground,
    playgroundCode: tabsPlaygroundCode
  }
}

export const components = Object.values(componentsIndex)

export const contentIndex = [
  {
    label: "Get Started",
    items: [
      {
        title: "Introduction",
        url: "/docs"
      }
    ]
  },
  {
    label: "Components",
    items: components
  }
]
