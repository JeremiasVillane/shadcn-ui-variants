import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * Ícono opcional para mostrar como marcador. Tiene prioridad sobre el icono de List.
   */
  icon?: React.ReactNode
  /**
   * Contenido del elemento de la lista.
   */
  children: React.ReactNode
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, icon, ...props }, ref) => {
    const hasIcon = icon != null
    const paddingClass = hasIcon ? "pl-6" : ""

    return (
      <li
        ref={ref}
        className={cn("relative", paddingClass, className)}
        data-list-item-host="true"
        {...props}
      >
        {hasIcon && (
          <span
            className="absolute left-0 top-[0.2em] flex h-5 w-5 items-center justify-center"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {children}
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
;(ListItem as any).__IS_LIST_ITEM = true

const listVariants = cva("text-base text-foreground my-2", {
  variants: {
    variant: {
      default: "list-disc list-outside [&>li]:pl-1.5 ml-5",
      numbered: "list-decimal list-outside [&>li]:pl-2.5 ml-5",
      arrow:
        "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:content-['⮞'] [&>li]:before:text-foreground/80",
      bullet:
        "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:-top-1 [&>li]:before:content-['•'] [&>li]:before:text-foreground/80 [&>li]:before:text-2xl",
      "bullet-outline":
        "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:-top-1 [&>li]:before:content-['◦'] [&>li]:before:text-foreground/80 [&>li]:before:text-2xl",
      triangle:
        "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:-top-1.5 [&>li]:before:content-['‣'] [&>li]:before:text-foreground/80 [&>li]:before:text-3xl",
      square:
        "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:content-['▪'] [&>li]:before:text-foreground/80",
      dash: "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:content-['-'] [&>li]:before:text-foreground/80",
      check:
        "list-none [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:content-['✓'] [&>li]:before:text-primary",
      none: "list-none p-0"
    },
    spacing: {
      default: "[&>li]:mb-1.5",
      tight: "[&>li]:mb-0.5",
      relaxed: "[&>li]:mb-2",
      loose: "[&>li]:mb-3",
      none: "[&>li]:mb-0"
    }
  },
  defaultVariants: {
    variant: "default",
    spacing: "default"
  },
  compoundVariants: [{ variant: "none", className: "my-0" }]
})

interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  /**
   * Ícono opcional para usar como marcador para TODOS los elementos ListItem hijos.
   * Un ListItem hijo puede anular este icono definiendo su propio prop 'icon'.
   */
  icon?: React.ReactNode
  /**
   * Indica si la lista está anidada dentro de otro elemento de lista.
   * Ajusta el margen vertical.
   * @default false */
  nested?: boolean
  /**
   * Los elementos hijos de la lista. **Se espera que sean componentes `<ListItem>`.**
   * Otros tipos de hijos serán filtrados.
   */
  children?: React.ReactNode
}

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, variant, spacing, icon, children, ...props }, ref) => {
    const ListComponent = variant === "numbered" ? "ol" : "ul"
    const hasCustomIcon = icon != null
    const effectiveVariant = hasCustomIcon ? "none" : variant

    const processedChildren = React.Children.map(children, (child) => {
      if (
        React.isValidElement<ListItemProps>(child) &&
        (child.type as any)?.__IS_LIST_ITEM === true
      ) {
        return React.cloneElement(child, {
          icon: child.props.icon ?? icon
        })
      }

      if (child != null && child !== false && typeof child !== "boolean") {
        if (!React.isValidElement(child)) {
          console.warn(
            "List component received a direct child that is not a ListItem component. It will be ignored:",
            child
          )
        } else if (!(child.type as any)?.__IS_LIST_ITEM) {
          console.warn(
            "List component received a direct child of an invalid type. Only <ListItem> components are rendered. It will be ignored."
          )
        }
      }

      return null
    })

    return (
      <ListComponent
        ref={ref as any}
        className={cn(
          listVariants({ variant: effectiveVariant, spacing }),
          "[li[data-list-item-host=true]>_&]:my-1.5",
          className
        )}
        {...props}
      >
        {processedChildren}
      </ListComponent>
    )
  }
)
List.displayName = "List"

export { List, ListItem, listVariants }
export type { ListProps, ListItemProps }
