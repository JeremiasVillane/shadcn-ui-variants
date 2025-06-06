import * as React from "react"
import { cva } from "class-variance-authority"
import { CheckCircle2, CircleAlert, CircleX, InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  /** @default "outline" */
  styleVariant?: "outline" | "fill" | "bootstrap"
  /** @default false */
  withIcon?: boolean
  customIcon?: React.ReactElement
}

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:-translate-y-0.5 flex flex-col gap-1.5",
  {
    variants: {
      variant: {
        default: "[&>svg]:text-primary",
        destructive: "text-destructive [&>svg]:text-destructive",
        success: "text-emerald-600 [&>svg]:text-emerald-600",
        warning: "text-amber-600 [&>svg]:text-amber-600",
        info: "text-cyan-600 [&>svg]:text-cyan-600"
      },
      styleVariant: {
        outline: "bg-background [&>div]:text-muted-foreground",
        fill: "border-transparent [&>div]:text-white",
        bootstrap: "border [&>div]:text-muted-foreground"
      }
    },
    compoundVariants: [
      {
        variant: "default",
        styleVariant: "outline",
        className: "text-primary border-primary/30"
      },
      {
        variant: "default",
        styleVariant: "fill",
        className: "bg-primary text-background [&>svg]:text-background"
      },
      {
        variant: "default",
        styleVariant: "bootstrap",
        className:
          "bg-primary/10 text-primary/80 [&>svg]:text-primary/80 dark:text-white dark:[&>svg]:text-white border-primary/30"
      },
      {
        variant: "destructive",
        styleVariant: "outline",
        className: "border-destructive/50 dark:border-destructive"
      },
      {
        variant: "destructive",
        styleVariant: "fill",
        className:
          "bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground"
      },
      {
        variant: "destructive",
        styleVariant: "bootstrap",
        className:
          "bg-destructive/10 dark:bg-destructive/20 border-destructive/50 dark:border-destructive/70 dark:text-white"
      },

      {
        variant: "success",
        styleVariant: "outline",
        className: "border-emerald-600/50 dark:border-emerald-600"
      },
      {
        variant: "success",
        styleVariant: "fill",
        className: "bg-emerald-600 text-white [&>svg]:text-white"
      },
      {
        variant: "success",
        styleVariant: "bootstrap",
        className:
          "bg-emerald-500/10 dark:bg-emerald-600/30 border-emerald-300 dark:border-emerald-600/70 text-emerald-500 dark:text-white [&>svg]:text-emerald-500"
      },

      {
        variant: "warning",
        styleVariant: "outline",
        className: "border-amber-500/50 dark:border-amber-500"
      },
      {
        variant: "warning",
        styleVariant: "fill",
        className: "bg-amber-500 text-white [&>svg]:text-white"
      },
      {
        variant: "warning",
        styleVariant: "bootstrap",
        className:
          "bg-amber-500/10 dark:bg-amber-600/30 border-amber-300 dark:border-amber-600/70 text-amber-500 dark:text-white [&>svg]:text-amber-500"
      },
      {
        variant: "info",
        styleVariant: "outline",
        className: "border-cyan-600/50 dark:border-cyan-600"
      },
      {
        variant: "info",
        styleVariant: "fill",
        className: "bg-cyan-600 text-white [&>svg]:text-white"
      },
      {
        variant: "info",
        styleVariant: "bootstrap",
        className:
          "bg-blue-500/10 dark:bg-blue-600/30 border-blue-300 dark:border-blue-600/70 text-blue-500 dark:text-white [&>svg]:text-blue-500"
      }
    ],
    defaultVariants: {
      variant: "default",
      styleVariant: "outline"
    }
  }
)

const variantIcons = {
  default: <InfoIcon className="size-[1.1rem]" />,
  destructive: <CircleX className="size-[1.1rem]" />,
  success: <CheckCircle2 className="size-[1.1rem]" />,
  warning: <CircleAlert className="size-[1.1rem]" />,
  info: <InfoIcon className="size-[1.1rem]" />
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      styleVariant = "outline",
      withIcon = false,
      customIcon,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant, styleVariant }),
        withIcon ? "pl-10" : "pl-4",
        className
      )}
      {...props}
    >
      {withIcon && (customIcon ?? variantIcons[variant ?? "default"])}
      {children}
    </div>
  )
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription, AlertTitle }
export type { AlertProps }
