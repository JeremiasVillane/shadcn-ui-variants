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
  AlertDialogStyleVariant,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogVariant
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export interface AlertDialogPlaygroundProps {
  variant: AlertDialogVariant
  styleVariant: AlertDialogStyleVariant
  withIcon: boolean
  customIcon: string
  separatedHeader: boolean
  separatedFooter: boolean
}

export default function AlertDialogPlayground({
  variant,
  styleVariant,
  withIcon,
  customIcon,
  separatedHeader,
  separatedFooter
}: AlertDialogPlaygroundProps) {
  const customIcons: Record<string, React.ReactElement> = {
    CircleUserRound: <CircleUserRound />,
    CircleDollarSign: <CircleDollarSign />,
    CircleHelp: <CircleHelp />,
    CircleFadingArrowUp: <CircleFadingArrowUp />
  }

  return (
    <AlertDialog
      variant={variant}
      styleVariant={styleVariant}
      withIcon={withIcon}
      {...(customIcon !== "none"
        ? { customIcon: customIcons[customIcon] }
        : {})}
      separatedHeader={separatedHeader}
      separatedFooter={separatedFooter}
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
