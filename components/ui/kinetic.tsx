"use client"

import * as React from "react"
import {
  motion,
  motionValue,
  useInView,
  useScroll,
  useTransform,
  type MotionProps,
  type MotionValue,
  type Variants
} from "motion/react"

import { cn } from "@/lib/utils"

interface KineticProps extends Omit<MotionProps, "transition"> {
  /**
   * The animation variant to apply. Can be a predefined string or custom Variants object.
   */
  // prettier-ignore
  animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInUp" | "slideInDown" | "slideInLeft" | "slideInRight" | "blurIn" | "blurInUp" | "blurInDown" | "blurInLeft" | "blurInRight" | "rotateIn" | "bounce" | "elastic" | Variants

  /**
   * Duration of the animation in seconds
   * @default 0.5 */
  duration?: number

  /**
   * Delay before the animation starts in seconds
   * @default 0 */
  delay?: number

  /**
   * Whether the animation should start only when the component enters the viewport
   * @default false */
  startOnView?: boolean

  /**
   * Whether the animation should play only once or every time it enters the viewport
   * Only applies when startOnView is true
   * @default true */
  once?: boolean

  /**
   * Whether the animation should repeat indefinitely
   * @default false */
  loop?: boolean

  /**
   * Whether to enable scroll-based animations
   * When enabled, animation progress is tied to scroll position
   * @default false */
  onScroll?: boolean

  /**
   * Defines the point (in pixels) from the top of the viewport at which the scroll-driven animation completes.
   * Specifically, `scrollYProgress` will reach 1 when the top of the animating element is this many pixels
   * from the top of the viewport. The animation (e.g., fade-in) will then map directly to this 0-1 progress.
   * Only applies if `onScroll` is true. If undefined, the animation plays out over a default portion
   * of the element's visibility duration in the viewport.
   */
  offset?: number

  /** Custom className for the wrapper */
  className?: string

  /** Children to animate */
  children: React.ReactNode

  // /**
  //  * HTML element type to render
  //  * @default 'div' */
  // as?: keyof HTMLElementTagNameMap

  /** Viewport options for intersection observer */
  viewportOptions?: {
    root?: Element | null
    margin?:
      | `${number}% ${number}% ${number}% ${number}%`
      | `${number}px ${number}px ${number}px ${number}px`
    amount?: number | "some" | "all"
  }

  /** Custom transition properties */
  transition?: MotionProps["transition"]

  /** Optional user-provided style */
  style?: React.CSSProperties

  // Internal props used by KineticText for staggered scroll animations.

  /**
   * Internal prop used by KineticText to pass the parent's scroll progress.
   * Do not use directly.
   * @internal
   */
  externalScrollProgress?: MotionValue<number>

  /** Internal prop used by KineticText to indicate if the parent is using a custom offset.
   * Do not use directly.
   * @internal
   */
  isParentScrollRangeCustom?: boolean

  /** Internal prop used by KineticText to pass the index of the current segment.
   * Do not use directly.
   * @internal
   */
  staggerIndex?: number

  /** Internal prop used by KineticText to pass the calculated scroll stagger amount.
   * Do not use directly.
   * @internal
   */
  scrollStaggerAmount?: number

  /**  Internal prop used by KineticText to pass the calculated scroll span for a segment.
   * Do not use directly.
   * @internal
   */
  segmentScrollSpan?: number
}

const predefinedAnimations: Record<string, Variants> = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  fadeInUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  fadeInDown: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  fadeInLeft: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
  fadeInRight: { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  slideInUp: { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  slideInDown: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInLeft: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideInRight: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  blurIn: {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 }
  },
  blurInUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  },
  blurInDown: {
    hidden: { opacity: 0, y: -20, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  },
  blurInLeft: {
    hidden: { opacity: 0, x: -20, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" }
  },
  blurInRight: {
    hidden: { opacity: 0, x: 20, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0 }
  },
  bounce: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.7, duration: 0.8 }
    }
  },
  elastic: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }
}

