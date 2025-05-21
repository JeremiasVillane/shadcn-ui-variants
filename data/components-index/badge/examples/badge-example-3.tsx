"use client"

import { Bell } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function BadgeExample3() {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="relative inline-flex">
        <Bell className="size-7" />
        <Badge shape="circle" size="md" className="absolute -right-1.5 -top-2">
          5
        </Badge>
      </div>

      <div className="relative inline-flex">
        <Bell className="size-7" />
        <Badge
          shape="pill"
          size="xs"
          variant="destructive"
          className="absolute left-3 -top-2"
        >
          New
        </Badge>
      </div>
    </div>
  )
}
