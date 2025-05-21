import { FlexTableProps } from "@/components/ui/flex-table"

import { ComponentDetails } from "../site-index"
import { FlexTableExtras } from "./flex-table-extras"
import { FlexTablePlayground } from "./flex-table-playground"
import { flexTablePlaygroundCode } from "./flex-table-playground-code"

export const flexTable: ComponentDetails<FlexTableProps> = {
  playground: {
    data: undefined,
    className: undefined,
    headerClassName: undefined,
    cellClassName: undefined,
    emptyMessage: undefined,
    formatter: undefined,
    filterBy: undefined
  },
  PlaygroundComponent: FlexTablePlayground,
  playgroundCode: flexTablePlaygroundCode,
  ExtrasComponent: FlexTableExtras
}
