"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbProps
} from "@/components/ui/breadcrumb"

export interface BreadcrumbPlaygroundProps {
  variant: BreadcrumbProps["variant"]
  separatorVariant: BreadcrumbProps["separatorVariant"]
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
          <BreadcrumbLink href="#">Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Unfathomable</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
