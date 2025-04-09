import registry from "@/registry.json"

const components = registry.items

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
