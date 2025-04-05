"use client"

import {
  CircleDollarSign,
  CircleFadingArrowUp,
  CircleHelp,
  CircleUserRound
} from "lucide-react"

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

export interface AlertDialogPlaygroundProps {
  variant: AlertDialogVariant
  withIcon: boolean
  customIcon: string
}

export default function AlertDialogPlayground({
  variant,
  withIcon,
  customIcon
}: AlertDialogPlaygroundProps) {
  const customIcons: Record<string, React.ReactElement> = {
    CircleUserRound: <CircleUserRound className="size-4" />,
    CircleDollarSign: <CircleDollarSign className="size-4" />,
    CircleHelp: <CircleHelp className="size-4" />,
    CircleFadingArrowUp: <CircleFadingArrowUp className="size-4" />
  }

  return (
    <AlertDialog
      variant={variant}
      withIcon={withIcon}
      {...(customIcon !== "none"
        ? { customIcon: customIcons[customIcon] }
        : {})}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
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
