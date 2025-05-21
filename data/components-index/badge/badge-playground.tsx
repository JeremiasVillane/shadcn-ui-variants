"use client"

import { Badge, BadgeProps } from "@/components/ui/badge"

export function BadgePlayground(props: BadgeProps) {
  return <Badge {...props}>{props.shape === "circle" ? "E" : "Example"}</Badge>
}
