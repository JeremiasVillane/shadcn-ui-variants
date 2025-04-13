import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, InlineCode, P, Strong } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  ButtonExample1,
  ButtonExample2,
  ButtonExample3,
  ButtonExample4
} from "./examples"

export async function ButtonExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/button/examples/button-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        This is a highly versatile button component built upon Radix UI's{" "}
        <InlineCode>Slot</InlineCode>. It supports various visual styles, sizes,
        loading states, icons, icon animations, and a unique mechanism for
        creating segmented button groups using{" "}
        <InlineCode>LeftInsetButton</InlineCode> and
        <InlineCode>RightInsetButton</InlineCode> child components.
      </P>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "Split Button",
          code: example1Code,
          name: "button-example-1",
          Component: ButtonExample1
        },
        {
          id: "example2",
          title: "Compact Action Group",
          code: example2Code,
          name: "button-example-2",
          Component: ButtonExample2
        },
        {
          id: "example3",
          title: "Inset with `asChild`",
          code: example3Code,
          name: "button-example-3",
          Component: ButtonExample3
        },
        {
          id: "example4",
          title: "Double InsetButtons",
          code: example4Code,
          name: "button-example-4",
          Component: ButtonExample4
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

      <H2 id="Subcomponents">Subcomponents</H2>

      <H3 id="concept">Concept</H3>

      <P>
        <InlineCode>LeftInsetButton</InlineCode> and{" "}
        <InlineCode>RightInsetButton</InlineCode> are special marker components
        used as direct children of the main <InlineCode>Button</InlineCode>{" "}
        component. They are not rendered directly but signal to the parent{" "}
        <InlineCode>Button</InlineCode> to switch into a "button group"
        rendering mode. This mode creates a visually segmented button where the
        <InlineCode>LeftInsetButton</InlineCode> content appears in the left
        segment, <InlineCode>RightInsetButton</InlineCode>
        content in the right segment, and the regular{" "}
        <InlineCode>Button</InlineCode> children appear in the central segment.
      </P>

      <H3 id="how">How it Works</H3>

      <List spacing="loose">
        <ListItem>
          <Strong>Detection:</Strong> The parent <InlineCode>Button</InlineCode>{" "}
          checks its direct children. If it finds an instance of{" "}
          <InlineCode>LeftInsetButton</InlineCode> or
          <InlineCode>RightInsetButton</InlineCode>, it activates the group
          mode.
        </ListItem>
        <ListItem>
          <Strong>Structure:</Strong> Instead of rendering a single{" "}
          <InlineCode>{"<button>"}</InlineCode> (or{" "}
          <InlineCode>Slot</InlineCode>
          ), the parent <InlineCode>Button</InlineCode> renders a{" "}
          <InlineCode>div</InlineCode> wrapper with{" "}
          <InlineCode>role="group"</InlineCode> and flexbox styles (
          <InlineCode>inline-flex</InlineCode>,{" "}
          <InlineCode>items-stretch</InlineCode>). It also adds{" "}
          <InlineCode>divide-x</InlineCode> for visual separation between
          segments.
        </ListItem>
        <ListItem>
          <Strong>Segment Rendering:</Strong>
          <List variant="bullet-outline">
            <ListItem>
              If <InlineCode>LeftInsetButton</InlineCode> is present, its
              children and props are used to render the left segment (as a{" "}
              <InlineCode>{"<button>"}</InlineCode> or{" "}
              <InlineCode>Slot</InlineCode> if <InlineCode>asChild</InlineCode>{" "}
              is used on the inset).
            </ListItem>
            <ListItem>
              If <InlineCode>RightInsetButton</InlineCode> is present, its
              children and props are used to render the right segment.
            </ListItem>
            <ListItem>
              Any other direct children of the main{" "}
              <InlineCode>Button</InlineCode> become the content of the central
              segment, along with the main <InlineCode>Button</InlineCode>'s
              <InlineCode>iconLeft</InlineCode> and{" "}
              <InlineCode>iconRight</InlineCode> (if provided).
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Strong>Styling:</Strong> All segments inherit the{" "}
          <InlineCode>variant</InlineCode> and <InlineCode>size</InlineCode>
          from the parent <InlineCode>Button</InlineCode> for visual
          consistency. Appropriate <InlineCode>rounded-s-md</InlineCode>,{" "}
          <InlineCode>rounded-e-md</InlineCode>, or no rounding is applied based
          on the segment's position.
        </ListItem>
        <ListItem>
          <Strong>Props Application:</Strong>
          <List variant="bullet-outline">
            <ListItem>
              Props passed directly to <InlineCode>LeftInsetButton</InlineCode>{" "}
              or <InlineCode>RightInsetButton</InlineCode> (like
              <InlineCode>onClick</InlineCode>,{" "}
              <InlineCode>disabled</InlineCode>,{" "}
              <InlineCode>className</InlineCode>,{" "}
              <InlineCode>aria-label</InlineCode>,{" "}
              <InlineCode>asChild</InlineCode>) apply only to that specific
              segment.
            </ListItem>
            <ListItem>
              Props passed to the parent <InlineCode>Button</InlineCode> (like{" "}
              <InlineCode>onClick</InlineCode>,{" "}
              <InlineCode>isLoading</InlineCode>,
              <InlineCode>iconLeft</InlineCode>,{" "}
              <InlineCode>iconRight</InlineCode>,{" "}
              <InlineCode>disabled</InlineCode>) apply only to the central
              segment when in group mode. The <InlineCode>isLoading</InlineCode>{" "}
              state and icons of the parent
              <InlineCode>Button</InlineCode> do not affect the inset segments.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <H3 id="inset-props">Props for Inset Buttons</H3>
      <P>These components accept standard button attributes:</P>

      <List>
        <ListItem>
          <InlineCode>children</InlineCode>: Content for the inset segment
          (e.g., an icon, text).
        </ListItem>
        <ListItem>
          <InlineCode>onClick</InlineCode>: Handler specific to clicking this
          segment.
        </ListItem>
        <ListItem>
          <InlineCode>disabled</InlineCode>: Disables only this segment.
        </ListItem>
        <ListItem>
          <InlineCode>className</InlineCode>: Additional classes for this
          segment.
        </ListItem>
        <ListItem>
          <InlineCode>asChild</InlineCode>: Renders the segment as its child
          element (e.g., an <InlineCode>{"<a>"}</InlineCode> tag).
        </ListItem>
        <ListItem>
          <InlineCode>aria-label</InlineCode>, etc.: Accessibility and other
          standard attributes.
        </ListItem>
      </List>
    </>
  )
}
