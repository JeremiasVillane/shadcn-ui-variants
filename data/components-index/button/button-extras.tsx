import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { Separator } from "@/components/ui/separator"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import {
  Paragraph,
  SubHeading,
  SubHeadingSmall,
  WordBadge
} from "@/components/typography"

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
    <div className="flex flex-col gap-9">
      <section className="space-y-4">
        <SubHeading id="overview">Overview</SubHeading>

        <Paragraph>
          This is a highly versatile button component built upon Radix UI's{" "}
          <WordBadge>Slot</WordBadge>. It supports various visual styles, sizes,
          loading states, icons, icon animations, and a unique mechanism for
          creating segmented button groups using{" "}
          <WordBadge>LeftInsetButton</WordBadge> and
          <WordBadge>RightInsetButton</WordBadge> child components.
        </Paragraph>
      </section>

      <Separator />

      <section className="space-y-4">
        <SubHeading id="examples">Examples</SubHeading>
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

      <Separator />

      <section className="space-y-4">
        <SubHeading id="Subcomponents">Subcomponents</SubHeading>
        <SubHeadingSmall id="concept">Concept</SubHeadingSmall>

        <Paragraph>
          <WordBadge>LeftInsetButton</WordBadge> and{" "}
          <WordBadge>RightInsetButton</WordBadge> are special marker components
          used as direct children of the main <WordBadge>Button</WordBadge>{" "}
          component. They are not rendered directly but signal to the parent{" "}
          <WordBadge>Button</WordBadge> to switch into a "button group"
          rendering mode. This mode creates a visually segmented button where
          the
          <WordBadge>LeftInsetButton</WordBadge> content appears in the left
          segment, <WordBadge>RightInsetButton</WordBadge>
          content in the right segment, and the regular{" "}
          <WordBadge>Button</WordBadge> children appear in the central segment.
        </Paragraph>

        <SubHeadingSmall id="how">How it Works</SubHeadingSmall>

        <List spacing="loose">
          <ListItem>
            <strong>Detection:</strong> The parent <WordBadge>Button</WordBadge>{" "}
            checks its direct children. If it finds an instance of{" "}
            <WordBadge>LeftInsetButton</WordBadge> or
            <WordBadge>RightInsetButton</WordBadge>, it activates the group
            mode.
          </ListItem>
          <ListItem>
            <strong>Structure:</strong> Instead of rendering a single{" "}
            <WordBadge>{"<button>"}</WordBadge> (or <WordBadge>Slot</WordBadge>
            ), the parent <WordBadge>Button</WordBadge> renders a{" "}
            <WordBadge>div</WordBadge> wrapper with{" "}
            <WordBadge>role="group"</WordBadge> and flexbox styles (
            <WordBadge>inline-flex</WordBadge>,{" "}
            <WordBadge>items-stretch</WordBadge>). It also adds{" "}
            <WordBadge>divide-x</WordBadge> for visual separation between
            segments.
          </ListItem>
          <ListItem>
            <strong>Segment Rendering:</strong>
            <List variant="bullet-outline">
              <ListItem>
                If <WordBadge>LeftInsetButton</WordBadge> is present, its
                children and props are used to render the left segment (as a{" "}
                <WordBadge>{"<button>"}</WordBadge> or{" "}
                <WordBadge>Slot</WordBadge> if <WordBadge>asChild</WordBadge> is
                used on the inset).
              </ListItem>
              <ListItem>
                If <WordBadge>RightInsetButton</WordBadge> is present, its
                children and props are used to render the right segment.
              </ListItem>
              <ListItem>
                Any other direct children of the main{" "}
                <WordBadge>Button</WordBadge> become the content of the central
                segment, along with the main <WordBadge>Button</WordBadge>'s
                <WordBadge>iconLeft</WordBadge> and{" "}
                <WordBadge>iconRight</WordBadge> (if provided).
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <strong>Styling:</strong> All segments inherit the{" "}
            <WordBadge>variant</WordBadge> and <WordBadge>size</WordBadge>
            from the parent <WordBadge>Button</WordBadge> for visual
            consistency. Appropriate <WordBadge>rounded-s-md</WordBadge>,{" "}
            <WordBadge>rounded-e-md</WordBadge>, or no rounding is applied based
            on the segment's position.
          </ListItem>
          <ListItem>
            <strong>Props Application:</strong>
            <List variant="bullet-outline">
              <ListItem>
                Props passed directly to <WordBadge>LeftInsetButton</WordBadge>{" "}
                or <WordBadge>RightInsetButton</WordBadge> (like
                <WordBadge>onClick</WordBadge>, <WordBadge>disabled</WordBadge>,{" "}
                <WordBadge>className</WordBadge>,{" "}
                <WordBadge>aria-label</WordBadge>,{" "}
                <WordBadge>asChild</WordBadge>) apply only to that specific
                segment.
              </ListItem>
              <ListItem>
                Props passed to the parent <WordBadge>Button</WordBadge> (like{" "}
                <WordBadge>onClick</WordBadge>, <WordBadge>isLoading</WordBadge>
                ,<WordBadge>iconLeft</WordBadge>,{" "}
                <WordBadge>iconRight</WordBadge>,{" "}
                <WordBadge>disabled</WordBadge>) apply only to the central
                segment when in group mode. The <WordBadge>isLoading</WordBadge>{" "}
                state and icons of the parent
                <WordBadge>Button</WordBadge> do not affect the inset segments.
              </ListItem>
            </List>
          </ListItem>
        </List>

        <div className="space-y-2">
          <SubHeadingSmall id="inset-props">
            Props for Inset Buttons
          </SubHeadingSmall>
          <p>These components accept standard button attributes:</p>
        </div>

        <List>
          <ListItem>
            <WordBadge>children</WordBadge>: Content for the inset segment
            (e.g., an icon, text).
          </ListItem>
          <ListItem>
            <WordBadge>onClick</WordBadge>: Handler specific to clicking this
            segment.
          </ListItem>
          <ListItem>
            <WordBadge>disabled</WordBadge>: Disables only this segment.
          </ListItem>
          <ListItem>
            <WordBadge>className</WordBadge>: Additional classes for this
            segment.
          </ListItem>
          <ListItem>
            <WordBadge>asChild</WordBadge>: Renders the segment as its child
            element (e.g., an <WordBadge>{"<a>"}</WordBadge> tag).
          </ListItem>
          <ListItem>
            <WordBadge>aria-label</WordBadge>, etc.: Accessibility and other
            standard attributes.
          </ListItem>
        </List>
      </section>
    </div>
  )
}
