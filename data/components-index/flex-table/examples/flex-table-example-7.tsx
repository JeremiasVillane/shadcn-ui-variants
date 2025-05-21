"use client"

import { useState } from "react"

import { FlexTable } from "@/components/ui/flex-table"
import { Input } from "@/components/ui/input"

export function FlexTableExample7() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const sampleData = [
    { Name: "John", Age: 25, Occupation: "Engineer" },
    { Name: "Jane", Age: 32, Occupation: "Designer" },
    { Name: "Bob", Age: 41, Occupation: "Chef" },
    { Name: "Charles", Age: 29, Occupation: "Doctor" }
  ]

  const filteredData = sampleData.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value.trim()) return true
      const castKey = key as keyof typeof row
      return String(row[castKey]).toLowerCase().includes(value.toLowerCase())
    })
  })

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row">
          {Object.keys(sampleData[0]).map((key) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-muted-foreground">
                {key}
              </label>
              <Input
                placeholder={`Filter by ${key}`}
                value={filters[key] || ""}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="w-full overflow-auto">
          <div className="min-w-max">
            <FlexTable
              data={filteredData}
              orientation={"vertical"}
              sortable
              formatter={(value, rowIndex, key) => {
                if (key === "Age") {
                  return (
                    <span className="font-mono text-blue-600">{value} y/o</span>
                  )
                }
                if (key === "Occupation") {
                  return (
                    <span className="italic text-muted-foreground">
                      {value}
                    </span>
                  )
                }
                return value
              }}
              className="border border-border"
              headerClassName="bg-accent text-accent-foreground"
              cellClassName="bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