const calculateTransformAnimationParams = (
  propKey: string,
  isOnScroll: boolean,
  passedVariants: Variants | undefined,
  animationName: KineticProps["animation"],
  useFullBaseRange: boolean,
  staggerIndex?: number,
  scrollStaggerValue?: number,
  segmentAnimationSpanFromProps?: number
) => {
  let defaultTargetVisibleVal: string | number
  switch (propKey) {
    case "opacity":
      defaultTargetVisibleVal = 1
      break
    case "scale":
      defaultTargetVisibleVal = 1
      break
    case "filter":
      defaultTargetVisibleVal = "blur(0px)"
      break
    case "x":
      defaultTargetVisibleVal = 0
      break
    case "y":
      defaultTargetVisibleVal = 0
      break
    case "rotate":
      defaultTargetVisibleVal = 0
      break
    default:
      defaultTargetVisibleVal = 0
      break
  }

  if (!isOnScroll) {
    return {
      inputRange: [0, 1] as [number, number],
      outputRange: [defaultTargetVisibleVal, defaultTargetVisibleVal] as [
        string | number,
        string | number
      ],
      defined: false
    }
  }

  let currentInputStart: number
  let currentInputEnd: number
  let isValidRange = true
  const currentSegmentAnimationSpan =
    typeof segmentAnimationSpanFromProps === "number" &&
    segmentAnimationSpanFromProps > 0 &&
    segmentAnimationSpanFromProps <= 1
      ? segmentAnimationSpanFromProps
      : 0.2

  if (
    typeof staggerIndex === "number" &&
    typeof scrollStaggerValue === "number" &&
    scrollStaggerValue >= 0
  ) {
    currentInputStart = staggerIndex * scrollStaggerValue
    currentInputEnd = currentInputStart + currentSegmentAnimationSpan
  } else {
    currentInputStart = useFullBaseRange ? 0 : 0.15
    currentInputEnd = useFullBaseRange ? 1 : 0.85
  }

  currentInputStart = Math.max(0, Math.min(1, currentInputStart))
  currentInputEnd = Math.max(0, Math.min(1, currentInputEnd))
  isValidRange = currentInputStart < currentInputEnd

  const scrollInputRangeToUse: [number, number] = [
    currentInputStart,
    currentInputEnd
  ]

  const variantVisibleVal = (passedVariants?.visible as any)?.[propKey]
  let variantHiddenVal = (passedVariants?.hidden as any)?.[propKey]
  const finalVisibleVal = variantVisibleVal ?? defaultTargetVisibleVal

  if (variantHiddenVal === undefined) {
    if (
      typeof animationName === "string" &&
      predefinedAnimations[animationName]
    ) {
      variantHiddenVal = (predefinedAnimations[animationName].hidden as any)?.[
        propKey
      ]
    }
    if (variantHiddenVal === undefined) {
      switch (propKey) {
        case "opacity":
          variantHiddenVal = 0
          break
        case "scale":
          variantHiddenVal =
            finalVisibleVal === 1
              ? 0.8
              : typeof finalVisibleVal === "number"
                ? finalVisibleVal * 0.8
                : finalVisibleVal
          break
        case "filter":
          variantHiddenVal =
            finalVisibleVal === "blur(0px)" || finalVisibleVal === "none"
              ? "blur(8px)"
              : finalVisibleVal
          break
        case "x":
          variantHiddenVal = finalVisibleVal === 0 ? 20 : finalVisibleVal
          break
        case "y":
          variantHiddenVal = finalVisibleVal === 0 ? 20 : finalVisibleVal
          break
        case "rotate":
          variantHiddenVal = finalVisibleVal === 0 ? -90 : finalVisibleVal
          break
        default:
          variantHiddenVal = finalVisibleVal
          break
      }
    }
  }
  const finalHiddenVal = variantHiddenVal

  let shouldAnimateBaseProperty = false
  const isPropInVariantVisible =
    (passedVariants?.visible as any)?.[propKey] !== undefined
  const isPropInVariantHidden =
    (passedVariants?.hidden as any)?.[propKey] !== undefined

  if (isPropInVariantVisible || isPropInVariantHidden) {
    shouldAnimateBaseProperty = finalHiddenVal !== finalVisibleVal
  } else if (propKey === "opacity") {
    shouldAnimateBaseProperty = finalHiddenVal !== finalVisibleVal
  }

  return {
    inputRange: scrollInputRangeToUse,
    outputRange: [
      finalHiddenVal as string | number,
      finalVisibleVal as string | number
    ],
    defined: shouldAnimateBaseProperty && isValidRange
  }
}

