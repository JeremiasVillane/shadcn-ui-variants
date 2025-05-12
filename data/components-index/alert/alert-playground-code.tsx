"use client"

import type { AlertProps } from "@/components/ui/alert"

export const alertPlaygroundCode = ({
  variant,
  styleVariant,
  withIcon
}: AlertProps) => {
  const code = `import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"

export function AlertPlayground() {
  return (
    <Alert${variant !== "default" ? ` variant="${variant}"` : ""}${styleVariant !== "outline" ? ` styleVariant="${styleVariant}"` : ""}${withIcon ? ` withIcon` : ""}>
      <AlertTitle>Pay attention!</AlertTitle>
      <AlertDescription>The world is around you.</AlertDescription>
    </Alert>
  )
}
`

  return code
}
