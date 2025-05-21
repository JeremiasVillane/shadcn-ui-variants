"use client"

import { FlexTable } from "@/components/ui/flex-table"

export function FlexTableExample6() {
  const products = [
    {
      name: "T-shirt",
      price: 19.99,
      category: "Apparel",
      stock: 120,
      status: "active",
      date: "2025-04-15"
    },
    {
      name: "Wireless Headphones",
      price: 79.95,
      category: "Electronics",
      stock: 45,
      status: "inactive",
      date: "2025-02-10"
    },
    {
      name: "Urban Backpack",
      price: 39.5,
      category: "Accessories",
      stock: 80,
      status: "active",
      date: "2025-03-01"
    },
    {
      name: "Thermos Bottle",
      price: 25,
      category: "Home Goods",
      stock: 200,
      status: "active",
      date: "2025-05-12"
    },
    {
      name: "Mechanical Keyboard",
      price: 99.99,
      category: "Electronics",
      stock: 30,
      status: "inactive",
      date: "2025-01-22"
    }
  ]

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-max">
        <FlexTable
          variant="striped"
          data={products}
          orientation="vertical"
          sortable
          filterBy={(row) => row.status === "active"}
          formatter={(value, index, key) => {
            if (key === "price") return `$${value}`
            if (key === "date") return new Date(value).toLocaleDateString()
            return value
          }}
        />
      </div>
    </div>
  )
}
