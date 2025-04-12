import * as React from "react"
import { InfoIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

const commonTypes = [
  "string",
  "number",
  "boolean",
  "object",
  "array",
  "function",
  "any",
  "unknown",
  "never",
  "void",
  "symbol",
  "bigint",
  "null",
  "undefined"
]

const baseReactTypes = [
  "React.ReactNode",
  "React.ReactElement",
  "React.FC",
  "React.FunctionComponent",
  "React.ComponentType",
  "React.Component",
  "React.PureComponent"
]

/**
 * Splits a type string into its top-level union parts, ignoring nested generics.
 *
 * This function handles the following cases:
 * - Splits by '|' only if not inside '<>' and surrounded by spaces.
 * - Handles nested generics and arrays.
 *
 * @param typeString The type string to split.
 * @return An array of top-level union parts.
 */
function splitTopLevelUnions(typeString: string): string[] {
  const parts: string[] = []
  let currentPart = ""
  let depth = 0 // Nesting level of <>

  for (let i = 0; i < typeString.length; i++) {
    const char = typeString[i]

    if (char === "<") depth++
    if (char === ">") depth--

    // Split by '|' only if not inside <> and surrounded by spaces
    if (char === "|" && depth === 0) {
      const prevChar = i > 0 ? typeString[i - 1] : " "
      const nextChar = i < typeString.length - 1 ? typeString[i + 1] : " "
      if (/\s/.test(prevChar) && /\s/.test(nextChar)) {
        parts.push(currentPart.trim())
        currentPart = ""
        if (nextChar === " ") i++
        continue // Skip the '|' itself
      }
    }
    currentPart += char
  }
  parts.push(currentPart.trim())

  return parts.filter((part) => part.length > 0)
}

/**
 * Formats a type string into a React node with appropriate styling.
 * Handles unions, arrays, generics, and common JS types.
 *
 * @param type The type string to format.
 * @return A React node representing the formatted type.
 */
function formatType(type: string): React.ReactNode {
  type = type.trim()

  // Handle Top Level Joins FIRST
  const unionParts = splitTopLevelUnions(type)
  if (unionParts.length > 1) {
    const enumType = (
      <>
        {unionParts.map((part, index) => (
          <React.Fragment key={index}>
            {formatType(part)}
            {index < unionParts.length - 1 && (
              <span className="text-gray-500 dark:text-gray-400"> | </span>
            )}
          </React.Fragment>
        ))}
      </>
    )

    return (
      <span className="space-x-1">
        <span>enum</span>
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="size-3 text-blue-700 dark:text-blue-500" />
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="max-w-64 font-mono text-xs md:text-sm"
          >
            {enumType}
          </PopoverContent>
        </Popover>
      </span>
    )
  }

  const currentType = unionParts[0]

  // Handle array types (Type[])
  if (currentType.endsWith("[]")) {
    const baseType = currentType.slice(0, -2)
    return (
      <>
        {formatType(baseType)}
        <span className="text-yellow-600 dark:text-yellow-400">[]</span>
      </>
    )
  }

  // Handle generic types (Base<GenericContent>)
  const genericMatch = currentType.match(/^([a-zA-Z0-9_.]+)<(.+)>$/)
  if (genericMatch) {
    const [, baseType, genericContent] = genericMatch

    const isReactBase = baseReactTypes.some((rt) => baseType.startsWith(rt))
    const baseStyle = isReactBase
      ? "text-blue-400"
      : "text-blue-600 dark:text-blue-400"

    return (
      <>
        <span className={baseStyle}>{baseType}</span>
        <span className="text-foreground/70">{"<"}</span>
        {formatType(genericContent)}
        <span className="text-foreground/70">{">"}</span>
      </>
    )
  }

  // Handle common JS types & null/undefined/unknown
  if (commonTypes.includes(currentType)) {
    if (["null", "undefined", "unknown"].includes(currentType)) {
      return (
        <span className="text-purple-600 dark:text-purple-400">
          {currentType}
        </span>
      )
    }
    return (
      <span className="text-green-600 dark:text-green-400">{currentType}</span>
    )
  }

  // Handle base React types (no generics)
  if (baseReactTypes.includes(currentType)) {
    return <span className="text-blue-400">{currentType}</span>
  }

  // Handle function types
  if (
    currentType.includes("(") &&
    currentType.includes(")") &&
    currentType.includes("=>")
  ) {
    return (
      <>
        <span className="text-orange-600 dark:text-orange-400">function</span>
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="ml-1 size-3 text-blue-700 dark:text-blue-500" />
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-fit font-mono text-xs md:text-sm"
          >
            <span className="text-orange-600 dark:text-orange-400">
              {currentType}
            </span>
          </PopoverContent>
        </Popover>
      </>
    )
  }

  return <span className="text-gray-700 dark:text-gray-300">{currentType}</span>
}

export { formatType }
