import { ComponentDoc, PropDefinition } from "@/types"
import ts from "typescript"

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

  const props = extractProps(sourceFile)

  return { props }
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
