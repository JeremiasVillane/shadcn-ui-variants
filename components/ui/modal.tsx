"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { AlertTriangle, CheckCircle2, InfoIcon, X, XCircle } from "lucide-react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button, ButtonProps } from "@/components/ui/button"

interface ModalProps {
  /** The modal content. */
  children: React.ReactNode

  /** Optional additional CSS classes to apply */
  className?: string

  /** If true, the modal renders its children as a single child */
  asChild?: boolean

  /** Controls the open state of the modal */
  open?: boolean

  /** Callback fired when the open state changes */
  onOpenChange?: (open: boolean) => void

  /** If true, the header is separated from the content with a border
   * @default false */
  separatedHeader?: boolean

  /** If true, the footer is separated from the content with a border
   * @default false */
  separatedFooter?: boolean

  /** The visual style variant of the modal
   * @default "default" */
  variant?: "default" | "success" | "destructive" | "warning"

  /** If true, includes an icon in the modal based on the variant
   * @default false */
  withIcon?: boolean

  /** Aligns the modal content either to the left or center
   * @default "left" */
  align?: "left" | "center"

  /** A custom icon element to be rendered instead of the default variant icon */
  customIcon?: React.ReactElement

  /** The role of the modal, determining its behavioral mode
   * @default "dialog" */
  mode?: "dialog" | "alertdialog"

  /** If true, displays a close button in the top-right corner
   * @default false */
  showCloseButton?: boolean

  /** If true, the modal adapts its layout for responsive design
   * @default true */
  responsive?: boolean
}

const ModalContext = React.createContext<{
  isDesktop: boolean
  separatedHeader: boolean
  separatedFooter: boolean
  variant: ModalProps["variant"]
  withIcon: boolean
  align: ModalProps["align"]
  customIcon: React.ReactElement | undefined
  mode: ModalProps["mode"]
  showCloseButton: boolean
  responsive: boolean
}>({
  isDesktop: false,
  separatedHeader: false,
  separatedFooter: false,
  variant: "default",
  withIcon: false,
  align: "left",
  customIcon: undefined,
  mode: "dialog",
  showCloseButton: false,
  responsive: true
})

const useModalContext = () => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error(
      "Modal components cannot be rendered outside the Modal Context"
    )
  }
  return context
}

const Modal = ({
  children,
  separatedHeader = false,
  separatedFooter = false,
  variant = "default",
  withIcon = false,
  align = "left",
  customIcon,
  mode = "dialog",
  showCloseButton = false,
  responsive = true,
  ...props
}: ModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const Modal =
    responsive && !isDesktop ? DrawerPrimitive.Root : DialogPrimitive.Root

  return (
    <ModalContext.Provider
      value={{
        isDesktop,
        separatedHeader,
        separatedFooter,
        variant,
        withIcon,
        align,
        customIcon,
        mode,
        showCloseButton,
        responsive
      }}
    >
      <Modal {...props} {...(responsive && !isDesktop && { autoFocus: true })}>
        {children}
      </Modal>
    </ModalContext.Provider>
  )
}

const ModalTrigger = ({ className, children, ...props }: ButtonProps) => {
  const { isDesktop, responsive } = useModalContext()
  const Trigger =
    responsive && !isDesktop ? DrawerPrimitive.Trigger : DialogPrimitive.Trigger

  return (
    <Trigger asChild>
      <Button className={className} {...props}>
        {children}
      </Button>
    </Trigger>
  )
}
ModalTrigger.displayName = "ModalTrigger"

const ModalOverlay = React.forwardRef<
  | React.ElementRef<typeof DialogPrimitive.Overlay>
  | React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> &
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { isDesktop, responsive } = useModalContext()
  const Overlay =
    responsive && !isDesktop ? DrawerPrimitive.Overlay : DialogPrimitive.Overlay

  return (
    <Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80",
        isDesktop &&
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
})
ModalOverlay.displayName = "ModalOverlay"

const ModalContentWrapper = React.forwardRef<
  | React.ElementRef<typeof DialogPrimitive.Content>
  | React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { isDesktop, responsive, showCloseButton, mode } = useModalContext()

  const Portal =
    responsive && !isDesktop ? DrawerPrimitive.Portal : DialogPrimitive.Portal
  const Close =
    responsive && !isDesktop ? DrawerPrimitive.Close : DialogPrimitive.Close
  const ContentWrapper =
    responsive && !isDesktop ? DrawerPrimitive.Content : DialogPrimitive.Content

  const wrapperClass =
    responsive && !isDesktop
      ? "inset-x-0 bottom-0 mt-24 flex h-auto flex-col rounded-t-[10px]"
      : "left-[50%] top-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"

  return (
    <Portal>
      <ModalOverlay />
      <ContentWrapper
        ref={ref}
        role={mode}
        className={cn(
          "fixed z-50 border bg-background",
          wrapperClass,
          className
        )}
        {...props}
      >
        {responsive && !isDesktop && (
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        )}
        {children}
        {showCloseButton && (
          <Close
            aria-label="Close"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Close>
        )}
      </ContentWrapper>
    </Portal>
  )
})
ModalContentWrapper.displayName = "ModalContentWrapper"

