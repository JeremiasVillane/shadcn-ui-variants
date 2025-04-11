"use client"

import { forwardRef, useState } from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface RatingStarsInputProps {
  /** An optional name for the input element. Useful for integration with forms. */
  name?: string
  /** The current numeric value of the rating (0-5). */
  value: number
  /** Callback invoked when the rating value changes. */
  onChange: (value: number) => void
  /** Optional callback for when the input loses focus. */
  onBlur?: () => void
  /** Optional flag to disable the input.
   * @default false */
  disabled?: boolean
}

const RatingStarsInput = forwardRef<HTMLDivElement, RatingStarsInputProps>(
  ({ name, value, onChange, onBlur, disabled }, ref) => {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null)

    return (
      <div ref={ref} className="flex gap-1" tabIndex={0} onBlur={onBlur}>
        <input type="hidden" name={name} value={value} />
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled =
            hoveredRating !== null ? index < hoveredRating : index < value

          return (
            <button
              key={index}
              type="button"
              className="p-0.5"
              onClick={() => onChange(index + 1)}
              onMouseEnter={() => !disabled && setHoveredRating(index + 1)}
              onMouseLeave={() => !disabled && setHoveredRating(null)}
              disabled={disabled}
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  isFilled
                    ? "fill-primary text-primary"
                    : "fill-muted stroke-muted-foreground"
                )}
                aria-hidden="true"
              />
              <span className="sr-only">Rate {index + 1} stars</span>
            </button>
          )
        })}
      </div>
    )
  }
)
RatingStarsInput.displayName = "RatingStarsInput"

export { RatingStarsInput }
export type { RatingStarsInputProps }
