"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbSeparatorVariant,
  BreadcrumbVariant
} from "@/components/ui/breadcrumb"

export interface BreadcrumbPlaygroundProps {
  variant: BreadcrumbVariant
  separatorVariant: BreadcrumbSeparatorVariant
}

export function BreadcrumbPlayground({
  variant,
  separatorVariant
}: BreadcrumbPlaygroundProps) {
  return (
    <Breadcrumb variant={variant} separatorVariant={separatorVariant}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
