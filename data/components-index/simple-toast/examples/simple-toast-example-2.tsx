"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/simple-toast"

export function SimpleToastExample2() {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        toast({
          title: "Critical Error",
          description: "Could not save file. Check permissions.",
          type: "error",
          duration: Infinity, // Does not close by itself
          showCloseButton: true // X button to close
        })
      }
    >
      Simulate Permanent Error
    </Button>
  )
}
