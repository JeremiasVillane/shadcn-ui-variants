"use client"

import { BellRing, Sparkles } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogExample3() {
  return (
    <AlertDialog
      variant="info"
      styleVariant="left"
      withIcon={true}
      customIcon={<Sparkles className="h-5 w-5 text-purple-600" />}
      separatedFooter={true}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          iconLeft={<BellRing className="size-4" />}
          iconAnimation="pulse"
        >
          Updates
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Features Available!</AlertDialogTitle>
          <AlertDialogDescription>
            We've released an exciting update with user interface improvements
            and new collaboration tools - explore them now!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Later</AlertDialogCancel>
          <AlertDialogAction>Explore What's New</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
