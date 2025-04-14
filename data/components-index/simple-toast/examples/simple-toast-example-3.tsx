"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/simple-toast"

export function SimpleToastExample3() {
  return (
    <Button
      onClick={() =>
        toast({
          title: "¡Zoom!",
          type: "warning",
          position: "top-center",
          enterAnimationType: "zoom-in",
          // exitAnimationType will be inferred as "zoom-out"
          duration: 3000,
          showProgressBar: false
        })
      }
    >
      Toast with Zoom (Top Center)
    </Button>
  )
}
