"use client"

import { FlexTable } from "@/components/ui/flex-table"

export function FlexTableExample3() {
  const data = [
    { User: "Jane", Active: true, Registry: new Date("2023-02-01") },
    { User: "John", Active: false, Registry: new Date("2023-05-15") }
  ]

  return (
    <div className="w-full">
      <FlexTable
        variant="minimal"
        data={data}
        formatter={(value, _row, key) => {
          if (key === "Active") {
            return value ? "✅" : "❌"
          }
          if (value instanceof Date) {
            return value.toLocaleDateString()
          }
          return value
        }}
      />
    </div>
  )
}
