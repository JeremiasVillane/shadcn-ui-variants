import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { H2, H3 } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import { SliderExample1, SliderExample2 } from "./examples"

export async function SliderExtras() {
  const [example1Code, example2Code] = await Promise.all(
    [1, 2].map((num) =>
      getFileContent(
        `data/components-index/slider/examples/slider-example-${num}.tsx`
      )
    )
  )

  return (
    <>
      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "With labels and tooltip",
          code: example1Code,
          name: "slider-example-1",
          Component: SliderExample1
        },
        {
          id: "example2",
          title: "With ticks and input",
          code: example2Code,
          name: "slider-example-2",
          Component: SliderExample2
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
