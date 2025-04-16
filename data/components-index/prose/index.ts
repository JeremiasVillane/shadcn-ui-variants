import { type ProseProps } from "@/components/ui/prose"

import { ComponentDetails } from "../site-index"
import { ProsePlayground } from "./prose-demo"
import { ProseExtras } from "./prose-extras"
import { prosePlaygroundCode } from "./prose-playground-code"

export const prose: ComponentDetails<ProseProps> = {
  playground: { as: undefined, children: undefined, className: undefined },
  PlaygroundComponent: ProsePlayground,
  playgroundCode: prosePlaygroundCode,
  ExtrasComponent: ProseExtras
}
