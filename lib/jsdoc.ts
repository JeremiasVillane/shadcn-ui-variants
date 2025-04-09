import { ComponentDoc, PropDefinition } from "@/types"
import ts from "typescript"

import { toWordCase } from "./utils"

/**
 * Parse a component file to extract documentation
 * @param fileContent The content of the component file
 * @param fileName The name of the component file
 * @returns The parsed component documentation
 */
export function parseComponentFile(
  fileContent: string,
  fileName: string
): ComponentDoc {
  // Create a source file
  const sourceFile = ts.createSourceFile(
    fileName,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  )

  const title = getComponentName(sourceFile, fileName)
  const name = fileName.replace(/\.(tsx|jsx|ts|js)$/, "")
  const description = getComponentDescription(sourceFile)
  const props = extractProps(sourceFile)

  return {
    title,
    name,
    description,
    props
  }
}

/**
 * Extract the component name from the source file
 */
function getComponentName(sourceFile: ts.SourceFile, fileName: string): string {
  // Try to find the component name from the default export
  let componentName = ""

  // Visit each node in the source file
  ts.forEachChild(sourceFile, (node) => {
    // Look for export default function declarations
    if (
      ts.isExportAssignment(node) &&
      node.expression &&
      ts.isIdentifier(node.expression)
    ) {
      componentName = node.expression.text
    } else if (
      ts.isFunctionDeclaration(node) &&
      node.name &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)
    ) {
      componentName = node.name.text
    }
  })

  // If we couldn't find a component name, use the file name
  if (!componentName) {
    componentName = toWordCase(fileName.replace(/\.(tsx|jsx|ts|js)$/, ""))
  }

  return componentName
}

/**
 * Extracts the main description of a JSDoc comment associated with a node.
 * Prioritizes text before tags, then looks for the @description tag.
 * @param node The TypeScript node to extract the JSDoc from.
 * @param sourceFile The source file to get text from if needed.
 * @returns The description found or an empty string.
 */
function extractDescriptionFromJSDoc(
  node: ts.Node,
  sourceFile: ts.SourceFile
): string {
  let description = ""

  // ts.getJSDocComments deprecated, use node.jsDoc directly is preferred
  // Check if the node has the jsDoc property and it's populated
  if ("jsDoc" in node && node.jsDoc && Array.isArray(node.jsDoc)) {
    const jsDocs = node.jsDoc as ts.JSDoc[]

    for (const doc of jsDocs) {
      // 1. Try to get the main comment (text before tags)
      // doc.comment can be string or NodeArray<JSDocComment | JSDocText>
      if (doc.comment) {
        if (typeof doc.comment === "string") {
          description = doc.comment
        } else if (Array.isArray(doc.comment)) {
          // If it is an array of comment nodes, join their text
          description = doc.comment
            .map((c) => c.getText(sourceFile)) // Get the text of each part
            .join("\n") // Join if multiple parts
            .replace(/^\s*\*\s?/gm, "") // Clean up possible * initial in multiline
        }
        description = description.trim()
        if (description) {
          return description
        }
      }

      // 2. If no main comment, look for explicit @description tag
      if (!description && doc.tags) {
        const descriptionTag = doc.tags.find(
          (tag) => tag.tagName.getText(sourceFile) === "description"
        )

        if (descriptionTag && descriptionTag.comment) {
          if (typeof descriptionTag.comment === "string") {
            description = descriptionTag.comment
          } else if (Array.isArray(descriptionTag.comment)) {
            // Handle complex comments inside @description tag
            description = descriptionTag.comment
              .map((c) => c.getText(sourceFile))
              .join("\n")
              .replace(/^\s*\*\s?/gm, "") // Clean up possible * initial.
          }
          description = description.trim()
          if (description) {
            return description
          }
        }
      }
    }
  }
  return description
}

/**
 * Gets the main JSDoc description of an exported component in a file.
 * Searches function declarations, export assignments, and exported variable declarations.
 * @param sourceFile The TypeScript SourceFile to parse.
 * @returns The component description found or an empty string.
 */
