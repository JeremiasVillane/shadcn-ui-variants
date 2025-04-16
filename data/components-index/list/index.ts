import { type ListProps } from "@/components/ui/list"

import { ComponentDetails } from "../site-index"
import { ListExtras } from "./list-extras"
import { ListPlayground } from "./list-playground"
import { listPlaygroundCode } from "./list-playground-code"

export const list: ComponentDetails<ListProps> = {
  playground: { icon: undefined, children: undefined },
  PlaygroundComponent: ListPlayground,
  playgroundCode: listPlaygroundCode,
  ExtrasComponent: ListExtras
}
