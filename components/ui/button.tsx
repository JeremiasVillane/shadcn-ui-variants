"use client"

import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
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
        link: "text-primary underline-offset-4 hover:underline h-auto px-0 py-0"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        xs: "h-6 rounded-md px-1.5 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
)

const animationClasses = {
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

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

interface ButtonProps
  extends BaseButtonProps,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  iconLeft?: React.ReactElement
  iconRight?: React.ReactElement
  iconAnimation?: keyof typeof animationClasses
  iconAnimationTarget?: "left" | "right" | "both" | "none"
}

const createInsetButton = (name: string) => {
  const Component: React.FC<BaseButtonProps> = () => null
  Component.displayName = name
  return Component
}

const LeftInsetButton = createInsetButton("LeftInsetButton")
const RightInsetButton = createInsetButton("RightInsetButton")

const isInsetButton = (component: React.FC, node: React.ReactNode) =>
  React.isValidElement(node) &&
  typeof node.type !== "string" &&
  (node.type as React.FC).displayName === component.displayName

const Button = React.forwardRef<
  HTMLButtonElement | HTMLDivElement,
  ButtonProps
>(
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
      disabled,
      ...props
    },
    ref
  ) => {
    const [leftInset, rightInset, centerChildren] = React.useMemo(() => {
      const left: React.ReactElement<BaseButtonProps>[] = []
      const right: React.ReactElement<BaseButtonProps>[] = []
      const center: React.ReactNode[] = []

      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement(child) &&
          isInsetButton(LeftInsetButton, child)
        )
          left.push(child as React.ReactElement<BaseButtonProps>)
        else if (
          React.isValidElement(child) &&
          isInsetButton(RightInsetButton, child)
        )
          right.push(child as React.ReactElement<BaseButtonProps>)
        else center.push(child)
      })

      return [left[0], right[0], center]
    }, [children])

    const isGroup = !!leftInset || !!rightInset
    const isDisabled = isLoading || disabled
    const animationClass =
      iconAnimation !== "none" ? animationClasses[iconAnimation] : ""
    const shouldAnimate = (side: "left" | "right") =>
      [side, "both"].includes(iconAnimationTarget) ||
      !(!!iconLeft && !!iconRight)

    const renderIcon = (
      icon: React.ReactElement<any, any> | undefined,
      side: "left" | "right"
    ) =>
      icon &&
      React.cloneElement(icon, {
        className: cn(
          "shrink-0 opacity-60",
          icon.props.className,
          shouldAnimate(side) && animationClass
        )
      })

    if (isGroup) {
      const renderInset = (
        inset: React.ReactElement<BaseButtonProps>,
        position: "left" | "right"
      ) => {
        const {
          asChild: insetAsChild,
          className: insetClass,
          ...insetProps
        } = inset?.props || {}
        const Comp: React.ElementType = insetAsChild ? Slot : "button"

        return React.createElement(Comp, {
          type: "button",
          ...insetProps,
          ...(!asChild && { disabled: isDisabled || insetProps.disabled }),
          className: cn(
            buttonVariants({ variant, size }),
            "relative border-0 rounded-none focus-visible:z-10",
            position === "left" ? "rounded-s-md" : "rounded-e-md",
            insetClass
          )
        })
      }

      return (
        <div
          className={cn(
            "inline-flex items-stretch divide-x divide-border overflow-hidden rounded-md shadow-sm",
            className
          )}
          ref={ref as React.Ref<HTMLDivElement>}
          role="group"
        >
          {leftInset && renderInset(leftInset, "left")}

          {centerChildren.length > 0 &&
            React.createElement(
              asChild ? Slot : "button",
              {
                type: "button",
                ...props,
                ...(!asChild && { disabled: isDisabled }),
                className: cn(
                  buttonVariants({ variant, size }),
                  "relative border-0 rounded-none focus-visible:z-10",
                  !leftInset && "rounded-s-md",
                  !rightInset && "rounded-e-md"
                )
              },
              <>
                {isLoading && (
                  <Loader2 className="size-4 shrink-0 animate-spin" />
                )}
                {!isLoading && renderIcon(iconLeft, "left")}
                <Slottable>{centerChildren}</Slottable>
                {renderIcon(iconRight, "right")}
              </>
            )}

          {rightInset && renderInset(rightInset, "right")}
        </div>
      )
    }

    const Comp: React.ElementType = asChild ? Slot : "button"
    const shouldShowIcons = variant !== "link" && size !== "icon"
    const loader = isLoading && (
      <Loader2 className="size-4 shrink-0 animate-spin" />
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isDisabled}
        {...props}
      >
        {shouldShowIcons && (isLoading ? loader : renderIcon(iconLeft, "left"))}
        <Slottable>{children}</Slottable>
        {shouldShowIcons && renderIcon(iconRight, "right")}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, LeftInsetButton, RightInsetButton }
export type { ButtonProps, BaseButtonProps as InsetButtonProps }