const ModalContent = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop, mode } = useModalContext()

  return (
    <ModalContentWrapper
      className={cn(
        "gap-0",
        isDesktop && "p-0",
        "max-h-full max-w-full overflow-hidden md:max-h-[90vh] md:max-w-lg",
        className
      )}
      onInteractOutside={(e) => mode !== "dialog" && e.preventDefault()}
      {...props}
    >
      {children}
    </ModalContentWrapper>
  )
}
ModalContent.displayName = "ModalContent"

const HeaderWrapper = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop, responsive } = useModalContext()
  const headerClass =
    responsive && !isDesktop
      ? "grid gap-1.5 p-4 text-center sm:text-left"
      : "flex flex-col space-y-1.5 text-center sm:text-left bg-background px-4 pb-0 pt-6"

  return (
    <div className={cn(headerClass, className)} {...props}>
      {children}
    </div>
  )
}

const TitleWrapper = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop, responsive, align, separatedHeader } = useModalContext()
  const Title =
    responsive && !isDesktop ? DrawerPrimitive.Title : DialogPrimitive.Title

  return (
    <Title
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        align === "center" && !separatedHeader && "text-2xl",
        !responsive && !isDesktop && "text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </Title>
  )
}

const variantIcons: Record<
  NonNullable<ModalProps["variant"]>,
  React.ReactElement
> = {
  default: <InfoIcon className="text-primary" />,
  success: <CheckCircle2 className="text-emerald-600" />,
  destructive: <XCircle className="text-destructive" />,
  warning: <AlertTriangle className="text-amber-600" />
}

const ModalTitle = ({
  children,
  className,
  ...props
}: ModalProps & React.ComponentProps<"div">) => {
  const {
    isDesktop,
    responsive,
    variant,
    separatedHeader,
    withIcon,
    align,
    customIcon
  } = useModalContext()

  return (
    <HeaderWrapper
      className={cn(
        "px-6 pb-4 pt-6",
        "[&>svg]:size-6",
        isDesktop && "[&>svg]:-mb-1",
        "flex flex-row items-center justify-start gap-2",
        separatedHeader && "mb-4 border-b py-4",
        align === "center" && separatedHeader && "justify-center",
        align === "center" && !separatedHeader && "flex-col [&>svg]:size-9",
        !responsive && !isDesktop && "flex-col [&>svg]:size-9",
        className
      )}
    >
      {withIcon && (customIcon ?? variantIcons[variant!])}
      <TitleWrapper {...props}>{children}</TitleWrapper>
    </HeaderWrapper>
  )
}
ModalTitle.displayName = "ModalTitle"

const ModalDescription = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop, responsive, withIcon, align, separatedHeader } =
    useModalContext()
  const Description =
    responsive && !isDesktop
      ? DrawerPrimitive.Description
      : DialogPrimitive.Description

  return (
    <Description
      className={cn(
        "text-sm text-muted-foreground",
        "px-6",
        responsive && !isDesktop && "pb-2",
        withIcon && align === "left" && !separatedHeader && "pl-14",
        align === "center" || (!responsive && !isDesktop)
          ? "pl-4 text-center"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </Description>
  )
}
ModalDescription.displayName = "ModalDescription"

const ModalBody = ({ className, children, ...props }: ModalProps) => {
  return (
    <div
      className={cn(
        "mx-6 mt-4",
        "flex max-h-[60vh] flex-grow flex-col overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
ModalBody.displayName = "ModalBody"

const ModalFooter = ({ className, children, ...props }: ModalProps) => {
  const { isDesktop, separatedFooter, align } = useModalContext()
  const footerClass = !isDesktop
    ? "mt-auto flex flex-col gap-2 p-4"
    : "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"

  return (
    <div
      className={cn(
        footerClass,
        "w-full py-6",
        isDesktop && "bg-background px-6",
        separatedFooter && "mt-4 border-t py-4",
        align === "center" && isDesktop && "flex sm:flex-row sm:justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
ModalFooter.displayName = "ModalFooter"

const ModalAction = ({ className, children, ...props }: ButtonProps) => {
  const { variant, align } = useModalContext()
  return (
    <Button
      {...{ variant }}
      {...props}
      className={cn(align === "center" && "min-w-36", className)}
    >
      {children}
    </Button>
  )
}

const ModalClose = ({ className, children, ...props }: ButtonProps) => {
  const { isDesktop, responsive, align } = useModalContext()
  const Close =
    responsive && !isDesktop ? DrawerPrimitive.Close : DialogPrimitive.Close

  return (
    <Close aria-label="Close" asChild>
      <Button
        variant="outline"
        {...props}
        className={cn(align === "center" && "min-w-36", className)}
      >
        {children}
      </Button>
    </Close>
  )
}

export {
  Modal,
  ModalAction,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  ModalTrigger
}
export type { ModalProps }
