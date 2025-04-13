import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { CodeBlock } from "@/components/ui/code-block"
import { H2, H3, InlineCode, P } from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  ListExample1,
  ListExample2,
  ListExample3,
  ListExample4,
  ListExample5
} from "./examples"

const importCode = `import { List, ListItem } from "@/components/ui/list";`
const implementationCode = `<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</List>`

export async function ListExtras() {
  const [example1Code, example2Code, example3Code, example4Code, example5Code] =
    await Promise.all(
      [1, 2, 3, 4, 5].map((num) =>
        getFileContent(
          `data/components-index/list/examples/list-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        This component provides a flexible and stylish way to render ordered (
        <InlineCode>{"<ol>"}</InlineCode>) and unordered (
        <InlineCode>{"<ul>"}</InlineCode>) lists in React, with support for
        different bullet styles, spacing and custom icons.
      </P>

      <H2 id="usage">Basic Usage</H2>

      <div className="space-y-6 pb-1 pt-4">
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
          title: "Nested Lists with different variants",
          code: example1Code,
          name: "list-example-1",
          Component: ListExample1
        },
        {
          id: "example2",
          title: "Nested lists with icons",
          code: example2Code,
          name: "list-example-2",
          Component: ListExample2
        },
        {
          id: "example3",
          title: "Interactive to-do list",
          code: example3Code,
          name: "list-example-3",
          Component: ListExample3
        },
        {
          id: "example4",
          title: "Custom icon and styles",
          code: example4Code,
          name: "list-example-4",
          Component: ListExample4
        },
        {
          id: "example5",
          title: "Different variants and custom styles",
          code: example5Code,
          name: "list-example-5",
          Component: ListExample5
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
