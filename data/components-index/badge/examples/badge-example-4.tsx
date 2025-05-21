"use client"

import { Badge } from "@/components/ui/badge"

export function BadgeExample4() {
  return (
    <div className="space-y-6">
      <Badge
        size="lg"
        className="border-0 bg-gradient-to-r from-pink-500 to-purple-500"
      >
        Gradient
      </Badge>

      <Badge size="lg" className="shadow-lg shadow-blue-500/50" variant="info">
        Shadow
      </Badge>

      <Badge size="lg" className="animate-pulse" variant="warning">
        Animated
      </Badge>

      <Badge size="lg" className="border-2 border-dashed" variant="outline">
        Dashed Border
      </Badge>
    </div>
  )
}
