import React from "react"

import { getFileContent } from "@/lib/file-utils"
import { H2, H3, P } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  KineticExample1,
  KineticExample2,
  KineticExample3,
  KineticExample4
} from "./examples"

export async function KineticExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/kinetic/examples/kinetic-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        This component provides a declarative way to add animations to any
        content. It supports viewport-based animations, scroll-triggered
        animations, and various predefined animation variants.
      </P>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "Basic fade in animation",
          code: example1Code,
          name: "kinetic-example-1",
          withReload: true,
          Component: KineticExample1
        },
        {
          id: "example2",
          title: "Animate when entering viewport",
          code: example2Code,
          name: "kinetic-example-2",
          Component: KineticExample2
        },
        {
          id: "example3",
          title: "Scroll-based animation",
          code: example3Code,
          name: "kinetic-example-3",
          Component: KineticExample3
        },
        {
          id: "example4",
          title: "Custom animation with loop",
          code: example4Code,
          name: "kinetic-example-4",
          Component: KineticExample4
        }
      ].map((example) => (
        <React.Fragment key={example.id}>
          <H3 id={example.id}>{example.title}</H3>
          <ComponentTabs
            code={example.code}
            name={example.name}
            withReload={Boolean(example?.withReload)}
            Component={example.Component}
          />
        </React.Fragment>
      ))}
    </>
  )
}
