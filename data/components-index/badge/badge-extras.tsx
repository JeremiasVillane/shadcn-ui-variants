import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { H2, H3 } from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import {
  BadgeExample1,
  BadgeExample2,
  BadgeExample3,
  BadgeExample4
} from "./examples"

const importCode = `import { Badge } from "@/components/ui/badge"`
const implementationCode = "<Badge>Example</Badge>"

export async function BadgeExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/badge/examples/badge-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="usage">Basic Usage</H2>

      <div className="mt-6 space-y-6">
        {[importCode, implementationCode].map((code, index) => (
          <article key={index} className="relative">
            <CodeBlock className="border pb-3" language="tsx" code={code} />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={code} />
            </div>
          </article>
        ))}
      </div>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "With Icons",
          code: example1Code,
          name: "badge-example-1",
          Component: BadgeExample1
        },
        {
          id: "example2",
          title: "Interactive Badges",
          code: example2Code,
          name: "badge-example-2",
          Component: BadgeExample2
        },
        {
          id: "example3",
          title: "Notification Badges",
          code: example3Code,
          name: "badge-example-3",
          Component: BadgeExample3
        },
        {
          id: "example4",
          title: "Custom Styling",
          code: example4Code,
          name: "badge-example-4",
          Component: BadgeExample4
        }
      ].map((example) => (
        <React.Fragment key={example.id}>
          <H3 id={example.id}>{example.title}</H3>
          <ComponentTabs
            code={example.code}
            name={example.name}
            Component={example.Component}
          />
        </React.Fragment>
      ))}
    </>
  )
}
