/**
 * This file contains TypeScript type definitions for the registry item structure.
 * It includes types for component documentation, prop definitions,
 * registry items, Tailwind configuration, CSS variables, and CSS values.
 *
 * These types are used to define the structure of the registry items and their properties.
 * They are used in the registry.json file and in the codebase to ensure type safety
 * and consistency when working with registry items.
 */

/**
 * Represents a prop definition for a component.
 * It includes the name, type, required status,
 * default value, and description of the prop. *
 */
export type PropDefinition = {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
}

/**
 * Represents the structure of a component documentation.
 * It contains an array of prop definitions for the component.
 *
 * @type {ComponentDoc}
 * @property {PropDefinition[]} props - An array of prop definitions for the component.
 */
export type ComponentDoc = {
  props: PropDefinition[]
}

/**
 * Represents the result of a component documentation lookup.
 * It can either be a successful result with the component documentation
 * or an error message.
 *
 * @type {ComponentDocResult}
 * @property {ComponentDoc} data - The component documentation if successful.
 * @property {string} error - The error message if the lookup failed.
 * @example
 * const result: ComponentDocResult = {
 *   data: {
 *     props: [
 *      {
 *       name: "propName",
 *       type: "string",
 *       required: true,
 *       defaultValue: "default",
 *       description: "Description of the prop"
 *     }
 *   ]
 *  },
 *  error: undefined
 * }
 *
 * @example
 * const result: ComponentDocResult = {
 *     data: undefined,
 *     error: "Component not found"
 *   }
 */
export type ComponentDocResult =
  | { data: ComponentDoc; error?: undefined }
  | { data?: undefined; error: string }

/**
 * Represents the type for items defined in the registry based on the provided JSON schema.
 */
export interface RegistryItem {
  /**
   * The name of the item. This is used to identify the item in the registry.
   * It should be unique for your registry.
   */
  name: string

  /**
   * The type of the item. This is used to determine the type and target path
   * of the item when resolved for a project.
   */
  type:
    | "registry:lib"
    | "registry:block"
    | "registry:component"
    | "registry:ui"
    | "registry:hook"
    | "registry:theme"
    | "registry:page"
    | "registry:file"
    | "registry:style"

  /**
   * The description of the item. This is used to provide a brief overview of the item.
   */
  description?: string

  /**
   * The human-readable title for your registry item. Keep it short and descriptive.
   */
  title?: string

  /**
   * The author of the item. Recommended format: username <url>
   */
  author?: string

  /**
   * An array of NPM dependencies required by the registry item.
   */
  dependencies?: string[]

  /**
   * An array of NPM dev dependencies required by the registry item.
   */
  devDependencies?: string[]

  /**
   * An array of registry items that this item depends on. Use the name of the
   * item to reference shadcn/ui components and urls to reference other registries.
   */
  registryDependencies?: string[]

  /**
   * The main payload of the registry item. This is an array of files that are
   * part of the registry item. Each file is an object with a path, content, type, and target.
   */
  files?: RegistryFile[]

  /**
   * The tailwind configuration for the registry item. This is an object with a
   * config property. Use cssVars for Tailwind v4 projects.
   */
  tailwind?: {
    config?: TailwindConfig
  }

  /**
   * The css variables for the registry item. This will be merged with the
   * project's css variables.
   */
  cssVars?: CssVars

  /**
   * CSS definitions to be added to the project's CSS file. Supports at-rules,
   * selectors, nested rules, utilities, layers, and more.
   */
  css?: Record<string, CssValue>

  /**
   * Additional metadata for the registry item. This is an object with any key value pairs.
   */
  meta?: Record<string, any>

  /**
   * The documentation for the registry item. This is a markdown string.
   */
  docs?: string

  /**
   * The categories of the registry item. This is an array of strings.
   */
  categories?: string[]

  /**
   * The name of the registry item to extend. This is used to extend the base
   * shadcn/ui style. Set to none to start fresh. This is available for
   * registry:style items only.
   */
  extends?: string
}

/**
 * Represents a file within the registry item's payload.
 */
export interface RegistryFile {
  /**
   * The path to the file relative to the registry root.
   */
  path: string

  /**
   * The content of the file.
   */
  content?: string // Not explicitly required by if/then/else

  /**
   * The type of the file. This is used to determine the type of the file when resolved for a project.
   */
  type:
    | "registry:lib"
    | "registry:block"
    | "registry:component"
    | "registry:ui"
    | "registry:hook"
    | "registry:theme"
    | "registry:page"
    | "registry:file"

  /**
   * The target path of the file. This is the path to the file in the project.
   * Required if type is 'registry:file' or 'registry:page'.
   */
  target?: string
}

/**
 * Represents the structure for Tailwind configuration within a registry item.
 */
export interface TailwindConfig {
  content?: string[]
  theme?: Record<string, any> // Allows any structure within theme
  plugins?: string[]
}

/**
 * Represents the structure for CSS variables configuration within a registry item.
 */
export interface CssVars {
  /**
   * CSS variables for the @theme directive. For Tailwind v4 projects only.
   * Use tailwind for older projects.
   */
  theme?: Record<string, string>
  /**
   * CSS variables for the light theme.
   */
  light?: Record<string, string>
  /**
   * CSS variables for the dark theme.
   */
  dark?: Record<string, string>
}

/**
 * Represents the possible value types within the 'css' property structure.
 * It can be a simple CSS string value or a nested object structure.
 */
type CssValue = string | { [key: string]: string | Record<string, string> }
