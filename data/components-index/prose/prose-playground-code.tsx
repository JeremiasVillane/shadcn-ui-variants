"use client"

import { ProseProps } from "@/components/ui/prose"

export const prosePlaygroundCode = ({ scale }: ProseProps) => {
  const code = `import { InlineCode, Prose } from "@/components/ui/prose"

export function ProsePlayground() {
  return (
    <Prose${scale !== "default" ? ` scale="${scale}"` : ""} className="container">
      <h1>Article Title</h1>
      <p>
        This is the first paragraph of the article. It will be styled
        automatically with default prose styles. You can add more paragraphs,
        headings, and other elements, and they will inherit the default styles.
      </p>
      <h2>Subsection Header</h2>
      <p>Another paragraph with more details.</p>
      <blockquote>
        This is a blockquote, which will also receive default prose styling.
      </blockquote>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <pre>
        <code>{\`function greet() { console.log("Hello!"); }\`}</code>
      </pre>
      <p>
        You can include <InlineCode>inline code</InlineCode> as well.
      </p>
    </Prose>
  )
}`

  return code
}
