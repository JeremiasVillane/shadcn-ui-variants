"use client"

import { jsxStringToName } from "@/lib/utils"

import { InputPlaygroundProps } from "./input-playground"

export const inputPlaygroundCode = ({
  startIcon,
  endIcon,
  startInline,
  endInline,
  startAddon,
  endAddon,
  maxLength,
  showMaxLength
}: InputPlaygroundProps): string => {
  const requiredIconNames = new Set<string>()

  if (startIcon !== "none") {
    requiredIconNames.add(jsxStringToName(startIcon))
  }

  if (endIcon !== "none") {
    requiredIconNames.add(jsxStringToName(endIcon))
  }

  if (endAddon === "MailIcon") {
    requiredIconNames.add("MailIcon")
  }

  let lucideImportStatement = ""
  if (requiredIconNames.size > 0) {
    const sortedIconNames = Array.from(requiredIconNames).sort()
    lucideImportStatement = `import { ${sortedIconNames.join(", ")} } from "lucide-react"\n`
  }

  const inputProps: string[] = []
  inputProps.push(`id="inputId"`)
  inputProps.push(`placeholder="Enter your information..."`)

  if (startIcon !== "none") {
    inputProps.push(`startIcon={${startIcon}}`)
  }
  if (endIcon !== "none") {
    inputProps.push(`endIcon={${endIcon}}`)
  }
  if (startInline.length > 0) {
    inputProps.push(`startInline="${startInline}"`)
  }
  if (endInline.length > 0) {
    inputProps.push(`endInline="${endInline}"`)
  }
  if (startAddon !== "none") {
    inputProps.push(`startAddon="${startAddon}"`)
  }
  if (endAddon === "MailIcon") {
    inputProps.push(`endAddon={<MailIcon size={18} />}`)
  } else if (endAddon !== "none") {
    inputProps.push(`endAddon="${endAddon}"`)
  }
  if (showMaxLength !== "false") {
    inputProps.push(`showMaxLength="${showMaxLength}"`)
  }
  if (maxLength !== undefined) {
    inputProps.push(`maxLength={${maxLength}}`)
  }

  const code = `"use client"

${lucideImportStatement}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputPlayground() {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="inputId">Advanced input</Label>
      <Input ${inputProps.join(" ")} />
    </div>
  )
}
`

  return code
}
