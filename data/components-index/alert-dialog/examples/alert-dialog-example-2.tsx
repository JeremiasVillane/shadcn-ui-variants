"use client"

import { UploadCloud } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogExample2() {
  return (
    <AlertDialog
      variant="success"
      styleVariant="center"
      withIcon={true}
      separatedHeader={true}
      separatedFooter={true}
    >
      <AlertDialogTrigger asChild>
        <Button
          iconLeft={<UploadCloud className="size-4" />}
          iconAnimation="translateYUp"
        >
          File Upload
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Complete!</AlertDialogTitle>
          <AlertDialogDescription>
            Your file “annual_report.pdf” has been successfully uploaded and is
            ready to be shared.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
