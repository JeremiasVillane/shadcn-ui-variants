"use client"

import type { CheckboxProps } from "@/components/ui/checkbox"

export const checkboxPlaygroundCode = ({ variant }: CheckboxProps) => {
  const code = `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxPlayground() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms"${variant !== "default" ? ` variant="${variant}"` : ""} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}
`

  return code
}