const Kinetic = React.forwardRef<HTMLElement, KineticProps>(
  (
    {
      animation = "fadeIn",
      duration = 0.5,
      delay = 0,
      startOnView = false,
      once = true,
      loop = false,
      onScroll = false,
      offset,
      className,
      children,
      viewportOptions = {},
      transition: customTransition,
      style: userStyle,
      externalScrollProgress,
      isParentScrollRangeCustom,
      staggerIndex,
      scrollStaggerAmount,
      segmentScrollSpan,
      ...props
    },
    forwardedRef
  ) => {
    const internalViewRef = React.useRef<HTMLElement>(null)

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        ;(
          internalViewRef as React.MutableRefObject<HTMLElement | null>
        ).current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          ;(
            forwardedRef as React.MutableRefObject<HTMLElement | null>
          ).current = node
        }
      },
      [forwardedRef]
    )

    const resolvedAnimationVariants = React.useMemo(() => {
      let baseVariants =
        typeof animation === "string"
          ? predefinedAnimations[animation] || predefinedAnimations.fadeIn
          : animation
      if (!baseVariants) return predefinedAnimations.fadeIn
      const animationIsString = typeof animation === "string"
      if (
        animationIsString &&
        (animation === "bounce" || animation === "elastic")
      ) {
        const newVariants = JSON.parse(JSON.stringify(baseVariants))
        if (newVariants.visible) {
          const originalVariantTransition =
            typeof baseVariants.visible === "object" &&
            baseVariants.visible !== null &&
            typeof (baseVariants.visible as any).transition === "object" &&
            (baseVariants.visible as any).transition !== null
              ? (baseVariants.visible as any).transition
              : {}
          newVariants.visible.transition = {
            type: "spring",
            ...originalVariantTransition
          }
          if (typeof duration === "number") {
            newVariants.visible.transition.duration = duration
            if (animation === "elastic") {
              delete newVariants.visible.transition.stiffness
              delete newVariants.visible.transition.damping
              delete newVariants.visible.transition.mass
            }
          }
          if (loop) {
            newVariants.visible.transition.repeat = Number.POSITIVE_INFINITY
            newVariants.visible.transition.repeatType = "loop"
          }
          if (!onScroll && typeof delay === "number") {
            newVariants.visible.transition.delay = delay
          } else if (
            !onScroll &&
            delay === undefined &&
            newVariants.visible.transition.delay !== undefined
          ) {
            // If component delay is not set (e.g. baseDelay=0, stagger=0 for first item),
            // remove any hardcoded delay from the original variant definition to ensure it starts immediately.
            delete newVariants.visible.transition.delay
          }
          return newVariants
        }
      }
      return baseVariants
    }, [animation, loop, duration, delay, onScroll])

    const rootRefForInView = React.useRef<Element | null>(
      viewportOptions.root ?? null
    )
    const isInView = useInView(internalViewRef, {
      once: onScroll ? false : once,
      margin: viewportOptions.margin,
      amount: viewportOptions.amount,
      root: rootRefForInView
    })

    const useOwnOffsetForScroll =
      typeof offset === "number" && onScroll && !externalScrollProgress
    const internalScrollHook = useScroll({
      target: internalViewRef,
      offset: useOwnOffsetForScroll
        ? ["start end", `start ${offset}px`]
        : ["start end", "end start"]
    })

    const scrollYProgressToUse: MotionValue<number> =
      onScroll && externalScrollProgress
        ? externalScrollProgress
        : onScroll
          ? internalScrollHook.scrollYProgress
          : motionValue(0)

    const effectiveUseFullRangeForCalc = externalScrollProgress
      ? (isParentScrollRangeCustom ?? false)
      : useOwnOffsetForScroll

    const opacityAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "opacity",
          onScroll,
          resolvedAnimationVariants,
          animation,
          effectiveUseFullRangeForCalc,
          staggerIndex,
          scrollStaggerAmount,
          segmentScrollSpan
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        effectiveUseFullRangeForCalc,
        staggerIndex,
        scrollStaggerAmount,
        segmentScrollSpan
      ]
    )

    const xAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "x",
          onScroll,
          resolvedAnimationVariants,
          animation,
          effectiveUseFullRangeForCalc,
          staggerIndex,
          scrollStaggerAmount,
          segmentScrollSpan
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        effectiveUseFullRangeForCalc,
        staggerIndex,
        scrollStaggerAmount,
        segmentScrollSpan
      ]
    )

    const yAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "y",
          onScroll,
          resolvedAnimationVariants,
          animation,
          effectiveUseFullRangeForCalc,
          staggerIndex,
          scrollStaggerAmount,
          segmentScrollSpan
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        effectiveUseFullRangeForCalc,
        staggerIndex,
        scrollStaggerAmount,
        segmentScrollSpan
      ]
    )

    const scaleAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "scale",
          onScroll,
          resolvedAnimationVariants,
          animation,
          effectiveUseFullRangeForCalc,
          staggerIndex,
          scrollStaggerAmount,
          segmentScrollSpan
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        effectiveUseFullRangeForCalc,
        staggerIndex,
        scrollStaggerAmount,
        segmentScrollSpan
      ]
    )

    const rotateAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "rotate",
          onScroll,
          resolvedAnimationVariants,
          animation,
          effectiveUseFullRangeForCalc,
          staggerIndex,
          scrollStaggerAmount,
          segmentScrollSpan
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        effectiveUseFullRangeForCalc,
        staggerIndex,
        scrollStaggerAmount,
        segmentScrollSpan
      ]
    )

    const filterAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "filter",
          onScroll,
          resolvedAnimationVariants,
          animation,
          effectiveUseFullRangeForCalc,
          staggerIndex,
          scrollStaggerAmount,
          segmentScrollSpan
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        effectiveUseFullRangeForCalc,
        staggerIndex,
        scrollStaggerAmount,
        segmentScrollSpan
      ]
    )

    const opacityScroll = useTransform(
      scrollYProgressToUse,
      opacityAnimParams.inputRange,
      opacityAnimParams.outputRange,
      { clamp: true }
    )
    const xScroll = useTransform(
      scrollYProgressToUse,
      xAnimParams.inputRange,
      xAnimParams.outputRange,
      { clamp: true }
    )
    const yScroll = useTransform(
      scrollYProgressToUse,
      yAnimParams.inputRange,
      yAnimParams.outputRange,
      { clamp: true }
    )
    const scaleScroll = useTransform(
      scrollYProgressToUse,
      scaleAnimParams.inputRange,
      scaleAnimParams.outputRange,
      { clamp: true }
    )
    const rotateScroll = useTransform(
      scrollYProgressToUse,
      rotateAnimParams.inputRange,
      rotateAnimParams.outputRange,
      { clamp: true }
    )
    const filterScroll = useTransform(
      scrollYProgressToUse,
      filterAnimParams.inputRange,
      filterAnimParams.outputRange,
      { clamp: true }
    )

    const scrollDrivenStyles = React.useMemo(() => {
      if (!onScroll) return {}
      const styles: Record<string, MotionValue | string | number> = {}
      if (opacityAnimParams.defined) styles.opacity = opacityScroll
      if (xAnimParams.defined) styles.x = xScroll
      if (yAnimParams.defined) styles.y = yScroll
      if (scaleAnimParams.defined) styles.scale = scaleScroll
      if (rotateAnimParams.defined) styles.rotate = rotateScroll
      if (filterAnimParams.defined) styles.filter = filterScroll
      return styles
    }, [
      onScroll,
      opacityAnimParams,
      xAnimParams,
      yAnimParams,
      scaleAnimParams,
      rotateAnimParams,
      filterAnimParams,
      opacityScroll,
      xScroll,
      yScroll,
      scaleScroll,
      rotateScroll,
      filterScroll
    ])

    const animateControl = React.useMemo(() => {
      if (onScroll) return undefined
      if (startOnView) return isInView ? "visible" : "hidden"
      return "visible"
    }, [onScroll, startOnView, isInView])

    const componentBaseTransition = React.useMemo(() => {
      if (onScroll) return undefined

      const isSpringWithVariantTransition =
        typeof animation === "string" &&
        (animation === "bounce" || animation === "elastic")

      const trans: MotionProps["transition"] = {
        duration: isSpringWithVariantTransition ? undefined : duration,
        delay: isSpringWithVariantTransition ? undefined : delay,
        ...customTransition
      }

      if (
        loop &&
        !isSpringWithVariantTransition &&
        customTransition?.repeat === undefined
      ) {
        trans.repeat = Number.POSITIVE_INFINITY
        trans.repeatType = "loop"
      }
      return trans
    }, [onScroll, duration, delay, loop, customTransition, animation])

    const motionComponentProps: MotionProps & Record<string, any> = { ...props }

    if (onScroll) {
      motionComponentProps.style = { ...userStyle, ...scrollDrivenStyles }
    } else {
      motionComponentProps.variants = resolvedAnimationVariants
      motionComponentProps.initial = "hidden"
      motionComponentProps.animate = animateControl
      motionComponentProps.transition = componentBaseTransition
      if (userStyle) {
        motionComponentProps.style = {
          ...(motionComponentProps.style || {}),
          ...userStyle
        }
      }
    }

    return (
      <motion.div
        ref={setRefs}
        className={cn(className)}
        {...motionComponentProps}
      >
        {children}
      </motion.div>
    )
  }
)
Kinetic.displayName = "Kinetic"

export { Kinetic, predefinedAnimations }
export type { KineticProps }
