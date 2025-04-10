/**
 * Attempts to parse a string to its inferred data type.
 * Parse order: boolean ('true', 'false'), null, undefined, numbers, JSON (objects/arrays).
 * If unable to convert to any of these types, returns the original string.
 *
 * @param value The input string to parse.
 * @returns The parsed value (boolean, number, null, undefined, object, array) or the original string.
 */
export function parseStringValue(value: string | undefined) {
  if (!value) return ""

  const trimmedValue = value.trim()

  if (trimmedValue === "") {
    return value
  }

  if (trimmedValue === "true") {
    return true
  }
  if (trimmedValue === "false") {
    return false
  }

  if (trimmedValue === "null") {
    return null
  }

  if (trimmedValue === "undefined") {
    return undefined
  }

  const numericValue = Number(trimmedValue)
  if (!isNaN(numericValue)) {
    return numericValue
  }

  if (
    (trimmedValue.startsWith("{") && trimmedValue.endsWith("}")) ||
    (trimmedValue.startsWith("[") && trimmedValue.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmedValue)
    } catch (error) {
      console.warn(`Intento de parseo JSON fallido para: ${value}`, error)
    }
  }

  if (
    trimmedValue.length >= 2 &&
    trimmedValue.startsWith('"') &&
    trimmedValue.endsWith('"')
  ) {
    return trimmedValue.slice(1, -1)
  }

  return value
}

/** Convert camelCase to normal case (e.g., "myVariable" to "My Variable") */
export function camelToNormalCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Adds space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Separates acronyms from words
    .replace(/(\d+)([A-Za-z])/g, "$1 $2") // Separates numbers from letters
    .replace(/([A-Za-z])(\d+)/g, "$1 $2") // Separates letters from numbers
    .toLowerCase()
    .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
}

/** Convert kebab-case or snake_case to PascalCase */
export function toCamelCase(input: string) {
  const words = input.split(" ")

  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("")
}

/** Convert React JSX string (<Compoent />) to name (Component) */
export function jsxStringToName(jsxName: string) {
  return jsxName.match(/<([^>]+) \/>/)![1]
}

/** Convert kebab-case or snake_case to PascalCase */
export function toPascalCase(input: string): string {
  return input
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

/** Convert kebab-case or snake_case to word case */
export function toWordCase(input: string): string {
  return input.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}
