"use client"

import type { DynamicBreadcrumbProps } from "@/components/ui/dynamic-breadcrumb"

export const dynamicBreadcrumbCode = ({
  displayHome,
  activeLinks
}: DynamicBreadcrumbProps) => {
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
