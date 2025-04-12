"use client"

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import {
  Button,
  LeftInsetButton,
  RightInsetButton
} from "@/components/ui/button"

export function ButtonExample4() {
  return (
    <article>
      <Button variant="outline">
        <LeftInsetButton aria-label="Dislike">
          <ThumbsDownIcon size={16} />{" "}
          <span className="hidden md:inline-block">Dislike</span>
        </LeftInsetButton>
        <RightInsetButton aria-label="Like">
          <ThumbsUpIcon size={16} />{" "}
          <span className="hidden md:inline-block">Like</span>
        </RightInsetButton>
      </Button>
    </article>
  )
}
