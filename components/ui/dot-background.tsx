import type React from "react"

import { cn } from "@/lib/utils"

interface DotBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  bgStyle?: string
  children: React.ReactNode
}

export function DotBackground({
  children,
  bgStyle,
  className,
  ...props
}: DotBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          bgStyle
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      {children}
    </div>
  )
}
