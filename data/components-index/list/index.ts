import { ComponentDetails } from "../site-index"
import { ListExtras } from "./list-extras"
import { ListPlayground } from "./list-playground"
import { listPlaygroundCode } from "./list-playground-code"

export const list: ComponentDetails = {
  playground: {
    icon: undefined as any,
    children: undefined as any
  },
  PlaygroundComponent: ListPlayground,
  playgroundCode: listPlaygroundCode,
  ExtrasComponent: ListExtras
}
