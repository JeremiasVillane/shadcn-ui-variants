"use client"

import {
  Blockquote,
  H1,
  H2,
  InlineCode,
  Lead,
  P,
  Prose
} from "@/components/ui/prose"

export function MixedContent() {
  return (
    // Global scale set to large
    <Prose scale="lg">
      <H1>Main Title</H1> {/* Inherits lg scale from Prose */}
      <Lead>Lead paragraph.</Lead> {/* Inherits lg scale */}
      {/* This scale prop will be overridden by Prose's 'lg' scale */}
      <P scale="xs">This paragraph attempts xs, but renders as lg.</P>
      <H2>Secondary Heading</H2> {/* Inherits lg scale */}
      <P>
        Regular text with <InlineCode>inline code</InlineCode>.{" "}
        {/* Inherits lg scale */}
      </P>
      <Blockquote>A quote.</Blockquote> {/* Inherits lg scale */}
    </Prose>
  )
}
