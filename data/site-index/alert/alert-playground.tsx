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
  AlertTitle,
  AlertVariant
} from "@/components/ui/alert"

export interface AlertPlaygroundProps {
  variant: AlertVariant
  alertTitle: string
  alertDescription: string
  withIcon: boolean
  customIcon?: string
}

export function AlertPlayground({
  variant,
  alertTitle,
  alertDescription,
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
      withIcon={withIcon}
      {...(!!customIcon && customIcon !== "none"
        ? { customIcon: customIcons[customIcon] }
        : {})}
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription>{alertDescription}</AlertDescription>
    </Alert>
  )
}
