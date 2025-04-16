"use client"

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
  type AlertDialogProps
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function AlertDialogPlayground({
  variant,
  styleVariant,
  withIcon,
  separatedHeader,
  separatedFooter
}: AlertDialogProps) {
  return (
    <AlertDialog
      variant={variant}
      styleVariant={styleVariant}
      withIcon={withIcon}
      separatedHeader={separatedHeader}
      separatedFooter={separatedFooter}
    >
      <AlertDialogTrigger asChild>
        <Button>Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This is just an advice</AlertDialogTitle>
          <AlertDialogDescription>
            Everything is happening right now. All of this is going somewhere,
            wether you like it or not. So, sit down.
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
