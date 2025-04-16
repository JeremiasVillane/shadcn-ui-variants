"use client"

import {
  ScrollDownButton,
  type ScrollDownButtonProps
} from "@/components/ui/scroll-down-button"

export function ScrollDownButtonPlayground({
  variant,
  targetId,
  text,
  offset
}: ScrollDownButtonProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <section className="flex flex-col items-center">
        <h1 className="mb-4 text-2xl font-bold">
          Scroll Down Button Playground
        </h1>
        <p className="mb-8">
          This is a playground for the Scroll Down Button component.
        </p>
        <ScrollDownButton
          {...{ variant, targetId, text, offset }}
          className="w-full"
        />
      </section>
    </div>
  )
}
