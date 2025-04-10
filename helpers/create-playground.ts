import { ComponentDocResult } from "@/types"

import { parseStringValue } from "@/lib/string-utils"

/** Create a playground object for the component based on its props.
 * @param docs The component documentation object containing prop definitions.
 * @returns An object with prop names as keys and their default values as values.
 */
export function createPlayground(docs: ComponentDocResult) {
  return docs?.data?.props.reduce(
    (acc, prop) => {
      const value = prop.type.split(" | ")
      acc[prop.name] =
        value.length > 1
          ? value.map((val) => parseStringValue(val))
          : parseStringValue(prop.defaultValue)
      return acc
    },
    {} as { [key: string]: string | number | boolean }
  )
}
