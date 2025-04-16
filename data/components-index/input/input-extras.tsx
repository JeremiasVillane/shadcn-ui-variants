import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { H2, H3 } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import { InputExample1, InputExample2, InputExample3 } from "./examples"

export async function InputExtras() {
  const [example1Code, example2Code, example3Code] = await Promise.all(
    [1, 2, 3].map((num) =>
      getFileContent(
        `data/components-index/input/examples/input-example-${num}.tsx`
      )
    )
  )

  return (
    <>
      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "With startInline and endInline",
          code: example1Code,
          name: "input-example-1",
          Component: InputExample1
        },
        {
          id: "example2",
          title: "With startAddon and endIcon",
          code: example2Code,
          name: "input-example-2",
          Component: InputExample2
        },
        {
          id: "example3",
          title: "Dynamic Input (loading icon, clear button, showLength)",
          code: example3Code,
          name: "input-example-3",
          Component: InputExample3
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
