"use client"

import { LogOut } from "lucide-react"

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

export function AlertDialogExample4() {
  return (
    <AlertDialog variant="warning" styleVariant="center" withIcon={false}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Show Session Warning
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Session Is About To Expire</AlertDialogTitle>
          <AlertDialogDescription>
            To protect your account, your session will automatically log you out
            in 5 minutes for inactivity. Save any unsaved work.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Staying Logged In</AlertDialogCancel>
          <AlertDialogAction onClick={() => console.log("Logging out...")}>
            <LogOut className="mr-2 h-4 w-4" /> Logout Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
