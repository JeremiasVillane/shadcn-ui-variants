"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cva, VariantProps } from "class-variance-authority"
import {
  AlertTriangle,
  CheckCircle,
  Info,
  InfoIcon,
  XCircle
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface AlertDialogContextValue {
  variant: AlertDialogVariant
  withIcon: boolean
  customIcon?: React.ReactNode
}

const AlertDialogContext = React.createContext<AlertDialogContextValue>({
  variant: "default",
  withIcon: false
})

const alertDialogContentVariantsObject = {
  default: "",
  center: "",
  "success-left": "",
  "success-center": "",
  "destructive-left": "",
  "destructive-center": "",
  "warning-left": "",
  "warning-center": "",
  "info-left": "",
  "info-center": ""
} as const

export type AlertDialogVariant = keyof typeof alertDialogContentVariantsObject

const alertDialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  {
    variants: {
      variant: alertDialogContentVariantsObject
    },
    defaultVariants: { variant: "default" }
  }
)

const alertDialogHeaderVariants = cva("flex flex-col space-y-2", {
  variants: {
    variant: {
      default: "text-left",
      center: "text-center",
      "success-left": "text-left text-green-600",
      "success-center": "text-center text-green-600",
      "destructive-left": "text-left text-red-600",
      "destructive-center": "text-center text-red-600",
      "warning-left": "text-left text-yellow-600",
      "warning-center": "text-center text-yellow-600",
      "info-left": "text-left text-blue-600",
      "info-center": "text-center text-blue-600"
    }
  },
  defaultVariants: { variant: "default" }
})

const alertDialogTitleVariants = cva("text-lg font-semibold", {
  variants: {
    variant: {
      default: "text-left",
      center: "text-center",
      "success-left": "text-left",
      "success-center": "text-center",
      "destructive-left": "text-left",
      "destructive-center": "text-center",
      "warning-left": "text-left",
      "warning-center": "text-center",
      "info-left": "text-left",
      "info-center": "text-center"
    }
  },
  defaultVariants: { variant: "default" }
})

const alertDialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:space-x-2",
  {
    variants: {
      variant: {
        default: "sm:justify-end",
        center: "sm:justify-center",
        "success-left": "sm:justify-end",
        "success-center": "sm:justify-center",
        "destructive-left": "sm:justify-end",
        "destructive-center": "sm:justify-center",
        "warning-left": "sm:justify-end",
        "warning-center": "sm:justify-center",
        "info-left": "sm:justify-end",
        "info-center": "sm:justify-center"
      }
    },
    defaultVariants: { variant: "default" }
  }
)

const variantIcons: Record<string, React.ReactElement> = {
  default: <InfoIcon />,
  center: <InfoIcon />,
  success: <CheckCircle className="text-green-600" />,
  destructive: <XCircle className="text-red-600" />,
  warning: <AlertTriangle className="text-yellow-600" />,
  info: <Info className="text-blue-600" />
}

interface AlertDialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {
  variant?: AlertDialogVariant
  withIcon?: boolean
  customIcon?: React.ReactNode
}

const AlertDialog = ({
  variant = "default",
  withIcon = false,
  customIcon,
  children,
  ...props
}: AlertDialogProps) => {
  return (
    <AlertDialogContext.Provider value={{ variant, withIcon, customIcon }}>
      <AlertDialogPrimitive.Root {...props}>
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogContext.Provider>
  )
}

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AlertDialogContext)
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(alertDialogContentVariants({ variant }), className)}
        {...props}
      />
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = React.forwardRef<
  React.ComponentRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AlertDialogContext)
  return (
    <div
      ref={ref}
      className={cn(alertDialogHeaderVariants({ variant }), className)}
      {...props}
    />
  )
})
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, children, ...props }, ref) => {
  const { variant, withIcon, customIcon } = React.useContext(AlertDialogContext)
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn(alertDialogTitleVariants({ variant }), className)}
      {...props}
    >
      {withIcon && (
        <div
          className={cn(
            "mx-auto flex items-center justify-center rounded-full",
            variant === "default" || variant.includes("left")
              ? "mb-4 size-9 sm:mx-0 [&>svg]:size-5"
              : "",
            variant.includes("center") ? "mb-2 size-14 [&>svg]:size-7" : "",
            ["default", "center"].includes(variant) ? "bg-muted" : "",
            variant.includes("success") ? "bg-green-600/10" : "",
            variant.includes("destructive") ? "bg-destructive/10" : "",
            variant.includes("warning") ? "bg-yellow-600/10" : "",
            variant.includes("info") ? "bg-blue-600/10" : ""
          )}
        >
          {customIcon ?? variantIcons[variant.split("-")[0]]}
        </div>
      )}
      {children}
    </AlertDialogPrimitive.Title>
  )
})
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-balance text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogFooter = React.forwardRef<
  React.ComponentRef<"div">,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AlertDialogContext)
  return (
    <div
      ref={ref}
      className={cn(alertDialogFooterVariants({ variant }), className)}
      {...props}
    />
  )
})
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
}
