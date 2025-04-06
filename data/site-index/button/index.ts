import { ButtonProps } from "@/components/ui/button"

import { ComponentDetails } from "../site-index"
import { ButtonPlayground, ButtonPlaygroundProps } from "./button-playground"
import { buttonPlaygroundCode } from "./button-playground-code"

export const button: ComponentDetails<ButtonPlaygroundProps> = {
  title: "Button",
  url: "/components/button",
  componentName: "button",
  description:
    "A supercharged button component with additional variants, animations, extensions and auxiliar subcomponents.",
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
  },
  cliCommand: "add button",
  PlaygroundComponent: ButtonPlayground,
  playgroundCode: buttonPlaygroundCode
}
