import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export const MainHeading: React.FC<ComponentProps<"h1">> = ({
  className,
  ...props
}) => (
  <h1
    className={cn("text-4xl font-bold tracking-tight", className)}
    {...props}
  />
)

export const SubHeading: React.FC<ComponentProps<"h2">> = ({
  className,
  ...props
}) => (
  <h2
    className={cn("text-2xl font-bold tracking-tight", className)}
    {...props}
  />
)

export const SubHeadingSmall: React.FC<ComponentProps<"h3">> = ({
  className,
  ...props
}) => (
  <h3
    className={cn("text-xl font-bold tracking-tight", className)}
    {...props}
  />
)

export const DescriptionText: React.FC<ComponentProps<"p">> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-[17px] text-muted-foreground", className)}
    {...props}
  />
)

export const DescriptionTextSmall: React.FC<ComponentProps<"p">> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-[15px] text-muted-foreground", className)}
    {...props}
  />
)
