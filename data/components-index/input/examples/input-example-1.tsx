"use client"

import { Input } from "@/components/ui/input"

export function InputExample1() {
  return (
    <div className="container max-w-md">
      <Input placeholder="0.00" startInline="€" endInline="EUR" />
    </div>
  )
}
