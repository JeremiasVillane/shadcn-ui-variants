"use client"

import { H1, InlineCode, Lead, P } from "@/components/ui/prose"

export function StandaloneUsage() {
  return (
    <div>
      {/* Standard div, not <Prose> */}
      <H1 scale="lg">Large Standalone Title</H1>
      <P>Regular paragraph using the P component (default scale).</P>
      {/* Explicitly set scale on this Lead component */}
      <Lead scale="sm">Small scale lead paragraph.</Lead>
      <P>
        Some text with <InlineCode>inline code</InlineCode> (default scale).
      </P>
      <P scale="xs">An extra-small paragraph.</P>
    </div>
  )
}
