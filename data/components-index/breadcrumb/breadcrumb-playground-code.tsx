"use client"

import { BreadcrumbPlaygroundProps } from "./breadcrumb-playground"

export const breadcrumbPlaygroundCode = ({
  variant,
  separatorVariant
}: BreadcrumbPlaygroundProps) => {
  const code = `"use client"

import {
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
