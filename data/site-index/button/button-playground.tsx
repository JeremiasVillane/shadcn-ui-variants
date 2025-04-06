"use client"

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailIcon,
  PlusIcon,
  PrinterIcon,
  SparklesIcon
} from "lucide-react"

import { Button, ButtonProps } from "@/components/ui/button"

export interface ButtonPlaygroundProps {
  variant: ButtonProps["variant"]
  size: ButtonProps["size"]
  isLoading: boolean
  iconLeft: string
  iconRight: string
  iconAnimation: ButtonProps["iconAnimation"]
  iconAnimationTarget: ButtonProps["iconAnimationTarget"]
  disabled: boolean
}

export function ButtonPlayground({
  variant,
  size,
  isLoading,
  iconLeft,
  iconRight,
  iconAnimation,
  iconAnimationTarget,
  disabled
}: ButtonPlaygroundProps) {
  const leftIcons: Record<string, React.ReactElement> = {
    "<ArrowLeftIcon />": <ArrowLeftIcon />,
    "<PrinterIcon />": <PrinterIcon />,
    "<MailIcon />": <MailIcon />
  }

  const rightIcons: Record<string, React.ReactElement> = {
    "<SparklesIcon />": <SparklesIcon />,
    "<PlusIcon />": <PlusIcon />,
    "<ArrowRightIcon />": <ArrowRightIcon />
  }

  return (
    <Button
      {...{
        variant,
        size,
        isLoading,
        iconAnimation,
        iconAnimationTarget,
        disabled,
        ...(iconLeft !== "none" ? { iconLeft: leftIcons[iconLeft] } : {}),
        ...(iconRight !== "none" ? { iconRight: rightIcons[iconRight] } : {})
      }}
    >
      Click me!
    </Button>
  )
}
