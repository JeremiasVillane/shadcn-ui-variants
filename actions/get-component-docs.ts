"use server"

import fs from "fs"
import path from "path"
import { unstable_cache } from "next/cache"
import { env } from "@/env.mjs"
import { ComponentDocResult } from "@/types"

import { parseComponentFile } from "@/lib/jsdoc-utils"

export async function getComponentDocumentation(
  componentPath: string | null | undefined,
  apiKey: string
): Promise<ComponentDocResult> {
  if (!componentPath) {
    return { error: "Component path is required" }
  }

  if (apiKey !== env.API_KEY) {
    return {
      error: "Unauthorized"
    }
  }

  const cachedDoc = unstable_cache(
    async () => {
      try {
        const rootDir = process.cwd()
        const absolutePath = path.join(rootDir, componentPath)

        // if (!fs.existsSync(absolutePath)) {
        //   return { error: `Component file not found: ${componentPath}` }
        // }

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
    [componentPath],
    { revalidate: 60 * 60 * 24, tags: ["docs"] }
  )

  return await cachedDoc()
}
