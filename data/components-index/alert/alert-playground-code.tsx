"use client"

import { jsxStringToName } from "@/lib/string-utils"

import { AlertPlaygroundProps } from "./alert-playground"

export const alertPlaygroundCode = ({
  variant,
  styleVariant,
  withIcon,
  customIcon
}: AlertPlaygroundProps) => {
  const code = `"use client"
${
  !!withIcon && !!customIcon && customIcon !== "none"
    ? `
import { ${jsxStringToName(customIcon)} } from "lucide-react"
`
    : ""
}
import {
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"

export function AlertPlayground() {
  return (
    <Alert${variant !== "default" ? ` variant="${variant}"` : ""}${styleVariant !== "outline" ? ` styleVariant="${styleVariant}"` : ""}${withIcon ? ` withIcon={true}` : ""}${withIcon && !!customIcon && customIcon !== "none" ? ` customIcon={<${jsxStringToName(customIcon)} className="size-4" />}` : ""}>
      <AlertTitle>Pay attention!</AlertTitle>
      <AlertDescription>The world is around you.</AlertDescription>
    </Alert>
  )
}
`

  return code
}
