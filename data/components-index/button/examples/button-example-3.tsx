"use client"

import { Settings } from "lucide-react"

import { Button, RightInsetButton } from "@/components/ui/button"

export function ButtonExample3() {
  return (
    <article>
      <Button>
        Main Action
        <RightInsetButton asChild aria-label="Go to settings page">
          <a href="#">
            <Settings className="h-4 w-4" />
          </a>
        </RightInsetButton>
      </Button>
    </article>
  )
}
