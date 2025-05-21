import { BadgeProps } from "@/components/ui/badge"

import { ComponentDetails } from "../site-index"
import { BadgeExtras } from "./badge-extras"
import { BadgePlayground } from "./badge-playground"
import { badgePlaygroundCode } from "./badge-playground-code"

export const badge: ComponentDetails<BadgeProps> = {
  playground: { leftElement: undefined, rightElement: undefined },
  PlaygroundComponent: BadgePlayground,
  playgroundCode: badgePlaygroundCode,
  ExtrasComponent: BadgeExtras
}
