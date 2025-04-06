"use client"

import { ButtonPlaygroundProps } from "./button-playground"

export const buttonPlaygroundCode = ({
  variant,
  size,
  isLoading,
  iconLeft,
  iconRight,
  iconAnimation,
  iconAnimationTarget,
  disabled
}: ButtonPlaygroundProps) => {
  const showIcon = iconLeft !== "none" || iconRight !== "none"
  const isIconLeft = iconLeft !== "none"
  const isIconRight = iconRight !== "none"
  const isAnimated = iconAnimation !== "none"

  const code = `"use client"
${
  showIcon
    ? `
import { ${isIconLeft ? iconLeft.match(/<([^>]+) \/>/)![1] : ""}${isIconRight ? `${isIconLeft ? ", " : ""}${iconRight.match(/<([^>]+) \/>/)![1]}` : ""} } from "lucide-react`
    : ""
}

import { Button } from "@/components/ui/button"

export function ButtonPlayground() {
  return (
    <Button${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "default" ? ` size="${size}"` : ""}${isIconLeft ? ` iconLeft={${iconLeft}}` : ""}${isIconRight ? ` iconRight={${iconRight}}` : ""}${isAnimated ? ` iconAnimation="${iconAnimation}"` : ""}${isAnimated && iconAnimationTarget !== "none" ? ` iconAnimationTarget="${iconAnimationTarget}"` : ""}${isLoading ? " isLoading" : ""}${disabled ? " disabled" : ""}>
      Click me!
    </Button>
  )
}
`

  return code
}
