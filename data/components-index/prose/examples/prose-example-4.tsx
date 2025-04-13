"use client"

import { Prose } from "@/components/ui/prose"

export function CustomHtmlStyling() {
  return (
    <Prose scale="default">
      <h1>Regular Title</h1>
      {/* Tell Prose to style this standard <p> tag using the 'lead' styles */}
      <p data-prose-type="lead">
        This paragraph is structurally a 'p' tag, but will be styled as a 'lead'
        paragraph because of the data-prose-type attribute. It will use the
        'lead' entry from proseStyles and proseSizes.
      </p>
      <p>This is a normal paragraph, styled as 'p'.</p>
      {/* Style a standard <code> tag using 'inline-code' styles */}
      Regular text with <code data-prose-type="inline-code">
        special code
      </code>{" "}
      styling.
    </Prose>
  )
}
