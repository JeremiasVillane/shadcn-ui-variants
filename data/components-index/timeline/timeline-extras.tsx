import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { CodeBlock } from "@/components/ui/code-block"
import { List, ListItem } from "@/components/ui/list"
import {
  H2,
  H3,
  InlineCode,
  P,
  Small,
  Strong
} from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  TimelineExample1,
  TimelineExample2,
  TimelineExample3,
  TimelineExample4
} from "./examples"

const importCode = `import {
  Timeline,
  TimelineBody,
  TimelineConnectorLine,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineNode,
  TimelineProps,
  TimelineSeparator
} from "@/components/ui/timeline"`

const implementationCode = `<Timeline>
  <TimelineItem>
    <TimelineSeparator>
      <TimelineNode />
      <TimelineConnectorLine />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineHeader>Event 1</TimelineHeader>
      <TimelineBody>First Event</TimelineBody>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineSeparator>
      <TimelineNode />
      <TimelineConnectorLine />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineHeader>Event 2</TimelineHeader>
      <TimelineBody>Second Event</TimelineBody>
    </TimelineContent>
  </TimelineItem>
</Timeline>`

export async function TimelineExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/timeline/examples/timeline-example-${num}.tsx`
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
          title: "Default layout (right) with custom styles",
          code: example1Code,
          name: "timeline-example-1",
          Component: TimelineExample1
        },
        {
          id: "example2",
          title: "Left layout",
          code: example2Code,
          name: "timeline-example-2",
          Component: TimelineExample2
        },
        {
          id: "example3",
          title: "Alternate layout with icons and opposite content",
          code: example3Code,
          name: "timeline-example-3",
          Component: TimelineExample3
        },
        {
          id: "example4",
          title: "Complex body content and custom node",
          code: example4Code,
          name: "timeline-example-4",
          Component: TimelineExample4
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

      <H2 id="anatomy" className="mt-6">
        Component Anatomy
      </H2>

      <P>
        The Timeline component utilizes a compound component pattern, allowing
        for flexible composition. Here's a breakdown of its parts:
      </P>

      <List
        variant="none"
        className="space-y-6 [&>li:last-child]:border-0 [&>li:last-child]:pb-0 [&>li]:space-y-1.5 [&>li]:border-b [&>li]:border-dashed [&>li]:pb-6"
      >
        <ListItem>
          <CodeBlock
            language="tsx"
            code="<Timeline />"
            className="border pb-3"
          />

          <P>
            The main wrapper (<InlineCode>{`<ol>`}</InlineCode>) component. It
            houses all timeline items and controls the overall layout via the{" "}
            <InlineCode>position</InlineCode> prop (<Small>"left"</Small>,{" "}
            <Small>"right" (default)</Small>, <Small>"alternate"</Small>,{" "}
            <Small>"reverse-alternate"</Small>).
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineItem />"
            className="border pb-3"
          />

          <P>
            Represents a single entry in the timeline. It should contain the
            necessary parts like <InlineCode>TimelineContent</InlineCode> and{" "}
            <InlineCode>TimelineSeparator</InlineCode>. The visual order of its
            children depends on the <InlineCode>position</InlineCode> prop of
            the parent <InlineCode>Timeline</InlineCode>.
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineContent />"
            className="border pb-3"
          />

          <P>
            The primary container (<InlineCode>{`<div>`}</InlineCode>) for the
            descriptive content associated with a timeline item. It typically
            holds <InlineCode>TimelineHeader</InlineCode> and{" "}
            <InlineCode>TimelineBody</InlineCode>. For default layout (
            <Small>position="right"</Small>), place this <Strong>before</Strong>{" "}
            <InlineCode>TimelineSeparator</InlineCode> in your JSX. For{" "}
            <Small>position="left"</Small>, place it <Strong>after</Strong>.
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineHeader />"
            className="border pb-3"
          />

          <P>
            A semantic heading (<InlineCode>{`<h3>`}</InlineCode>) for the
            timeline event, placed inside{" "}
            <InlineCode>TimelineContent</InlineCode>.
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineBody />"
            className="border pb-3"
          />

          <P>
            The main container (<InlineCode>{`<div>`}</InlineCode>) for the
            body/details of the event. It can contain complex JSX structures,
            lists, code blocks, etc. Placed inside{" "}
            <InlineCode>TimelineContent</InlineCode>.
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineSeparator />"
            className="border pb-3"
          />

          <P>
            A container (<InlineCode>{`<div>`}</InlineCode>) that visually
            separates timeline items or aligns the node/line. It holds the{" "}
            <InlineCode>TimelineNode</InlineCode> and{" "}
            <InlineCode>TimelineConnectorLine</InlineCode>. Its placement
            relative to <InlineCode>TimelineContent</InlineCode> in the JSX
            determines the visual layout based on the{" "}
            <InlineCode>position</InlineCode> prop.
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineNode />"
            className="border pb-3"
          />

          <P>
            The visual marker (<InlineCode>{`<div>`}</InlineCode>) for the event
            point (e.g., a dot, icon). It's placed inside{" "}
            <InlineCode>TimelineSeparator</InlineCode> and can optionally
            contain children (like step numbers).
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineConnectorLine />"
            className="border pb-3"
          />

          <P>
            The vertical line (<InlineCode>{`<span>`}</InlineCode>) connecting
            different <InlineCode>TimelineNode</InlineCode>s. Placed inside{" "}
            <InlineCode>TimelineSeparator</InlineCode>. It should typically be
            omitted for the final <InlineCode>TimelineItem</InlineCode> in the
            list.
          </P>
        </ListItem>

        <ListItem>
          <CodeBlock
            language="tsx"
            code="<TimelineOppositeContent />"
            className="border pb-3"
          />

          <P>
            An optional container (<InlineCode>{`<div>`}</InlineCode>) used to
            add spacing on the side opposite the main content. It's primarily
            useful when using <Small>position="alternate"</Small> or{" "}
            <Small>position="reverse-alternate"</Small> to maintain consistent
            alignment.
          </P>
        </ListItem>
      </List>
    </>
  )
}
