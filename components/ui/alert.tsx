import * as React from "react"
import { cva } from "class-variance-authority"
import { CheckCircle2, CircleAlert, CircleX, InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export const alertVariantsObject = {
  "default-oultine": "bg-background text-foreground [&>svg]:text-foreground",
  "default-fill": "bg-foreground text-background [&>svg]:text-background",
  "default-bootstrap":
    "bg-muted text-foreground/80 [&>svg]:text-foreground/80 dark:text-white dark:[&>svg]:text-white border border-muted-foreground/30",
  "destructive-outline":
    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  "destructive-fill":
    "bg-destructive text-destructive-foreground [&>svg]:text-destructive-foreground",
  "destructive-bootstrap":
    "bg-destructive/10 dark:bg-destructive/20 border-destructive/50 dark:border-destructive/70 text-destructive dark:text-white [&>svg]:text-destructive",
  "success-outline":
    "border-emerald-600/50 text-emerald-600 dark:border-emerald-600 [&>svg]:text-emerald-600",
  "success-fill": "bg-emerald-600 text-white [&>svg]:text-white",
  "success-bootstrap":
    "bg-emerald-500/10 dark:bg-emerald-600/30 border-emerald-300 dark:border-emerald-600/70 text-emerald-500 dark:text-white [&>svg]:text-emerald-500",
  "warning-outline":
    "border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500",
  "warning-fill": "bg-amber-500 text-white [&>svg]:text-white",
  "warning-bootstrap":
    "bg-amber-500/10 dark:bg-amber-600/30 border-amber-300 dark:border-amber-600/70 text-amber-500 dark:text-white [&>svg]:text-amber-500",
  "info-outline":
    "border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600",
  "info-fill": "bg-cyan-600 text-white [&>svg]:text-white",
  "info-bootstrap":
    "bg-blue-500/10 dark:bg-blue-600/30 border-blue-300 dark:border-blue-600/70 text-blue-500 dark:text-white [&>svg]:text-blue-500"
} as const

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: alertVariantsObject
    },
    defaultVariants: {
      variant: "default-outline" as AlertVariant
    }
  }
)

export type AlertVariant = keyof typeof alertVariantsObject

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant: AlertVariant
  withIcon?: boolean
  customIcon?: React.ReactElement
}

const variantIcons: Record<string, React.ReactElement> = {
  default: <InfoIcon className="size-4" />,
  destructive: <CircleX className="size-4" />,
  success: <CheckCircle2 className="size-4" />,
  warning: <CircleAlert className="size-4" />,
  info: <InfoIcon className="size-4" />
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { className, variant, withIcon = true, customIcon, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }),
        variant.includes("bootstrap")
          ? withIcon
            ? "flex items-baseline gap-2 pl-10 [&>svg]:translate-y-[2px]"
            : "flex items-baseline gap-2 pl-4"
          : withIcon
            ? "[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7"
            : "pl-5",
        className
      )}
      {...props}
    >
      {withIcon && (customIcon ?? variantIcons[variant.split("-")[0]])}
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
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
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
