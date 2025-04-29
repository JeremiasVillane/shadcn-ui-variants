import { MetadataRoute } from "next"
import { components } from "@/data/content-index"
import { publicUrl } from "@/env.mjs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const componentsSitemap: MetadataRoute.Sitemap = components.map(
    ({ name }) => ({
      url: `${publicUrl}/components/${name}`,
      changeFrequency: "daily",
      priority: 1,
      lastModified
    })
  )

  return [
    {
      url: publicUrl,
      changeFrequency: "monthly",
      priority: 1,
      lastModified
    },
    {
      url: `${publicUrl}/docs`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified
    },
    ...componentsSitemap
  ]
}
