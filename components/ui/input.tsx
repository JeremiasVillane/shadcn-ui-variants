import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Content (icon) to display at the start, inside the border. */
  startIcon?: React.ReactNode
  /** Content (icon) to display at the end, inside the border. */
  endIcon?: React.ReactNode
  /** Content (text) to display at the beginning, inside the border. */
  startInline?: React.ReactNode
  /** Content (text) to display at the end, inside the border. */
  endInline?: React.ReactNode
  /** Content (text/button) to display at the start, outside the border (attached). */
  startAddon?: React.ReactNode
  /** Content (text/button) to display at the end, outside the border (attached). */
  endAddon?: React.ReactNode
  /** Show character counter/maxLength. */
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
    // --- Internal state for value (if not controlled) ---
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
    const isControlled = value !== undefined
    const currentValue = isControlled
      ? ((value as string) ?? "")
      : internalValue

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      // Respect maxLength internally and visually (although input[maxLength] already does this)
      if (maxLength === undefined || newValue.length <= maxLength) {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        // Always call external onChange for parent to react
        onChange?.(event)
      } else if (maxLength !== undefined && newValue.length > maxLength) {
        // If trying to exceed, still call onChange but ensure internal state does not exceed
        if (!isControlled) {
          setInternalValue(newValue.slice(0, maxLength))
        }
        onChange?.(event)
      }
    }

    // --- Calculations for Rendering ---
    // Determine if we need relative wrapper (for icons, inline, internal counter)
    const needsRelativeWrapper = Boolean(
      startIcon ||
        endIcon ||
        startInline ||
        endInline ||
        showMaxLength === "inside"
    )
    // Determine if we need flex wrapper (for attached addons)
    const needsFlexWrapper = Boolean(startAddon || endAddon)

    // Calculate dynamic padding
    let paddingStartClass = "ps-3" // Padding base
    if (startIcon) paddingStartClass = "ps-10" // Icon needs more space
    if (startInline) paddingStartClass = "ps-16" // Inline needs even more

    let paddingEndClass = "pe-3" // Padding base
    if (endIcon) paddingEndClass = "pe-10"
    if (endInline) paddingEndClass = "pe-12" // Adjust for typical content
    if (showMaxLength === "inside") paddingEndClass = "pe-14" // Space for "00/00"
    // TODO: Consider if endIcon/endInline and showMaxLength="inside" coexist - increase padding?
    if (showMaxLength === "inside" && (endIcon || endInline)) {
      paddingEndClass = "pe-[5.5rem]" // ~ pe-22 - need enough space
    }

    // Calculate character counter (making sure not to exceed maxLength for display)
    const displayValueForCounter = (String(currentValue) ?? "").slice(
      0,
      maxLength
    )
    const characterCount = displayValueForCounter.length

    // --- Element Input Base ---
    // Will render inside wrappers if needed
    const inputElement = (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          // Add 'peer' class if needed for dependent styles (icons, inline, etc. )
          needsRelativeWrapper && "peer",
          // Apply dynamic padding
          paddingStartClass,
          paddingEndClass,
          // Settings for attached addons
          startAddon && "-ms-px rounded-s-none", // Remove left border and negative margin
          endAddon && "-me-px rounded-e-none", // Remove right border and negative margin
          (startAddon || endAddon) && "shadow-none focus-visible:z-10", // No shadow and ensure visible focus on addons
          className
        )}
        ref={ref}
        value={currentValue ?? ""}
        onChange={handleValueChange}
        maxLength={maxLength}
        {...props}
      />
    )

    // --- Additional Elements (Icons, Inline, Counter) ---
    // Will render inside relative div if needsRelativeWrapper is true

    const startIconElement = startIcon && (
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        {/* Assuming icon is a component that accepts 'size' */}
        {React.isValidElement(startIcon)
          ? React.cloneElement(
              startIcon as React.ReactElement<{
                size?: number
                "aria-hidden"?: boolean
              }>,
              { size: 16, "aria-hidden": true }
            )
          : startIcon}
      </div>
    )

    const startInlineElement = startInline && (
      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
        {startInline}
      </span>
    )

    // Logic to position counter if there are other elements at the end
    let counterPaddingClass = "pe-3" // Default padding for counter
    if (endIcon) counterPaddingClass = "pe-10" // More padding if there is icon
    if (endInline) counterPaddingClass = "pe-12" // Even more if there is inline

    const maxLengthInsideElement = showMaxLength === "inside" &&
      maxLength !== undefined && (
        <div
          id={props["aria-describedby"]} // Use past ID for accessibility
          className={cn(
            "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center text-xs tabular-nums text-muted-foreground/80 peer-disabled:opacity-50",
            counterPaddingClass // Apply calculated padding
          )}
          aria-live="polite" // Announce changes
        >
          {characterCount}/{maxLength}
        </div>
      )

    const endIconElement = endIcon && (
      // Render AFTER counter if both exist
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50",
          showMaxLength === "inside" && "hidden" // Hide if counter is "on top" - TODO: improve this
        )}
      >
        {React.isValidElement(endIcon)
          ? React.cloneElement(
              endIcon as React.ReactElement<{
                size?: number
                "aria-hidden"?: boolean
              }>,
              { size: 16, "aria-hidden": true }
            )
          : endIcon}
      </div>
    )

    const endInlineElement = endInline && (
      <span
        className={cn(
          "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50",
          showMaxLength === "inside" && "hidden" // Same logic as hide - TODO: improve this
        )}
      >
        {endInline}
      </span>
    )
    // Render in reverse order of visual appearance from right
    // 1. endIcon or endInline (outermost)
    // 2. maxLengthInside (innermost)

    // --- Addon Elements (Attachments) ---
    const startAddonElement = startAddon && (
      <span className="inline-flex items-center rounded-s-md border border-e-0 border-input bg-background px-3 text-sm text-muted-foreground">
        {startAddon}
      </span>
    )

    const endAddonElement = endAddon && (
      <span className="inline-flex items-center rounded-e-md border border-s-0 border-input bg-background px-3 text-sm text-muted-foreground">
        {endAddon}
      </span>
    )

    // --- Final Rendering ---

    // 1. Build core (Input + Relative Addons if applicable)
    let coreInputElement: React.JSX.Element
    if (needsRelativeWrapper) {
      coreInputElement = (
        <div className="relative w-full">
          {/* Relative wrapper */}
          {startInlineElement}
          {/* Inline text goes "behind" icon if both are */}
          {startIconElement}
          {inputElement} {/* Input with padding set */}
          {/* Render in reverse order from right to left visually */}
          {endInlineElement} {/* Inline text end */}
          {endIconElement} {/* Icon end */}
          {maxLengthInsideElement} {/* Counter goes closer to text */}
        </div>
      )
    } else {
      coreInputElement = inputElement // Only input if no relative addons
    }

    // 2. Wrap in Flex if Addons attached
    let finalElement: React.JSX.Element
    if (needsFlexWrapper) {
      finalElement = (
        <div className="flex w-full rounded-md">
          {startAddonElement}
          {/* CoreInputElement needs flex- grow if it is inside flex */}
          <div className="flex min-w-0 flex-grow">{coreInputElement}</div>
          {/* Wrapper for flex-grow */}
          {endAddonElement}
        </div>
      )
    } else {
      finalElement = coreInputElement // Use core if no addons attached
    }

    // 3. Add external counter if applicable
    if (showMaxLength === "outside" && maxLength !== undefined) {
      return (
        <div className="w-full">
          {finalElement}
          <div className="mt-1 flex justify-end">
            {/* Container for external counter */}
            <span
              className="text-xs tabular-nums text-muted-foreground"
              aria-live="polite"
            >
              {characterCount}/{maxLength}
            </span>
          </div>
        </div>
      )
    } else {
      // Return final element (with or without flex wrapper)
      return finalElement
    }
  }
)
Input.displayName = "Input"

export { Input }
