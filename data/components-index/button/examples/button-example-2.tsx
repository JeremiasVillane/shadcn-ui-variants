"use client"

import { PlusCircle } from "lucide-react"

import { Button, LeftInsetButton } from "@/components/ui/button"

export function ButtonExample2() {
  return (
    <article>
      <Button variant="outline" size="sm">
        <LeftInsetButton aria-label="Add item" className="px-2">
          <PlusCircle className="h-4 w-4 text-green-600" />
        </LeftInsetButton>
        Add New Item
      </Button>
    </article>
  )
}
