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
        iconLeft: <MailIcon className="opacity-60" />,
        iconRight: <ArrowRightIcon className="opacity-80" />
      }}
    >
      Click me!
    </Button>
  )
}
