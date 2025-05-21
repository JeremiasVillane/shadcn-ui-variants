"use client"

import { BadgeProps } from "@/components/ui/badge"

export const badgePlaygroundCode = ({
  variant,
  size,
  shape,
  disabled
}: BadgeProps): string => {
  const code = `"import { Badge } from "@/components/ui/badge"

export function BadgePlayground() {
  return <Badge${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "sm" ? ` size="${size}"` : ""}${shape !== "pill" ? ` shape="${shape}"` : ""}${disabled ? " disabled" : ""}>Example</Badge>
}
`

  return code
}
