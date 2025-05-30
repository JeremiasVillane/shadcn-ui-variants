"use client"

import * as React from "react"
import { useScroll } from "motion/react"

import { cn } from "@/lib/utils"

import { Kinetic, type KineticProps } from "./kinetic"

interface KineticTextProps
  extends Omit<
    KineticProps,
    | "children"
    | "staggerIndex" // Internal to KineticText's mapping
    | "scrollStaggerAmount" // KineticText calculates this for children
    | "externalScrollProgress" // KineticText provides this to children
    | "isParentScrollRangeCustom" // KineticText provides this to children
    | "segmentScrollSpan" // KineticText calculates this for children
    | "delay" // KineticText manages baseDelay + stagger for time-based
  > {
  /**  The text content to animate. */
  children: string

  /** How to segment the text for animation.
   * - "text": Animate the entire text as one block.
   * - "word": Animate each word individually.
   * - "character": Animate each character individually.
   * - "line": Animate each line (separated by newline characters) individually.
   */
  by?: "text" | "word" | "character" | "line"

  /** Time-based stagger. Applied if onScroll is false. @default 0.05 */
  stagger?: number

  /** Scroll-based stagger "intensity" (0 to 1, ideally < 0.5).
   * Determines how much overlap exists between segment animations.
   * Smaller value = more overlap / faster sequence.
   * Larger value = less overlap / more sequential.
   * The component will try to fit all segments based on this and segmentScrollOverlap.
   * @default 0.2 */
  scrollStagger?: number

  /** Scroll-based. A hint (0 to 1) for how much each segment's animation should overlap with the next.
   * 0 means segments play sequentially after one another.
   * 0.5 means next segment starts when current is 50% done with its span.
   * 1 means all segments effectively start together (max overlap).
   * This is used to derive segmentScrollSpan and effectiveScrollStagger.
   * @default 0.7 */
  scrollSegmentOverlap?: number

  /** Base delay for the entire animation sequence */
  delay?: number

  /** Custom className for the wrapper */
  className?: string

  /** Optional user-provided style */
  style?: React.CSSProperties

  /**
   * Whether to enable scroll-based animations
   * When enabled, animation progress is tied to scroll position
   * @default false */
  onScroll?: KineticProps["onScroll"]

  /**
   * Defines the point (in pixels) from the top of the viewport at which the scroll-driven animation completes.
   * Specifically, `scrollYProgress` will reach 1 when the top of the animating element is this many pixels
   * from the top of the viewport. The animation (e.g., fade-in) will then map directly to this 0-1 progress.
   * Only applies if `onScroll` is true. If undefined, the animation plays out over a default portion
   * of the element's visibility duration in the viewport.
   */
  offset?: KineticProps["offset"]
}

