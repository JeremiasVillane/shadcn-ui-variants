"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** @default "default" */
  variant?: "default" | "solid" | "square" | "thin"
  /**
   * If true, shows a tooltip with the value on the thumb while dragging.
   * @default false
   */
  showTooltip?: boolean
  /**
   * If true, renders an <output> element showing the current value above the slider.
   * @default false
   */
  withOutput?: boolean
  /**
   * If true, renders a numeric input field(s) next to the slider.
   * @default false
   */
  withInput?: boolean
  /**
   * Content to display as label at the start of the slider track.
   */
  startLabel?: React.ReactNode
  /**
   * Content to display as label at the end of the slider track.
   */
  endLabel?: React.ReactNode
  /**
   * Icon to display before the slider track.
   */
  startIcon?: React.ReactNode // New prop
  /**
   * Icon to display after the slider track, before the input field if present.
   */
  endIcon?: React.ReactNode // New prop
  /**
   * If true, shows tooltip ticks below the slider.
   * @default false
   */
  showTicks?: boolean
  /**
   * Desired number of ticks to display, including start and end.
   * They will be evenly distributed between min and max.
   * Minimum 2, Maximum 101.
   * @default 11
   */
  numberOfTicks?: number
}

const sliderRootVariants = cva(
  "relative flex w-full touch-none select-none items-center py-3",
  {
    variants: {
      variant: {
        default: "",
        solid:
          "[&>:last-child>span]:bg-primary [&>:first-child>span]:opacity-70",
        square: "[&>:last-child>span]:rounded",
        thin: "[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      variant = "default",
      value,
      onValueChange,
      defaultValue,
      withOutput = false,
      withInput = false,
      startLabel,
      endLabel,
      startIcon,
      endIcon,
      showTooltip = false,
      showTicks = false,
      numberOfTicks: numberOfTicksProp,
      min = 0,
      max = 100,
      step = 1,
      ...restSliderProps
    },
    ref
  ) => {
    const numberOfTicks = Math.max(2, Math.min(numberOfTicksProp ?? 11, 101))

    // ****** STATE ****** //
    const initialValue = defaultValue ?? [(min + max) / 2]
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(initialValue)
    const isControlled = value !== undefined
    const sliderValue = isControlled ? value! : uncontrolledValue
    const [inputStringValues, setInputStringValues] = React.useState<string[]>(
      () =>
        (Array.isArray(sliderValue)
          ? sliderValue
          : [sliderValue ?? initialValue[0]]
        ).map(String)
    )
    const [activeThumbIndex, setActiveThumbIndex] = React.useState<
      number | null
    >(null)
    const [tooltipStyle, setTooltipStyle] = React.useState<React.CSSProperties>(
      {
        opacity: 0,
        visibility: "hidden",
        position: "absolute",
        pointerEvents: "none",
        zIndex: 10,
        transform: "translateX(-50%)",
        transition: "opacity 0.1s ease-out, visibility 0s linear 0.1s"
      }
    )

    // ****** REFS ****** //
    const sliderAndTicksContainerRef = React.useRef<HTMLDivElement>(null)
    const thumbRefs = React.useRef<(HTMLSpanElement | null)[]>([])

    const displayValue = React.useMemo(() => {
      return Array.isArray(sliderValue)
        ? sliderValue
        : [sliderValue ?? initialValue[0]]
    }, [sliderValue, initialValue])

    const tickValues = React.useMemo(() => {
      const values = []
      if (numberOfTicks < 2 || min >= max) {
        values.push(min)
        if (min < max) values.push(max)
        return values
      }
      const range = max - min
      const increment = range / (numberOfTicks - 1)
      for (let i = 0; i < numberOfTicks; i++) {
        let tickValue = min + i * increment
        if (i === 0) tickValue = min
        if (i === numberOfTicks - 1) tickValue = max
        let precision = 0
        if (Math.abs(increment) > 1e-9 && Math.abs(increment) < 1) precision = 2
        if (Math.abs(tickValue) < 1e-9) tickValue = 0 // Evitar -0
        values.push(parseFloat(tickValue.toFixed(precision)))
      }
      return values
    }, [min, max, numberOfTicks])

    // ****** EFFECTS ****** //
    // Synchronize Slider -> Input Strings
    React.useEffect(() => {
      const currentInternalValue = displayValue
      const currentSliderStrings = currentInternalValue.map(String)
      if (
        JSON.stringify(currentSliderStrings) !==
        JSON.stringify(inputStringValues)
      ) {
        setInputStringValues(currentSliderStrings)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayValue])

    // Listener Global PointerUp to hide tooltip
    React.useEffect(() => {
      const handleGlobalPointerUp = () => {
        if (activeThumbIndex !== null) {
          setActiveThumbIndex(null)
        }
      }
      // To ensure it runs before other events
      window.addEventListener("pointerup", handleGlobalPointerUp, true)
      window.addEventListener("pointercancel", handleGlobalPointerUp, true)
      return () => {
        window.removeEventListener("pointerup", handleGlobalPointerUp, true)
        window.removeEventListener("pointercancel", handleGlobalPointerUp, true)
      }
    }, [activeThumbIndex])

    // Calculate Tooltip Position
    React.useEffect(() => {
      if (
        showTooltip &&
        activeThumbIndex !== null &&
        sliderAndTicksContainerRef.current &&
        thumbRefs.current[activeThumbIndex]
      ) {
        const containerNode = sliderAndTicksContainerRef.current
        const thumbNode = thumbRefs.current[activeThumbIndex]
        if (thumbNode) {
          const containerRect = containerNode.getBoundingClientRect()
          const thumbRect = thumbNode.getBoundingClientRect()
          const newLeft =
            thumbRect.left - containerRect.left + thumbRect.width / 2
          const newBottom =
            containerRect.height - (thumbRect.top - containerRect.top) + 8 // 8px offset above thumb
          setTooltipStyle((prev) => ({
            ...prev,
            left: `${newLeft}px`,
            bottom: `${newBottom}px`,
            opacity: 1,
            visibility: "visible",
            transition: "opacity 0.1s ease-out, visibility 0s linear 0s" // Show instantly
          }))
        }
      } else {
        // Hide
        setTooltipStyle((prev) => ({
          ...prev,
          opacity: 0,
          visibility: "hidden",
          transition: "opacity 0.1s ease-out, visibility 0s linear 0.1s" // Hide with visibility delay
        }))
      }
    }, [activeThumbIndex, displayValue, showTooltip]) // Recalculate if active thumb or value changes

    // ****** HANDLERS ****** //
    const findClosestValue = React.useCallback(
      (target: number, allowedValues: number[]): number => {
        if (!allowedValues || allowedValues.length === 0) return target
        // Find value in allowedValues with smallest absolute difference to target
        return allowedValues.reduce((prev, curr) =>
          Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
        )
      },
      []
    )

    // Handler called by Radix OR by Input validation
    const handleSliderChange = React.useCallback(
      (newValue: number[]) => {
        let finalValue = newValue

        // *** SNAP TO TICK: If ticks are visible, set each value to nearest tick ***
        if (showTicks && tickValues.length > 0) {
          finalValue = newValue.map((val) => findClosestValue(val, tickValues))
        }

        // Check if value actually changed after snap to avoid unnecessary renders/calls
        const currentValue = isControlled ? value! : uncontrolledValue
        const currentValueArray = Array.isArray(currentValue)
          ? currentValue
          : [currentValue]

        if (JSON.stringify(finalValue) !== JSON.stringify(currentValueArray)) {
          // 1. Update internal state IF NOT externally controlled
          if (!isControlled) {
            setUncontrolledValue(finalValue)
          }
          // 2. Always notify parent component with SET value.
          onValueChange?.(finalValue)
        }
      },
      [
        isControlled,
        onValueChange,
        showTicks,
        tickValues,
        findClosestValue,
        value,
        uncontrolledValue
      ]
    )

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const newInputStrings = [...inputStringValues]
      newInputStrings[index] = event.target.value
      setInputStringValues(newInputStrings)
    }

    const validateAndCommitValue = React.useCallback(
      (index: number) => {
        const rawString = inputStringValues[index]
        let numericValue = parseFloat(rawString)
        const currentSliderValueArray = displayValue

        if (isNaN(numericValue)) {
          numericValue = currentSliderValueArray[index]
        } else {
          numericValue = Math.min(Math.max(numericValue, min), max) // Clamp
        }

        // *** SNAP TO TICK: Set to nearest tick BEFORE comparing/sending ***
        if (showTicks && tickValues.length > 0) {
          numericValue = findClosestValue(numericValue, tickValues)
        }

        const newValueArray = [...currentSliderValueArray]
        // Only update if the numeric value actually changed from the current state
        if (Math.abs(currentSliderValueArray[index] - numericValue) > 1e-9) {
          newValueArray[index] = numericValue
          // Call the main handler that already does the snap and notification
          handleSliderChange(newValueArray)
        } else {
          // If the numeric value (already set to tick) is the same,
          // but the input string is different, resynchronize input.
          const finalNumericValueStr = String(numericValue) // Use the value already set/validated
          if (rawString !== finalNumericValueStr) {
            const finalStrings = currentSliderValueArray.map(String) // Rebuild strings from the current state
            finalStrings[index] = finalNumericValueStr
            setInputStringValues(finalStrings)
          }
        }
      },
      [
        inputStringValues,
        displayValue,
        min,
        max,
        showTicks,
        tickValues,
        handleSliderChange,
        findClosestValue
      ]
    )

    const handleThumbPointerDown = (index: number) => {
      if (showTooltip) {
        setActiveThumbIndex(index)
      }
    }

    const showLabels = startLabel || endLabel
    const currentTooltipValue =
      activeThumbIndex !== null ? displayValue[activeThumbIndex] : undefined

    return (
      <div className="w-full">
        {withOutput && (
          <div className="mb-1 flex justify-end">
            <output className="text-sm font-medium tabular-nums">
              {displayValue.length > 1
                ? displayValue.join(" - ")
                : displayValue[0]}
            </output>
          </div>
        )}

        <div className={cn("flex items-center gap-3")}>
          {startIcon && <span className="mb-1 flex-shrink-0">{startIcon}</span>}

          <div
            ref={sliderAndTicksContainerRef}
            className={cn(
              "relative w-full flex-grow",
              showTicks ? "pb-6" : "pb-1"
            )}
          >
            {showLabels && (
              <span
                className={cn(
                  "mb-1 flex w-full items-center justify-between gap-2 text-xs font-medium text-muted-foreground"
                )}
                aria-hidden="true"
              >
                <span>{startLabel}</span>
                <span>{endLabel}</span>
              </span>
            )}

            {showTooltip && (
              <div
                style={tooltipStyle}
                className={cn(
                  "rounded bg-foreground px-2 py-0.5 text-xs font-semibold text-background shadow-md",
                  "transition-opacity duration-100 ease-out"
                )}
              >
                {activeThumbIndex !== null ? currentTooltipValue : ""}
              </div>
            )}

            <SliderPrimitive.Root
              ref={ref}
              value={displayValue}
              defaultValue={initialValue}
              onValueChange={handleSliderChange}
              min={min}
              max={max}
              step={step}
              className={cn(
                sliderRootVariants({ variant }),
                showTooltip ? "pt-1" : "",
                className
              )}
              {...restSliderProps}
            >
              <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                <SliderPrimitive.Range className="absolute h-full bg-primary" />
              </SliderPrimitive.Track>
              {displayValue.map((_, index) => (
                <SliderPrimitive.Thumb
                  key={index}
                  ref={(el) => {
                    thumbRefs.current[index] = el
                  }}
                  onPointerDownCapture={() => handleThumbPointerDown(index)}
                  className="z-10 block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                />
              ))}
            </SliderPrimitive.Root>

            {showTicks && tickValues.length > 0 && (
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-6 select-none",
                  variant !== "thin" ? "mx-[0.65rem]" : "mx-[0.3rem]"
                )}
                aria-hidden="true"
              >
                {tickValues.map((tickValue, i) => {
                  const range = max - min
                  const percent =
                    range > 0
                      ? ((tickValue - min) / range) * 100
                      : tickValue === min
                        ? 0
                        : 100
                  return (
                    <span
                      key={i}
                      className="absolute top-0 flex flex-col items-center"
                      style={{
                        left: `${percent}%`,
                        transform: "translateX(-50%)"
                      }}
                    >
                      <span className="h-1.5 w-px bg-muted-foreground/70" />
                      {/* Line */}
                      <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                        {/* Label */}
                        {tickValue}
                      </span>
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          {endIcon && <span className="mb-1 flex-shrink-0">{endIcon}</span>}

          {withInput &&
            displayValue.map((_, index) => (
              <input
                key={index}
                type="text"
                inputMode="decimal"
                value={inputStringValues[index] ?? ""}
                onChange={(e) => handleInputChange(e, index)}
                onBlur={() => validateAndCommitValue(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    validateAndCommitValue(index)
                    ;(e.target as HTMLInputElement).blur()
                  } else if (e.key === "Escape") {
                    setInputStringValues(displayValue.map(String))
                    ;(e.target as HTMLInputElement).blur()
                  }
                }}
                className={cn(
                  "h-8 w-14 shrink-0 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors",
                  "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                  "placeholder:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "text-center tabular-nums"
                )}
                aria-label={`Value ${index + 1}`}
              />
            ))}
        </div>
      </div>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
export type { SliderProps }
