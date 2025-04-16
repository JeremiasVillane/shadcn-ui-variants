"use client"

import {
  Alert,
  AlertDescription,
  AlertTitle,
  type AlertProps
} from "@/components/ui/alert"

export function AlertPlayground({
  variant,
  styleVariant,
  withIcon
}: AlertProps) {
  return (
    <Alert variant={variant} styleVariant={styleVariant} withIcon={withIcon}>
      <AlertTitle>Pay attention!</AlertTitle>
      <AlertDescription>The world is around you.</AlertDescription>
    </Alert>
  )
}
