"use client"

import { FlexTable } from "@/components/ui/flex-table"

export function FlexTableExample4() {
  type Product = {
    id: string
    name: string
    price: number
    stock: number
  }

  const products: Product[] = [
    { id: "a1", name: "T-Shirt", price: 4500, stock: 12 },
    { id: "b2", name: "Pants", price: 8200, stock: 4 },
    { id: "c3", name: "Shoes", price: 13200, stock: 0 }
  ]

  return (
    <div className="w-full">
      <FlexTable
        variant="outline"
        data={products}
        formatter={(val, _idx, key) => {
          if (key === "price") return `$${val}`
          if (key === "stock" && val === 0)
            return <span className="text-red-600">Out of stock</span>
          return val
        }}
        headerClassName="capitalize"
      />
    </div>
  )
}
