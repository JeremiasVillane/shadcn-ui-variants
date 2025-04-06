"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactElement<HTMLElement | SVGElement>
  endIcon?: React.ReactElement<HTMLElement | SVGElement>
  startInline?: string
  endInline?: string
  startAddon?: React.ReactNode
  endAddon?: React.ReactNode
  showMaxLength?: "inside" | "outside" | "false"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startIcon,
      endIcon,
      startInline,
      endInline,
      startAddon,
      endAddon,
      showMaxLength = "false",
      value,
      onChange,
      defaultValue,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = maxLength
        ? e.target.value.slice(0, maxLength)
        : e.target.value
      if (!isControlled) setInternalValue(newValue)
      onChange?.(e)
    }

    const characterCount = String(currentValue).length
    const hasAddons = startAddon || endAddon

    const renderInline = (content: React.ReactNode, side: "start" | "end") => (
      <span
        className={cn(
          "flex items-center bg-background text-sm text-muted-foreground",
          side === "start"
            ? "order-after-icon pl-2"
            : "order-before-counter pr-2"
        )}
      >
        {content}
      </span>
    )

    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-stretch rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring",
            hasAddons && "overflow-hidden"
          )}
        >
          {startAddon && (
            <div className="flex items-center border-r border-input bg-accent px-3">
              {startAddon}
            </div>
          )}

          <div className="relative flex flex-1 items-center">
            {startIcon && (
              <div className="pl-3 text-muted-foreground/80">
                {React.cloneElement(
                  startIcon as React.ReactElement<HTMLElement | SVGElement>,
                  {
                    className: "size-4"
                  }
                )}
              </div>
            )}

            {startInline && renderInline(startInline, "start")}

            <input
              type={type}
              className={cn(
                "w-full min-w-0 flex-1 bg-transparent py-2 text-sm",
                "placeholder:text-muted-foreground focus-visible:outline-none",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50",
                startIcon ? "pl-2" : "pl-3",
                endIcon || endInline || showMaxLength === "inside"
                  ? "pr-2"
                  : "pr-3",
                !hasAddons && "rounded-md",
                className
              )}
              ref={ref}
              value={currentValue ?? ""}
              onChange={handleChange}
              maxLength={maxLength}
              {...props}
            />

            {endInline && renderInline(endInline, "end")}

            {showMaxLength === "inside" && maxLength && (
              <span className="pr-2 text-xs text-muted-foreground/80">
                {characterCount}/{maxLength}
              </span>
            )}

            {endIcon && (
              <div className="pr-3 text-muted-foreground/80">
                {React.cloneElement(
                  endIcon as React.ReactElement<HTMLElement | SVGElement>,
                  {
                    className: "size-4"
                  }
                )}
              </div>
            )}
          </div>

          {endAddon && (
            <div className="flex items-center border-l border-input bg-accent px-3">
              {endAddon}
            </div>
          )}
        </div>

        {showMaxLength === "outside" && maxLength && (
          <div className="mt-1 flex justify-end text-xs text-muted-foreground">
            {characterCount}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
