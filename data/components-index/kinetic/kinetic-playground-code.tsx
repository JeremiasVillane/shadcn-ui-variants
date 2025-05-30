"use client"

import { KineticProps } from "@/components/ui/kinetic"

export const kineticPlaygroundCode = ({
  animation,
  duration,
  delay,
  startOnView,
  once,
  loop,
  onScroll,
}: KineticProps): string => {
  const code = `import { Kinetic } from "@/components/ui/kinetic"

export function KineticPlayground() {
  return (
    <Kinetic
      animation="${animation}"${duration !== 0.5 ? `
      duration={${duration}}` : ""}${delay !== 0 ? `
      delay={${delay}}` : ""}${startOnView ? `
      startOnView` : ""}${!once ? `
      once={false}` : ""}${loop ? `
      loop` : ""}${onScroll ? `
      onScroll` : ""}
    >
      <div>Content to animate</div>
    </Kinetic>
  )
}`

  return code
}
