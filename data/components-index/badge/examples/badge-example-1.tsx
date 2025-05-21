"use client"

import { AlertTriangle, Check, Info, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeExample1() {
  return (
    <div className="space-y-4">
      <Badge size="md" leftElement={<Check />} variant="success">
        Completed
      </Badge>
      <Badge size="md" rightElement={<X />} variant="destructive">
        Rejected
      </Badge>
      <Badge size="md" leftElement={<Info />} variant="info">
        Information
      </Badge>
      <Badge size="md" leftElement={<AlertTriangle />} variant="warning">
        Warning
      </Badge>
      <Badge
        size="md"
        leftElement={<Check />}
        rightElement={<Info />}
        variant="success"
      >
        Verified
      </Badge>
    </div>
  )
}
