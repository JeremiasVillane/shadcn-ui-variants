"use client"

import {
  CircleDollarSign,
  CircleFadingArrowUp,
  CircleHelp,
  CircleUserRound
} from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertStyleVariant,
  AlertTitle,
  AlertVariant
} from "@/components/ui/alert"

export interface AlertPlaygroundProps {
  variant: AlertVariant
  styleVariant: AlertStyleVariant
  withIcon: boolean
  customIcon: string
}

export function AlertPlayground({
  variant,
  styleVariant,
  withIcon,
  customIcon
}: AlertPlaygroundProps) {
  const customIcons: Record<string, React.ReactElement> = {
    CircleUserRound: <CircleUserRound className="size-4" />,
    CircleDollarSign: <CircleDollarSign className="size-4" />,
    CircleHelp: <CircleHelp className="size-4" />,
    CircleFadingArrowUp: <CircleFadingArrowUp className="size-4" />
  }

  return (
    <Alert
      variant={variant}
      styleVariant={styleVariant}
      withIcon={withIcon}
      {...(customIcon !== "none"
        ? { customIcon: customIcons[customIcon] }
        : {})}
    >
      <AlertTitle>Pay attention!</AlertTitle>
      <AlertDescription>The world is around you.</AlertDescription>
    </Alert>
  )
}
