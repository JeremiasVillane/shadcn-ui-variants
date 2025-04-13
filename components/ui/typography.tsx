import * as React from "react"

import { cn } from "@/lib/utils"

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      className={cn(
        "mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
H1.displayName = "H1"

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn(
        "mb-4 mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0 lg:text-3xl",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
H2.displayName = "H2"

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        "mb-4 mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground lg:text-2xl",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
H3.displayName = "H3"

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h4
      className={cn(
        "mb-4 mt-6 scroll-m-20 text-lg font-semibold tracking-tight text-foreground lg:text-xl",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
H4.displayName = "H4"

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(
        "my-4 text-pretty leading-7 tracking-wide text-foreground/90 [&:not(:first-child)]:mt-6",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
P.displayName = "P"

const A = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => {
  return (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4 hover:text-primary/90",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
A.displayName = "A"

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => {
  return (
    <blockquote
      className={cn(
        "mb-6 mt-6 border-l-2 border-border pl-6 italic text-muted-foreground",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Blockquote.displayName = "Blockquote"

const Code = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <pre className="mb-6 mt-6 overflow-x-auto rounded bg-muted p-4">
      <code
        className={cn(
          "rounded-none bg-transparent p-0 text-sm font-normal text-foreground/90",
          className
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </code>
    </pre>
  )
})
Code.displayName = "Code"

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold tracking-wider text-foreground",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
InlineCode.displayName = "InlineCode"

const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(
        "my-4 text-pretty text-lg text-muted-foreground md:text-xl",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Lead.displayName = "Lead"

const SubLead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(
        "my-4 text-base leading-6 text-muted-foreground lg:text-[17px]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
SubLead.displayName = "SubLead"

const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "my-4 text-[17px] font-semibold text-foreground lg:text-lg",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Large.displayName = "Large"

const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <small
        className={cn(
          "text-[15px] font-medium leading-none text-foreground/70",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Small.displayName = "Small"

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("my-4 text-sm leading-7 text-muted-foreground", className)}
      ref={ref}
      {...props}
    />
  )
})
Muted.displayName = "Muted"

const Strong = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <strong
      className={cn("font-semibold text-foreground", className)}
      ref={ref}
      {...props}
    />
  )
})
Strong.displayName = "Strong"

export {
  A,
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  Muted,
  P,
  Small,
  Strong,
  SubLead
}
