"use client"

import { AlertDialogPlaygroundProps } from "./alert-dialog-playground"

export const alertDialogPlaygroundCode = ({
  variant,
  styleVariant,
  withIcon,
  customIcon,
  separatedHeader,
  separatedFooter
}: AlertDialogPlaygroundProps) => {
  const code = `"use client"
${
  withIcon && !!customIcon && customIcon !== "none"
    ? `import { ${customIcon} } from "lucide-react"
`
    : ""
}
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogVariant
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function AlertDialogPlayground() {
  return (
    <AlertDialog${variant !== "default" ? ` variant="${variant}"` : ""}${styleVariant !== "left" ? ` styleVariant="${styleVariant}"` : ""}${withIcon ? " withIcon={true}" : ""}${withIcon && !!customIcon && customIcon !== "none" ? ` customIcon={<${customIcon} />}` : ""}${separatedHeader ? " separatedHeader={true}" : ""}${separatedFooter ? " separatedFooter={true}" : ""}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This is just an advice</AlertDialogTitle>
          <AlertDialogDescription>
            Everything is happening right now. All of this is going somewhere, wether you like it or not. So, sit down.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
`

  return code
}
