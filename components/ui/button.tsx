import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:opacity-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success:
          "bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-500/90 dark:hover:bg-emerald-600/90",
        warning:
          "bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-500/90 dark:hover:bg-amber-600/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        xs: "h-6 px-1.5",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const animationClassesMap = {
  none: "",
  translateXRight: "transition-transform group-hover:translate-x-0.5",
  translateXLeft: "transition-transform group-hover:-translate-x-0.5",
  translateYUp: "transition-transform group-hover:-translate-y-0.5",
  translateYDown: "transition-transform group-hover:translate-y-0.5",
  spinLeft: "transition-transform group-hover:-rotate-45",
  spinRight: "transition-transform group-hover:rotate-45",
  spinUp: "transition-transform group-hover:-rotate-90",
  spinDown: "transition-transform group-hover:rotate-90",
  zoomIn: "transition-transform group-hover:scale-105",
  zoomOut: "transition-transform group-hover:scale-95",
  bounce: "transition-transform group-hover:animate-bounce",
  ping: "transition-transform group-hover:animate-ping",
  pulse: "transition-transform group-hover:animate-pulse opacity-90",
  spin: "transition-transform group-hover:animate-spin"
} as const

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  iconLeft?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  iconRight?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  iconAnimation?: keyof typeof animationClassesMap
  iconAnimationTarget?: "left" | "right" | "both" | "none"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      iconLeft,
      iconRight,
      iconAnimation = "none",
      iconAnimationTarget = "none",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const targetAnimationClass =
      iconAnimation && iconAnimation !== "none"
        ? animationClassesMap[iconAnimation]
        : ""

    const renderIcon = (
      iconElement: React.ReactElement | undefined,
      targetSide: "left" | "right",
      baseMarginClass: string
    ) => {
      if (!iconElement || variant === "link" || size === "icon") return null

      const shouldAnimate =
        targetAnimationClass &&
        (iconAnimationTarget === targetSide ||
          iconAnimationTarget === "both" ||
          !(!!iconLeft && !!iconRight))

      return React.cloneElement(iconElement as React.ReactElement<any>, {
        "aria-hidden": "true",
        className: cn(
          baseMarginClass,
          "opacity-60",
          (iconElement as React.ReactElement<any>).props.className,
          shouldAnimate && targetAnimationClass
        )
      })
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <>
          {isLoading && variant !== "link" && size !== "icon" ? (
            <Loader2 className="-ms-1 size-4 animate-spin" />
          ) : (
            renderIcon(iconLeft, "left", "-ms-1")
          )}
          {children}
          {renderIcon(iconRight, "right", "-me-1")}
        </>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