function getComponentDescription(sourceFile: ts.SourceFile): string {
  let description = ""

  // Visit each top-level child node in the source file
  ts.forEachChild(sourceFile, (node) => {
    if (description) return

    let potentialComponentNode: ts.Node | undefined = undefined

    // Case 1: export function MyComponent() {}
    if (
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      potentialComponentNode = node
    }
    // Case 2: export default MyComponent; OR export default function() {} / class {} / () => {}
    else if (ts.isExportAssignment(node)) {
      // If you directly export a function, class or arrow function, use that expression
      if (
        ts.isFunctionDeclaration(node.expression) ||
        ts.isClassDeclaration(node.expression) ||
        ts.isFunctionExpression(node.expression) ||
        ts.isArrowFunction(node.expression)
      ) {
        potentialComponentNode = node.expression
      }
    }
    // Case 3: export const MyComponent = () => {}; OR export let/var ...
    else if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      // Iterate over the statements in the list (ex: const a = 1, b = 2;)
      for (const declaration of node.declarationList.declarations) {
        // Assume that the component is the first statement exported in the statement
        // and that it has an initializer (function, arrow function, etc.)
        if (declaration.initializer) {
          // The JSDoc may be in the individual statement...
          potentialComponentNode = declaration
          description = extractDescriptionFromJSDoc(
            potentialComponentNode,
            sourceFile
          )
          if (description) return

          // ...or sometimes in the entire VariableStatement
          potentialComponentNode = node
          break // Use the statement's JSDoc if it was not found in the statement
        }
      }
    }

    // If we find a candidate component node, extract its JSDoc description
    if (potentialComponentNode) {
      description = extractDescriptionFromJSDoc(
        potentialComponentNode,
        sourceFile
      )
      // If found, the 'return' inside the forEachChild will stop the iteration
      // if the description already has a value (thanks to the 'if (description) return;' at the beginning).
    }
  })

  return description
}

/**
 * Extract props from the component interface or type
 */
function extractProps(sourceFile: ts.SourceFile): PropDefinition[] {
  const props: PropDefinition[] = []
  let propsInterface: ts.InterfaceDeclaration | null = null
  let propsType: ts.TypeAliasDeclaration | null = null

  // Find the props interface or type
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith("Props")) {
      propsInterface = node
    } else if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.text.endsWith("Props")
    ) {
      propsType = node
    }
  })

  // Extract props from interface
  if (propsInterface) {
    ;(propsInterface as ts.InterfaceDeclaration).members.forEach((member) => {
      if (ts.isPropertySignature(member) && member.name) {
        const propName = member.name.getText(sourceFile)
        const isRequired = !member.questionToken
        const propType = member.type ? member.type.getText(sourceFile) : "any"
        const description = getJSDocDescription(member)
        const defaultValue = getDefaultValueFromJSDoc(member)

        props.push({
          name: propName,
          type: propType,
          required: isRequired,
          defaultValue,
          description
        })
      }
    })
  }
  // Extract props from type
  else if (
    propsType &&
    (propsType as ts.TypeAliasDeclaration | null)?.type &&
    ts.isTypeLiteralNode((propsType as ts.TypeAliasDeclaration).type)
  ) {
    ;(
      (propsType as ts.TypeAliasDeclaration).type as ts.TypeLiteralNode
    ).members.forEach((member: ts.TypeElement) => {
      if (ts.isPropertySignature(member) && member.name) {
        const propName = member.name.getText(sourceFile)
        const isRequired = !member.questionToken
        const propType = member.type ? member.type.getText(sourceFile) : "any"
        const description = getJSDocDescription(member)
        const defaultValue = getDefaultValueFromJSDoc(member)

        props.push({
          name: propName,
          type: propType,
          required: isRequired,
          defaultValue,
          description
        })
      }
    })
  }

  return props
}

/**
 * Get JSDoc comments for a node
 */
function getJSDocComments(node: ts.Node): string[] {
  const comments: string[] = []
  const nodeText = node.getFullText()
  const commentRanges = ts.getLeadingCommentRanges(nodeText, 0)

  if (commentRanges) {
    commentRanges.forEach((range) => {
      if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
        const comment = nodeText.substring(range.pos, range.end)
        if (comment.startsWith("/**")) {
          comments.push(comment)
        }
      }
    })
  }

  return comments
}

/**
 * Get the description from JSDoc comments
 */
function getJSDocDescription(node: ts.Node): string {
  const jsDocComments = getJSDocComments(node)
  if (jsDocComments.length === 0) return ""

  // Extract the description from the JSDoc comment
  const comment = jsDocComments[0]
  // Remove the /** and */ and * at the beginning of lines
  let description = comment
    .replace(/\/\*\*|\*\//g, "")
    .replace(/\n\s*\*/g, "\n")
    .trim()

  // Remove @tags and everything after them
  const tagIndex = description.search(/@\w+/)
  if (tagIndex !== -1) {
    description = description.substring(0, tagIndex).trim()
  }

  return description
}

/**
 * Get the default value from JSDoc comments
 */
function getDefaultValueFromJSDoc(node: ts.Node): string | undefined {
  const jsDocComments = getJSDocComments(node)
  if (jsDocComments.length === 0) return undefined

  // Look for @default tag
  const comment = jsDocComments[0]
  const defaultMatch = comment.match(/@default\s+(.+?)(\n|$|\*)/)
  return defaultMatch ? defaultMatch[1].trim() : undefined
}
