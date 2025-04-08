"use server"

import fs from "fs"
import path from "path"
import { unstable_cache as cache } from "next/cache"
import { ComponentDocResult } from "@/types"

import { parseComponentFile } from "@/lib/jsdoc"

export const getComponentDocumentation = cache(
  async (
    componentPath: string | null | undefined
  ): Promise<ComponentDocResult> => {
    try {
      if (!componentPath) {
        return { error: "Component path is required" }
      }

      const rootDir = process.cwd()
      const absolutePath = path.join(rootDir, componentPath)

      if (!fs.existsSync(absolutePath)) {
        return { error: `Component file not found: ${componentPath}` }
      }

      const fileContent = fs.readFileSync(absolutePath, "utf-8")

      const componentDoc = parseComponentFile(
        fileContent,
        path.basename(componentPath)
      )

      return { data: componentDoc }
    } catch (error) {
      console.error("Error processing component documentation:", error)
      return { error: "Failed to process component documentation" }
    }
  },
  ["docs"],
  { revalidate: 60 * 60 * 24, tags: ["docs"] }
)
