"use client"

import { FlexTableProps } from "@/components/ui/flex-table"

export const flexTablePlaygroundCode = ({
  orientation,
  sortable
}: FlexTableProps): string => {
  const code = `import { FlexTable } from "@/components/ui/flex-table"

export function FlexTablePlayground() {
  const data = [
    { Task: "Design", Hours: 12 },
    { Task: "Development", Hours: 30 },
    { Task: "Testing", Hours: 8 }
  ]

  return (
    <FlexTable
      data={data}${
        orientation !== "vertical"
          ? `
      orientation="${orientation}"`
          : ""
      }${
        sortable
          ? `
      sortable`
          : ""
      }
      formatter={(value, _, key) => {
        if (key === "Hours")
          return (
            <span className="font-semibold text-foreground/70">{value}h</span>
          )
        return value
      }}
    />
  )
}
  `

  return code
}
