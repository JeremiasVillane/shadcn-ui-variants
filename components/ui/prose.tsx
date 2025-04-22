import * as React from "react"

import { cn } from "@/lib/utils"

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The HTML element type to render as the main wrapper.
   * @default "main" */
  as?: "div" | "main" | "section" | "article"
  /** The overall typographic scale to apply to the content within the Prose wrapper.
   * @default "default" */
  scale?: "default" | "sm" | "xs" | "lg"
  /** The content to be rendered and styled within the Prose component. Can be raw HTML or helper components. */
  children: React.ReactNode
  /** Additional CSS class names to apply to the wrapper element. */
  className?: string
}

const proseStyles = {
  h1: "scroll-m-20 font-extrabold tracking-tight text-foreground",
  h2: "scroll-m-20 border-b border-border pb-2 font-semibold tracking-tight text-foreground first:mt-0",
  h3: "scroll-m-20 font-semibold tracking-tight text-foreground",
  h4: "scroll-m-20 font-semibold tracking-tight text-foreground",
  p: "text-pretty leading-7 tracking-wide text-foreground/90",
  a: "font-medium text-primary underline underline-offset-4 hover:text-primary/90",
  blockquote:
    "relative rounded-sm border-l-8 border-l-muted-foreground bg-muted font-sans italic leading-relaxed before:absolute before:left-3 before:font-serif before:text-muted-foreground before:content-['“'] text-pretty",
  pre: "overflow-x-auto rounded bg-muted p-4 font-normal text-foreground/90",
  code: "rounded-none bg-transparent p-0 font-normal text-foreground/90",
  "inline-code":
    "relative rounded bg-muted px-[0.3rem] py-[0.050rem] font-mono text-foreground",
  lead: "text-pretty text-muted-foreground",
  "sub-lead": "leading-6 text-muted-foreground",
  large: "font-semibold text-foreground",
  small: "font-medium leading-none text-foreground/70",
  muted: "leading-7 text-muted-foreground",
  strong: "font-semibold text-foreground",
  ul: "ml-6 list-disc text-foreground/90",
  ol: "ml-6 list-decimal text-foreground/90",
  li: ""
} as const

type ProseSizes = Record<
  keyof typeof proseStyles,
  Record<NonNullable<ProseProps["scale"]>, string>
>

