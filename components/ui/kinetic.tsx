"use client"

import * as React from "react"
import {
  motion,
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

  /**
   * Custom className for the wrapper
   */
  className?: string

  /**
   * Children to animate
   */
  children: React.ReactNode

  // /**
  //  * HTML element type to render
  //  * @default 'div' */
  // as?: keyof HTMLElementTagNameMap

  /**
   * Viewport options for intersection observer
   */
  viewportOptions?: {
    root?: Element | null
    margin?:
      | `${number}% ${number}% ${number}% ${number}%`
      | `${number}px ${number}px ${number}px ${number}px`
    amount?: number | "some" | "all"
  }

  /**
   * Custom transition properties
   */
  transition?: MotionProps["transition"]

  /** Optional user-provided style */
  style?: React.CSSProperties
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
  propKey: string, // e.g., "opacity", "y", "filter"
  isOnScroll: boolean,
  passedVariants: Variants | undefined, // The variants resolved for the current animation
  animationName: KineticProps["animation"], // String name if predefined, or the custom Variants object
  isCustomScrollOffsetActive: boolean
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
      break // Target is no blur
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
    // Return a non-animating range if not on scroll
    return {
      inputRange: [0, 1] as [number, number],
      outputRange: [defaultTargetVisibleVal, defaultTargetVisibleVal] as [
        string | number,
        string | number
      ],
      defined: false
    }
  }

  // Determine the input range for useTransform based on whether a custom offset is active
  const scrollInputRange: [number, number] = isCustomScrollOffsetActive
    ? [0, 1] // Use full 0-1 range of scrollYProgress
    : [0.15, 0.85] // Default: animate between 15% and 85% of scrollYProgress

  // Prioritize values from the passedVariants
  const variantVisibleVal = (passedVariants?.visible as any)?.[propKey]
  let variantHiddenVal = (passedVariants?.hidden as any)?.[propKey]

  // Determine final visible value: Use variant's value or the default target.
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
          break // Default slide-in from right-ish
        case "y":
          variantHiddenVal = finalVisibleVal === 0 ? 20 : finalVisibleVal
          break // Default slide-in from bottom-ish
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

  // Determine if this property should actually animate via scroll
  let shouldAnimateProperty = false
  const isPropInVariantVisible =
    (passedVariants?.visible as any)?.[propKey] !== undefined
  const isPropInVariantHidden =
    (passedVariants?.hidden as any)?.[propKey] !== undefined

  if (isPropInVariantVisible || isPropInVariantHidden) {
    // If the property is explicitly mentioned in the variant, animate if values differ.
    shouldAnimateProperty = finalHiddenVal !== finalVisibleVal
  } else if (propKey === "opacity") {
    // Opacity has a common implicit animation (0 to 1), animate if different.
    shouldAnimateProperty = finalHiddenVal !== finalVisibleVal
  }
  // Other properties (filter, x, y, scale, rotate) will not animate by default if not in variants.

  return {
    inputRange: scrollInputRange,
    outputRange: [
      finalHiddenVal as string | number,
      finalVisibleVal as string | number
    ],
    defined: shouldAnimateProperty
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
      ...props
    },
    forwardedRef
  ) => {
    const viewRef = React.useRef<HTMLElement>(null)

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        ;(viewRef as React.MutableRefObject<HTMLElement | null>).current = node
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
        // Deep clone to avoid mutating predefinedAnimations and allow instance-specific modifications
        const newVariants = JSON.parse(JSON.stringify(baseVariants))

        if (newVariants.visible) {
          const originalVariantTransition =
            typeof baseVariants.visible === "object" &&
            baseVariants.visible !== null &&
            "transition" in baseVariants.visible
              ? (baseVariants.visible as { transition?: any }).transition || {}
              : {}

          newVariants.visible.transition = {
            type: "spring",
            ...originalVariantTransition
          }

          if (typeof duration === "number") {
            newVariants.visible.transition.duration = duration // Set/override duration

            // For "elastic" specifically: if we're applying a component-level duration,
            // remove its predefined physical properties to let the new `duration` primarily drive the spring behavior.
            if (animation === "elastic") {
              delete newVariants.visible.transition.stiffness
              delete newVariants.visible.transition.damping
              delete newVariants.visible.transition.mass
            }
          }
          // If `typeof duration !== 'number'`, the newVariants.visible.transition will retain
          // its original properties from baseVariants (e.g., bounce's original duration,
          // or elastic's original stiffness/damping), because they were spread from
          // originalVariantTransition and not subsequently overridden or deleted.

          // If loop is true, also inject loop properties into the variant's transition
          if (loop) {
            newVariants.visible.transition.repeat = Number.POSITIVE_INFINITY
            newVariants.visible.transition.repeatType = "loop"
          }
          return newVariants
        }
      }

      // For other animations or custom variant objects, return them as is.
      // Loop for these is handled by `componentBaseTransition`.
      return baseVariants
    }, [animation, loop, duration])

    const rootRefForInView = React.useRef<Element | null>(
      viewportOptions.root ?? null
    )
    const isInView = useInView(viewRef, {
      once: onScroll ? false : once,
      margin: viewportOptions.margin,
      amount: viewportOptions.amount,
      root: rootRefForInView
    })

    const isCustomScrollOffsetActive = typeof offset === "number" && onScroll

    const { scrollYProgress } = useScroll({
      target: viewRef,
      offset: isCustomScrollOffsetActive
        ? ["start end", `start ${offset}px`]
        : ["start end", "end start"]
    })

    // --- Scroll-driven animation setup ---
    const opacityAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "opacity",
          onScroll,
          resolvedAnimationVariants,
          animation,
          isCustomScrollOffsetActive
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        isCustomScrollOffsetActive
      ]
    )
    const opacityScroll = useTransform(
      scrollYProgress,
      opacityAnimParams.inputRange,
      opacityAnimParams.outputRange,
      { clamp: true }
    )

    const xAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "x",
          onScroll,
          resolvedAnimationVariants,
          animation,
          isCustomScrollOffsetActive
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        isCustomScrollOffsetActive
      ]
    )
    const xScroll = useTransform(
      scrollYProgress,
      xAnimParams.inputRange,
      xAnimParams.outputRange,
      { clamp: true }
    )

    const yAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "y",
          onScroll,
          resolvedAnimationVariants,
          animation,
          isCustomScrollOffsetActive
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        isCustomScrollOffsetActive
      ]
    )
    const yScroll = useTransform(
      scrollYProgress,
      yAnimParams.inputRange,
      yAnimParams.outputRange,
      { clamp: true }
    )

    const scaleAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "scale",
          onScroll,
          resolvedAnimationVariants,
          animation,
          isCustomScrollOffsetActive
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        isCustomScrollOffsetActive
      ]
    )
    const scaleScroll = useTransform(
      scrollYProgress,
      scaleAnimParams.inputRange,
      scaleAnimParams.outputRange,
      { clamp: true }
    )

    const rotateAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "rotate",
          onScroll,
          resolvedAnimationVariants,
          animation,
          isCustomScrollOffsetActive
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        isCustomScrollOffsetActive
      ]
    )
    const rotateScroll = useTransform(
      scrollYProgress,
      rotateAnimParams.inputRange,
      rotateAnimParams.outputRange,
      { clamp: true }
    )

    const filterAnimParams = React.useMemo(
      () =>
        calculateTransformAnimationParams(
          "filter",
          onScroll,
          resolvedAnimationVariants,
          animation,
          isCustomScrollOffsetActive
        ),
      [
        onScroll,
        resolvedAnimationVariants,
        animation,
        isCustomScrollOffsetActive
      ]
    )
    const filterScroll = useTransform(
      scrollYProgress,
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
    // --- End of scroll-driven animation setup ---

    const animateControl = React.useMemo(() => {
      if (onScroll) return undefined
      if (startOnView) return isInView ? "visible" : "hidden"
      return "visible"
    }, [onScroll, startOnView, isInView])

    const componentBaseTransition = React.useMemo(() => {
      if (onScroll) return undefined
      const trans: MotionProps["transition"] = {
        duration:
          typeof animation === "string" &&
          (animation === "bounce" || animation === "elastic")
            ? undefined
            : duration,
        delay,
        ...customTransition
      }
      if (loop) {
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

export { Kinetic }
export type { KineticProps }
