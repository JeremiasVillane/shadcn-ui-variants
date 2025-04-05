"use client"

import { AlertPlaygroundProps } from "./alert-playground"

export const alertPlaygroundCode = ({
  variant,
  title,
  description,
  withIcon,
  customIcon
}: AlertPlaygroundProps) => {
  const code = `"use client"
${
  !!withIcon && !!customIcon && customIcon !== "none"
    ? `
import { ${customIcon} } from "lucide-react"
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
    <Alert variant="${variant}"${!withIcon ? ` withIcon={${withIcon}}` : ""}${!!withIcon && !!customIcon && customIcon !== "none" ? ` customIcon={<${customIcon} className="size-4" />}` : ""}>
      <AlertTitle>${title}</AlertTitle>
      <AlertDescription>${description}</AlertDescription>
    </Alert>
  )
}
`

  return code
}