const proseSizes: ProseSizes = {
  h1: {
    default: "text-4xl lg:text-5xl mb-4",
    sm: "text-3xl lg:text-4xl mb-3",
    xs: "text-2xl lg:text-3xl mb-2",
    lg: "text-5xl lg:text-6xl mb-5"
  },
  h2: {
    default: "text-2xl lg:text-3xl mb-4 mt-10",
    sm: "text-xl lg:text-2xl mb-3 mt-8",
    xs: "text-lg lg:text-xl mb-2 mt-6",
    lg: "text-3xl lg:text-4xl mb-5 mt-12"
  },
  h3: {
    default: "text-xl lg:text-2xl mb-4 mt-8",
    sm: "text-lg lg:text-xl mb-3 mt-6",
    xs: "text-base lg:text-lg mb-2 mt-4",
    lg: "text-2xl lg:text-3xl mb-5 mt-10"
  },
  h4: {
    default: "text-lg lg:text-xl mb-4 mt-6",
    sm: "text-base lg:text-lg mb-3 mt-4",
    xs: "text-sm lg:text-base mb-2 mt-2",
    lg: "text-xl lg:text-2xl mb-5 mt-8"
  },
  p: {
    default: "text-base my-4 [&:not(:first-child)]:mt-6",
    sm: "text-base my-3 [&:not(:first-child)]:mt-5",
    xs: "text-sm my-2 [&:not(:first-child)]:mt-4",
    lg: "text-lg my-5 [&:not(:first-child)]:mt-7"
  },
  a: { default: "", sm: "", xs: "", lg: "" },
  blockquote: {
    default: "text-base before:text-6xl my-6 py-4 pl-16 pr-5 before:top-3",
    sm: "text-base before:text-5xl my-5 py-3 pl-14 pr-4 before:top-3",
    xs: "text-sm before:text-4xl my-4 py-3 pl-12 pr-3 before:top-3",
    lg: "text-lg before:text-7xl my-7 py-5 pl-20 pr-6 before:top-4"
  },
  pre: {
    default: "my-6 text-sm",
    sm: "my-5 text-sm",
    xs: "my-4 text-xs",
    lg: "my-7 text-base"
  },
  code: { default: "text-sm", sm: "text-sm", xs: "text-xs", lg: "text-base" },
  "inline-code": {
    default: "text-sm",
    sm: "text-sm",
    xs: "text-xs",
    lg: "text-base"
  },
  lead: {
    default: "text-lg md:text-xl my-4",
    sm: "text-lg md:text-[19px] my-3",
    xs: "text-base md:text-lg my-2",
    lg: "text-xl md:text-2xl my-5"
  },
  "sub-lead": {
    default: "text-base lg:text-[17px] my-4",
    sm: "text-base lg:text-[17px] my-3",
    xs: "text-sm lg:text-[15px] my-2",
    lg: "text-lg lg:text-[19px] my-5"
  },
  large: {
    default: "text-[17px] lg:text-lg my-4",
    sm: "text-[17px] lg:text-lg my-3",
    xs: "text-[15px] lg:text-base my-2",
    lg: "text-[19px] lg:text-lg my-5"
  },
  small: {
    default: "text-[15px]",
    sm: "text-[15px]",
    xs: "text-[13px]",
    lg: "text-[17px]"
  },
  muted: { default: "my-4", sm: "my-3", xs: "my-2", lg: "my-5" },
  strong: { default: "", sm: "", xs: "", lg: "" },
  ul: {
    default: "text-base [&>li]:mt-2 my-6",
    sm: "text-base [&>li]:mt-2 my-5",
    xs: "text-sm [&>li]:mt-1.5 my-4",
    lg: "text-lg [&>li]:mt-2.5 my-7"
  },
  ol: {
    default: "text-base [&>li]:mt-2 my-6",
    sm: "text-base [&>li]:mt-2 my-5",
    xs: "text-sm [&>li]:mt-1.5 my-4",
    lg: "text-lg [&>li]:mt-2.5 my-7"
  },
  li: { default: "mt-2", sm: "mt-2", xs: "mt-2", lg: "mt-2" }
}

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, as = "main", scale = "default", children, ...props }, ref) => {
    const Wrapper = as

    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child
      }

      const childProps = child.props as {
        className?: string
        "data-prose-type"?: string
        scale?: ProseProps["scale"]
        [key: string]: any
      }

      let styleKey: keyof typeof proseStyles | null = null
      const dataType = childProps["data-prose-type"]
      const isHtmlElement = typeof child.type === "string"

      if (dataType && dataType in proseStyles) {
        styleKey = dataType as keyof typeof proseStyles
      } else if (isHtmlElement && (child.type as string) in proseStyles) {
        styleKey = child.type as keyof typeof proseStyles
      }

      const propsToPass: Record<string, any> = {
        scale,
        className: childProps.className
      }

      if (isHtmlElement && styleKey) {
        propsToPass.className = cn(
          proseStyles[styleKey],
          proseSizes[styleKey]?.[scale],
          childProps.className
        )
      } else if (!isHtmlElement && styleKey) {
        propsToPass.className = cn(
          proseStyles[styleKey],
          proseSizes[styleKey]?.[scale],
          childProps.className
        )
      } else if (!isHtmlElement) {
        propsToPass.className = childProps.className
      } else {
        propsToPass.className = childProps.className
      }

      return React.cloneElement(child as React.ReactElement<any>, propsToPass)
    })

    return (
      <Wrapper className={cn("prose", className)} ref={ref} {...props}>
        {enhancedChildren}
      </Wrapper>
    )
  }
)
Prose.displayName = "Prose"

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <h1
      className={cn(proseStyles["h1"], proseSizes["h1"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
H1.displayName = "H1"

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <h2
      className={cn(proseStyles["h2"], proseSizes["h2"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
H2.displayName = "H2"

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <h3
      className={cn(proseStyles["h3"], proseSizes["h3"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
H3.displayName = "H3"

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <h4
      className={cn(proseStyles["h4"], proseSizes["h4"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
H4.displayName = "H4"

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <p
      className={cn(proseStyles["p"], proseSizes["p"]?.[scale], className)}
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
  return <a className={cn(proseStyles["a"], className)} ref={ref} {...props} />
})
A.displayName = "A"

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <blockquote
      className={cn(
        proseStyles["blockquote"],
        proseSizes["blockquote"]?.[scale],
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
  React.HTMLAttributes<HTMLElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <pre className={proseStyles["pre"]}>
      <code
        className={cn(
          proseStyles["code"],
          proseSizes["code"]?.[scale],
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
  React.HTMLAttributes<HTMLElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <code
      className={cn(
        proseStyles["inline-code"],
        proseSizes["inline-code"]?.[scale],
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
  React.HTMLAttributes<HTMLParagraphElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <p
      className={cn(
        proseStyles["lead"],
        proseSizes["lead"]?.[scale],
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
  React.HTMLAttributes<HTMLParagraphElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <p
      className={cn(
        proseStyles["sub-lead"],
        proseSizes["sub-lead"]?.[scale],
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
  React.HTMLAttributes<HTMLDivElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <div
      className={cn(
        proseStyles["large"],
        proseSizes["large"]?.[scale],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Large.displayName = "Large"

const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <small
      className={cn(
        proseStyles["small"],
        proseSizes["small"]?.[scale],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Small.displayName = "Small"

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <p
      className={cn(
        proseStyles["muted"],
        proseSizes["muted"]?.[scale],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Muted.displayName = "Muted"

const Strong = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <strong
        className={cn(proseStyles["strong"], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Strong.displayName = "Strong"

const Ul = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <ul
      className={cn(proseStyles["ul"], proseSizes["ul"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
Ul.displayName = "Ul"

const Ol = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <ol
      className={cn(proseStyles["ol"], proseSizes["ol"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
Ol.displayName = "Ol"

const Li = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    scale?: NonNullable<ProseProps["scale"]>
  }
>(({ scale = "default", className, ...props }, ref) => {
  return (
    <li
      className={cn(proseStyles["li"], proseSizes["li"]?.[scale], className)}
      ref={ref}
      {...props}
    />
  )
})
Li.displayName = "Li"

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
  Li,
  Muted,
  Ol,
  P,
  Prose,
  Small,
  Strong,
  SubLead,
  Ul
}
export type { ProseProps }
