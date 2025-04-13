import { ComponentDetails } from "../site-index"
import { ProsePlayground } from "./prose-demo"
import { ProseExtras } from "./prose-extras"
import { prosePlaygroundCode } from "./prose-playground-code"

export const prose: ComponentDetails = {
  playground: {
    as: undefined as any,
    children: undefined as any,
    className: undefined as any
  },
  PlaygroundComponent: ProsePlayground,
  playgroundCode: prosePlaygroundCode,
  ExtrasComponent: ProseExtras
}
