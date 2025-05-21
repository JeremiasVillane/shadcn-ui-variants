"use client"

import { FlexTable } from "@/components/ui/flex-table"

export function FlexTableExample2() {
  const data = [
    { name: "John Doe", email: "john@example.com", age: 21, status: "Active" },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      age: 27,
      status: "Inactive"
    },
    { name: "Bob Johnson", email: "bob@example.com", age: 33, status: "Active" }
  ]

  return (
    <div className="w-full">
      <FlexTable
        variant="card"
        data={data}
        formatter={(value, rowIndex, key) => {
          if (key === "age" && typeof value === "number" && value > 30) {
            return <span className="font-bold text-red-500">{value}</span>
          }
          if (key === "status") {
            return (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  value === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {value}
              </span>
            )
          }
          return value
        }}
        orientation="horizontal"
        headerClassName="capitalize"
      />
    </div>
  )
}
