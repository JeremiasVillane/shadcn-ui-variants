import fs from "fs/promises"
import path from "path"
import { glob } from "glob"

import { parseComponentFile } from "../lib/jsdoc-utils"

const COMPONENTS_DIR = path.join(process.cwd(), "components/ui")
const OUTPUT_FILE = path.join(
  process.cwd(),
  ".registry-docs/component-docs.json"
)
const OUTPUT_DIR = path.dirname(OUTPUT_FILE)

async function generateDocs() {
  console.log("Generating component documentation...")
  const componentFiles = await glob("**/*.{ts,tsx}", { cwd: COMPONENTS_DIR })
  const docs: Record<string, any> = {}

  for (const relativePath of componentFiles) {
    try {
      const absolutePath = path.join(COMPONENTS_DIR, relativePath)
      const fileContent = await fs.readFile(absolutePath, "utf-8")

      const componentDoc = parseComponentFile(
        fileContent,
        path.basename(relativePath)
      )

      const componentKey = path
        .join("components/ui", relativePath)
        .replace(/\\/g, "/")
      docs[componentKey] = componentDoc

      // console.log(`Processed: ${componentKey}`)
    } catch (error) {
      console.error(`Error processing ${relativePath}:`, error)
    }
  }

  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true })
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(docs, null, 2))
    console.log(`Component documentation saved to ${OUTPUT_FILE}`)
  } catch (error) {
    console.error(
      `Error writing documentation file or creating directory:`,
      error
    )
  }
}

generateDocs()
