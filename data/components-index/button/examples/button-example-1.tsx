"use client"

import { ChevronDown, Download } from "lucide-react"

import { Button, RightInsetButton } from "@/components/ui/button"

export function ButtonExample1() {
  return (
    <article>
      <Button variant="success" iconLeft={<Download />} iconAnimation="zoomIn">
        Download File
        <RightInsetButton aria-label="More download options">
          <ChevronDown className="h-4 w-4" />
        </RightInsetButton>
      </Button>
    </article>
  )
}
