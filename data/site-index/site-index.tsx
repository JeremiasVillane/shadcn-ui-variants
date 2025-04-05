import {
  AccordionStyleVariant,
  AccordionVariant
} from "@/components/ui/accordion"
import { AlertStyleVariant, AlertVariant } from "@/components/ui/alert"
import {
  AlertDialogStyleVariant,
  AlertDialogVariant
} from "@/components/ui/alert-dialog"
import { BreadcrumbVariant } from "@/components/ui/breadcrumb"
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
import { alertDialogPlaygroundCode } from "./alert-dialog"
import AlertDialogPlayground, {
  AlertDialogPlaygroundProps
} from "./alert-dialog/alert-dialog-playground"
import {
  BreadcrumbPlayground,
  breadcrumbPlaygroundCode,
  BreadcrumbPlaygroundProps
} from "./breadcrumb"
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
        "separated",
        "contained",
        "tabs"
      ] satisfies AccordionVariant[],
      styleVariant: ["outline", "fill"] satisfies AccordionStyleVariant[],
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
        "default",
        "destructive",
        "success",
        "warning",
        "info"
      ] satisfies AlertVariant[],
      styleVariant: [
        "outline",
        "fill",
        "bootstrap"
      ] satisfies AlertStyleVariant[],
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
        "success",
        "destructive",
        "warning",
        "info"
      ] satisfies AlertDialogVariant[],
      styleVariant: ["left", "center"] satisfies AlertDialogStyleVariant[],
      withIcon: true,
      customIcon: [
        "CircleUserRound",
        "CircleDollarSign",
        "CircleHelp",
        "CircleFadingArrowUp",
        "none"
      ],
      separatedHeader: false,
      separatedFooter: false
    } satisfies Record<keyof AlertDialogPlaygroundProps, any>,
    cliCommand: "add alert-dialog",
    PlaygroundComponent: AlertDialogPlayground,
    playgroundCode: alertDialogPlaygroundCode
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
      ] satisfies BreadcrumbVariant[],
      separatorVariant: ["default", "chevrons", "dot", "step", "slash"]
    } satisfies Record<keyof BreadcrumbPlaygroundProps, any>,
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
