"use client"

import type { ScrollDownButtonProps } from "@/components/ui/scroll-down-button"

export const scrollDownButtonPlaygroundCode = ({
  variant,
  targetId,
  text,
  offset
}: ScrollDownButtonProps) => {
  const code = `import { ScrollDownButton } from "@/components/ui/scroll-down-button"
export function ScrollDownButtonPlayground() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <section className="flex flex-col items-center">
        <h1 className="mb-4 text-2xl font-bold">
          Scroll Down Button Playground
        </h1>
        <p className="mb-8">
          This is a playground for the Scroll Down Button component.
        </p>
        <ScrollDownButton variant="${variant}"${!!targetId && targetId.length > 0 ? ` targetId="${targetId}"` : ""}${!!text && text.length > 0 ? ` text="${text}"` : ""}${!!offset && offset > 0 ? ` offset="${offset}"` : ""} className="w-full" />
      </section>
    </div>
  )
}`
  return code
}
