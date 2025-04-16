"use client"

import { ArrowRightIcon, MailIcon } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"

export function ButtonPlayground({
  variant,
  size,
  isLoading,
  iconAnimation,
  iconAnimationTarget,
  disabled
}: ButtonProps) {
  return (
    <Button
      {...{
        variant,
        size,
        isLoading,
        iconAnimation,
        iconAnimationTarget,
        disabled,
        iconLeft: <MailIcon />,
        iconRight: <ArrowRightIcon />
      }}
    >
      Click me!
    </Button>
  )
}
