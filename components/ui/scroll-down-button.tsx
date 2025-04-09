"use client"

import { cn } from "@/lib/utils"

interface ScrollDownButtonProps {
  /**
   * The ID of the element to scroll to (without the '#').
   * Example: "section05"
   */
  targetId: string
  /**
   * Optional text to display alongside the button.
   */
  text?: string
  /**
   * Additional CSS classes applied to the button container.
   */
  className?: string
  /**
   * Additional CSS classes applied to the text element.
   */
  textClassName?: string
  /**
   * Additional CSS classes applied to the arrow element (span).
   */
  arrowClassName?: string
  /**
   * Offset in pixels to account for fixed headers or other elements.
   * Example: 80 (for an 80px header).
   * @default 0
   */
  offset?: number
}

/**
 * A button that, when clicked, scrolls the view to the element with the provided targetId.
 */
export function ScrollDownButton({
  targetId,
  text,
  className,
  textClassName,
  arrowClassName,
  offset = 0
}: ScrollDownButtonProps) {
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    } else {
      console.warn(`Smooth scroll target not found: #${targetId}`)
      window.location.hash = `#${targetId}`
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleSmoothScroll}
      className={cn(
        "relative inline-block cursor-pointer pt-[60px] focus-visible:outline-0",
        className
      )}
      aria-label={`Scroll down to ${targetId}`}
    >
      <span
        className={cn(
          "animate-scroll-down-btn absolute left-1/2 top-0 -ml-3 h-6 w-6 -rotate-45 transform border-b border-l border-foreground",
          arrowClassName
        )}
      />
      {!!text && (
        <span
          className={cn(
            "absolute -bottom-7 left-1/2 -translate-x-1/2 text-lg text-foreground",
            textClassName
          )}
        >
          {text}
        </span>
      )}
    </a>
  )
}

export type { ScrollDownButtonProps }
