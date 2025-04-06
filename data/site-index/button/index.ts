import { ButtonProps } from "@/components/ui/button"

import { ButtonPlayground, ButtonPlaygroundProps } from "./button-playground"
import { buttonPlaygroundCode } from "./button-playground-code"

export const button = {
  title: "Button",
  url: "/components/button",
  componentName: "button",
  description: "A button component with additional variants and functionality.",
  playground: {
    variant: [
      "destructive",
      "success",
      "warning",
      "outline",
      "secondary",
      "ghost",
      "link",
      "default"
    ] satisfies ButtonProps["variant"][],
    size: ["sm", "xs", "lg", "icon", "default"] satisfies ButtonProps["size"][],
    isLoading: false,
    disabled: false,
    iconLeft: ["none", "<ArrowLeftIcon />", "<PrinterIcon />", "<MailIcon />"],
    iconRight: [
      "none",
      "<SparklesIcon />",
      "<PlusIcon />",
      "<ArrowRightIcon />"
    ],
    iconAnimation: [
      "none",
      "spinLeft",
      "spinRight",
      "spinUp",
      "spinDown",
      "zoomIn",
      "zoomOut",
      "bounce",
      "ping",
      "pulse",
      "spin",
      "translateYUp",
      "translateYDown",
      "translateXLeft",
      "translateXRight"
    ] satisfies ButtonProps["iconAnimation"][],
    iconAnimationTarget: [
      "none",
      "both",
      "left",
      "right"
    ] satisfies ButtonProps["iconAnimationTarget"][]
  } satisfies Record<keyof ButtonPlaygroundProps, any>,
  cliCommand: "add button",
  PlaygroundComponent: ButtonPlayground,
  playgroundCode: buttonPlaygroundCode
}
