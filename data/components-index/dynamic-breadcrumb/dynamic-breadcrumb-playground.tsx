"use client"

import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb"

export interface DynamicBreadcrumbPlaygroundProps {
  displayHome: boolean
  activeLinks: boolean
}

export function DynamicBreadcrumbPlayground({
  displayHome,
  activeLinks
}: DynamicBreadcrumbPlaygroundProps) {
  return (
    <div>
      <DynamicBreadcrumb {...{ displayHome, activeLinks }} />
    </div>
  )
}