const KineticText: React.FC<KineticTextProps> = ({
  children: textContent,
  by = "character",
  stagger = 0.05,
  scrollStagger: userScrollStaggerHint = 0.2,
  scrollSegmentOverlap = 0.7,
  className: containerClassName,
  style: containerStyleProp,
  delay: baseDelay = 0,
  onScroll = false,
  offset,
  ...kineticPassThroughProps
}) => {
  const kineticTextWrapperRef = React.useRef<HTMLDivElement>(null)

  const animatableSegments = React.useMemo(() => {
    if (!textContent) return []
    const segments: string[] = []
    if (by === "word") {
      const parts = textContent.split(/(\s+)/)
      parts.forEach((part) => {
        if (part.length > 0 && !part.match(/^\s+$/)) {
          segments.push(part)
        }
      })
    } else if (by === "character") {
      textContent.split("").forEach((char) => {
        segments.push(char === " " ? "\u00A0" : char)
      })
    } else if (by === "line") {
      textContent.split("\n").forEach((line) => {
        // Allow empty lines as animatable segments for layout purposes
        segments.push(line)
      })
    } else {
      segments.push(textContent)
    }
    return segments
  }, [textContent, by])

  const numAnimatableSegments = animatableSegments.length

  const { effectiveScrollStagger, effectiveSegmentScrollSpan } =
    React.useMemo(() => {
      if (!onScroll || numAnimatableSegments <= 0) {
        return { effectiveScrollStagger: 0, effectiveSegmentScrollSpan: 0 }
      }
      if (numAnimatableSegments === 1) {
        return { effectiveScrollStagger: 0, effectiveSegmentScrollSpan: 1.0 }
      }

      // Ensure overlap is between 0 (no overlap beyond sequential start) and just under 1 (max overlap)
      const overlapFactor = Math.max(0, Math.min(0.99, scrollSegmentOverlap))

      let effSpan =
        1.0 / ((numAnimatableSegments - 1) * (1 - overlapFactor) + 1)
      let effStagger = effSpan * (1 - overlapFactor)

      // Let D be segment span, S be stagger.
      // (N-1)S + D = 1 (total progress used)
      // S = D * k (stagger is k * span, where k might be related to 1 - scrollSegmentOverlap)
      // (N-1)Dk + D = 1 => D * ((N-1)k + 1) = 1 => D = 1 / ((N-1)k + 1)
      // Let k = (1 - scrollSegmentOverlap), which is "how much of the segment plays before next starts"
      const k = Math.max(0.01, 1 - overlapFactor) // k must be > 0 if N > 1

      effSpan = 1.0 / ((numAnimatableSegments - 1) * k + 1)
      effStagger = effSpan * k

      // Safety check: if N=1, above gives D=1, S=0 (as k doesn't matter) - this is covered by N===1 case.
      if (numAnimatableSegments <= 1) {
        // Ensure for N=1, span is 1 and stagger is 0
        effSpan = 1.0
        effStagger = 0
      }

      return {
        effectiveScrollStagger: effStagger,
        effectiveSegmentScrollSpan: effSpan
      }
    }, [onScroll, numAnimatableSegments, scrollSegmentOverlap])

  const containerStyles: React.CSSProperties = { ...containerStyleProp }
  if (by === "word" || by === "character") {
    containerStyles.display = "flex"
    containerStyles.flexWrap = "wrap"
  }

  const isParentUsingCustomOffset = typeof offset === "number" && onScroll
  const parentScrollHook = useScroll({
    target: kineticTextWrapperRef,
    offset: isParentUsingCustomOffset
      ? ["start end", `start ${offset}px`]
      : ["start end", "end start"]
  })
  const parentScrollYProgress = onScroll
    ? parentScrollHook.scrollYProgress
    : undefined

  // Reconstruct the original segments (including spaces for words) for rendering
  const renderSegments = React.useMemo(() => {
    if (!textContent) return []
    if (by === "word") {
      return textContent
        .split(/(\s+)/)
        .map((part, i) => ({
          key: `word-part-${i}`,
          isSpace: part.match(/^\s+$/),
          content: part
        }))
        .filter((p) => p.content.length > 0)
    }
    // Other `by` types already produce an array of strings that are all animatable
    return animatableSegments.map((seg, i) => ({
      key: `${by}-${i}`,
      isSpace: false,
      content: seg
    }))
  }, [textContent, by, animatableSegments])

  let currentAnimatableIndex = 0

  return (
    <div
      ref={kineticTextWrapperRef}
      className={cn("kinetic-text-wrapper", containerClassName)}
      style={containerStyles}
    >
      {renderSegments.map((segmentItem, idx) => {
        if (segmentItem.isSpace && by === "word") {
          return (
            <span key={segmentItem.key} style={{ whiteSpace: "pre-wrap" }}>
              {segmentItem.content}
            </span>
          )
        }

        // For line breaks in 'line' mode, if a segment is empty, render a placeholder or skip
        if (segmentItem.content === "" && by === "line") {
          return (
            <div
              key={segmentItem.key}
              style={{ height: "1em" }}
              aria-hidden="true"
            />
          )
        }
        // Skip any other generally empty animatable segments
        if (segmentItem.content === "") return null

        const animatableIndexForStagger = currentAnimatableIndex
        currentAnimatableIndex++

        const segmentTimeDelay = baseDelay + animatableIndexForStagger * stagger

        return (
          <Kinetic
            key={segmentItem.key}
            {...kineticPassThroughProps}
            onScroll={onScroll}
            externalScrollProgress={parentScrollYProgress}
            isParentScrollRangeCustom={
              onScroll ? isParentUsingCustomOffset : undefined
            }
            delay={onScroll ? undefined : segmentTimeDelay}
            staggerIndex={onScroll ? animatableIndexForStagger : undefined}
            scrollStaggerAmount={onScroll ? effectiveScrollStagger : undefined}
            segmentScrollSpan={
              onScroll ? effectiveSegmentScrollSpan : undefined
            }
          >
            {segmentItem.content}
          </Kinetic>
        )
      })}
    </div>
  )
}
KineticText.displayName = "KineticText"

export { KineticText }
export type { KineticTextProps }
