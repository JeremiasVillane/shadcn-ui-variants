"use client"

import type { AlertDialogProps } from "@/components/ui/alert-dialog"

export const alertDialogPlaygroundCode = ({
  variant,
  styleVariant,
  withIcon,
  separatedHeader,
  separatedFooter
}: AlertDialogProps) => {
  const code = `import {
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
    <AlertDialog${variant !== "default" ? ` variant="${variant}"` : ""}${styleVariant !== "left" ? ` styleVariant="${styleVariant}"` : ""}${withIcon ? " withIcon={true}" : ""}${separatedHeader ? " separatedHeader={true}" : ""}${separatedFooter ? " separatedFooter={true}" : ""}>
      <AlertDialogTrigger asChild>
        <Button>Show Dialog</Button>
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
