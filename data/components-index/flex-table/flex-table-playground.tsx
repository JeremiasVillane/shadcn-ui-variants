"use client"

import { FlexTable, FlexTableProps } from "@/components/ui/flex-table"

export function FlexTablePlayground({
  orientation,
  sortable,
  variant
}: FlexTableProps) {
  const data = [
    { Task: "Design", Hours: 12 },
    { Task: "Development", Hours: 30 },
    { Task: "Testing", Hours: 8 }
  ]

  return (
    <div className="w-full md:flex md:items-center md:justify-center">
      <FlexTable
        {...{ data, orientation, sortable, variant }}
        formatter={(value, _, key) => {
          if (key === "Hours")
            return (
              <span className="font-semibold text-foreground/70">{value}h</span>
            )
          return value
        }}
      />
    </div>
  )
}
