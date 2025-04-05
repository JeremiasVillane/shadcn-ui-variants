"use client"

import { AlertPlaygroundProps } from "./alert-playground"

export const alertPlaygroundCode = ({
  variant,
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
      <AlertTitle>Pay attention!</AlertTitle>
      <AlertDescription>The world is around you.</AlertDescription>
    </Alert>
  )
}
`

  return code
}
