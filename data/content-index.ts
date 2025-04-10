import registry from "@/registry.json"
import { RegistryItem } from "@/types"

const components = registry.items as RegistryItem[]

export const contentIndex = [
  {
    label: "Get Started",
    items: [
      {
        name: "Introduction",
        url: "/docs"
      }
    ]
  },
  {
    label: "Components",
    items: components
  }
]
