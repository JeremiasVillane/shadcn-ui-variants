"use client"

import type { InputProps } from "@/components/ui/input"

export const inputPlaygroundCode = ({
  startInline,
  endInline,
  maxLength,
  showMaxLength
}: InputProps): string => {
  const code = `import { ArrowRightIcon } from "lucide-react"

import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/local/ui/label"

export function InputPlayground({
  maxLength,
  showMaxLength,
  startInline,
  endInline
}: InputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="inputId">Advanced input:</Label>
      <Input
        id="inputId"
        placeholder="Enter your information..."
        endIcon={<ArrowRightIcon />}
        startInline="${startInline}"
        endInline="${endInline}"
        startAddon="http://"
        showMaxLength={${showMaxLength}}
        maxLength=${maxLength}
        autoComplete="off"
      />
    </div>
  )
}`

  return code
}
