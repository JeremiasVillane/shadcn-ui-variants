"use client"

import {
  DynamicBreadcrumb,
  type DynamicBreadcrumbProps
} from "@/components/ui/dynamic-breadcrumb"

export function DynamicBreadcrumbPlayground({
  displayHome,
  activeLinks
}: DynamicBreadcrumbProps) {
  return (
    <div>
      <DynamicBreadcrumb {...{ displayHome, activeLinks }} />
    </div>
  )
}
