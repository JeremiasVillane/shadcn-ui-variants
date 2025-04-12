import { getFileContent } from "@/lib/file-utils"
import { CodeBlock } from "@/components/ui/code-block"
import { Separator } from "@/components/ui/separator"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import {
  Paragraph,
  SubHeading,
  SubHeadingSmall,
  WordBadge
} from "@/components/typography"

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
    <div className="flex flex-col gap-9">
      <section className="space-y-4">
        <SubHeading id="overview">Overview</SubHeading>

        <Paragraph>
          This component provides a flexible and stylish way to render ordered (
          <WordBadge>{"<ol>"}</WordBadge>) and unordered (
          <WordBadge>{"<ul>"}</WordBadge>) lists in React, with support for
          different bullet styles, spacing and custom icons.
        </Paragraph>
      </section>

      <Separator />

      <section className="space-y-4">
        <SubHeading id="usage">Basic Usage</SubHeading>

        <div className="space-y-6 pb-3 pt-4">
          {[importCode, implementationCode].map((code, index) => (
            <article key={index} className="relative">
              <CodeBlock className="border pb-3" language="tsx" code={code} />
              <div className="absolute right-2 top-2 flex">
                <CopyToClipboardButton content={code} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <SubHeading id="examples">Examples</SubHeading>

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
            code: example4Code,
            name: "list-example-5",
            Component: ListExample5
          }
        ].map((example) => (
          <article key={example.id} className="space-y-2">
            <SubHeadingSmall id={example.id}>{example.title}</SubHeadingSmall>
            <ComponentTabs
              code={example.code}
              name={example.name}
              Component={example.Component}
            />
          </article>
        ))}
      </section>
    </div>
  )
}
