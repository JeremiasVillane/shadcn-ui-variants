import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, P, Strong } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import {
  BubbleMenuExample1,
  BubbleMenuExample2,
  BubbleMenuExample3
} from "./examples"

export async function BubbleMenuExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3].map((num) =>
        getFileContent(
          `data/components-index/bubble-menu/examples/bubble-menu-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        A circular menu that expands with child elements positioned around a
        central button, inspired by material design principles. Perfect for
        contextual actions, tool palettes, or navigation menus.
      </P>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "Actions Menu",
          code: example1Code,
          name: "bubble-menu-example-1",
          Component: BubbleMenuExample1
        },
        {
          id: "example2",
          title: "Creative Tools Palette",
          code: example2Code,
          name: "bubble-menu-example-2",
          Component: BubbleMenuExample2
        },
        {
          id: "example3",
          title: "Navigation Wheel",
          code: example3Code,
          name: "bubble-menu-example-3",
          Component: BubbleMenuExample3
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

      <H2 id="features">Features</H2>

      <List>
        <ListItem>Smooth staggered animations</ListItem>
        <ListItem>Auto-closes when clicking outside</ListItem>
        <ListItem>Responsive hover states</ListItem>
        <ListItem>Dark/light mode compatible</ListItem>
        <ListItem>Fully customizable positioning</ListItem>
      </List>

      <H2 id="styling">Styling Tips</H2>

      <List variant="numbered" spacing="loose">
        <ListItem>
          <P>
            <Strong>For better visibility:</Strong> You can add a border to
            child buttons:
          </P>
          <CodeBlock
            language="tsx"
            code={`<button className="size-full border-2 border-background ...">`}
            className="pb-3.5"
          />
        </ListItem>

        <ListItem>
          <P>
            <Strong>For tooltips:</Strong> Wrap child buttons with Tooltip
            component:
          </P>
          <CodeBlock
            language="tsx"
            code={`<Tooltip content="Delete">
  <button>...</button>
</Tooltip>`}
            className="pb-3"
          />
        </ListItem>

        <ListItem>
          <P>
            <Strong>For groups:</Strong> Use multiple BubbleMenus with different
            positions:
          </P>
          <CodeBlock
            language="tsx"
            code={`<BubbleMenu className="top-4 left-4">...</BubbleMenu>
<BubbleMenu className="top-4 right-4">...</BubbleMenu>`}
            className="pb-3.5"
          />
        </ListItem>
      </List>
    </>
  )
}
