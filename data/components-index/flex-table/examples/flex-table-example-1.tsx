"use client"

import { FlexTable } from "@/components/ui/flex-table"

export function FlexTableExample1() {
  const data = [
    { Name: "Alice", Age: 30 },
    { Name: "Bob", Age: 25 }
  ]

  return (
    <div className="w-full">
      <FlexTable
        data={data}
        className="divide-blue-100 bg-white shadow-sm"
        headerClassName="bg-blue-100 text-blue-900 border-0"
        cellClassName="text-gray-700 border-0 hover:bg-blue-50/50"
      />
    </div>
  )
}
