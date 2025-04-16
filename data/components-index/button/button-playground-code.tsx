"use client"

import type { ButtonProps } from "@/components/ui/button"

export const buttonPlaygroundCode = ({
  variant,
  size,
  isLoading,
  iconAnimation,
  iconAnimationTarget,
  disabled
}: ButtonProps) => {
  const isAnimated = iconAnimation !== "none"

  const code = `
import { ArrowRightIcon, MailIcon } from "lucide-react"
    
import { Button } from "@/components/ui/button"

export function ButtonPlayground() {
  return (
    <Button iconLeft={<MailIcon className="opacity-60" />} iconRight={<ArrowRightIcon className="opacity-80" />}${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "default" ? ` size="${size}"` : ""}${isAnimated ? ` iconAnimation="${iconAnimation}"` : ""}${isAnimated && iconAnimationTarget !== "none" ? ` iconAnimationTarget="${iconAnimationTarget}"` : ""}${isLoading ? " isLoading" : ""}${disabled ? " disabled" : ""}>
      Click me!
    </Button>
  )
}
`

  return code
}
