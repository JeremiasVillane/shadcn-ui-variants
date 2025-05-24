"use server"

import { unstable_cache } from "next/cache"
import allDocs from "@/.registry-docs/component-docs.json"
import { env } from "@/env.mjs"
import { ComponentDoc, ComponentDocResult } from "@/types"

const componentDocsData: Record<string, ComponentDoc> = allDocs

export async function getComponentDocumentation(
  componentPath: string | null | undefined,
  apiKey: string
): Promise<ComponentDocResult> {
  if (!componentPath) {
    return { error: "Component path (key) is required" }
  }

  if (apiKey !== env.API_KEY) {
    return {
      error: "Unauthorized"
    }
  }

  const getData = unstable_cache(
    async (key: string): Promise<ComponentDocResult> => {
      console.log(`[Cache Check] Attempting to retrieve data for key: ${key}`)
      try {
        const componentDoc = componentDocsData[key]

        if (!componentDoc) {
          console.warn(`Documentation not found for key: ${key}`)
          // console.warn(`Available keys: ${Object.keys(componentDocsData).join(', ')}`);
          return { error: `Component documentation not found for: ${key}` }
        }

        console.log(`[Cache Miss] Data found for key: ${key}`)
        return { data: componentDoc }
      } catch (error) {
        console.error(
          `Unexpected error retrieving documentation for key ${key}:`,
          error
        )
        return { error: "Failed to retrieve component documentation" }
      }
    },
    ["componentDocData"],
    {
      revalidate: 1,
      tags: ["docs", componentPath]
    }
  )

  return await getData(componentPath)
}
