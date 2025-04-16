"use client"

import type { BreadcrumbProps } from "@/components/ui/breadcrumb"

export const breadcrumbPlaygroundCode = ({
  variant,
  separatorVariant
}: BreadcrumbProps) => {
  const code = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
 
export function BreadcrumbPlayground() {
  return (
    <Breadcrumb variant="${variant}" separatorVariant="${separatorVariant}">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Unfathomable</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

  return code
}
