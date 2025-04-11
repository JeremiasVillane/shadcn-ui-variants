"use client"

import { DynamicBreadcrumbPlaygroundProps } from "./dynamic-breadcrumb-playground"

export const dynamicBreadcrumbCode = ({
  displayHome,
  activeLinks
}: DynamicBreadcrumbPlaygroundProps) => {
  const code = `import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb"

export function DynamicBreadcrumbPlayground() {
  return (
    <div>
      <DynamicBreadcrumb displayHome={${displayHome}} activeLinks={${activeLinks}} />
    </div>
  )
}
`

  return code
}
