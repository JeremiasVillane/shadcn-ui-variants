import { getFileContent } from "@/lib/file-utils"
import { CodeBlock } from "@/components/ui/code-block"
import { Separator } from "@/components/ui/separator"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import {
  DescriptionTextSmall,
  SubHeading,
  SubHeadingSmall
} from "@/components/typography"

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
    <div className="flex flex-col gap-9">
      <section className="space-y-4">
        <header>
          <SubHeading id="usage">Basic Usage</SubHeading>
        </header>

        <div className="space-y-6 pb-3 pt-4">
          <article className="relative">
            <CodeBlock
              className="border pb-3"
              language="tsx"
              code={importCode}
            />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={importCode} />
            </div>
          </article>

          <article className="relative">
            <CodeBlock
              className="border pb-3"
              language="tsx"
              code={implementationCode}
            />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={implementationCode} />
            </div>
          </article>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <header className="space-y-1">
          <SubHeading id="anatomy">Component Anatomy</SubHeading>
          <DescriptionTextSmall>
            The Timeline component utilizes a compound component pattern,
            allowing for flexible composition. Here's a breakdown of its parts:
          </DescriptionTextSmall>
        </header>
        <ul className="space-y-5 rounded-md border p-6">
          <li className="space-y-1.5">
            <code className="font-semibold">{"<Timeline />"}</code>
            <DescriptionTextSmall>
              The main wrapper (`{`<ol>`}`) component. It houses all timeline
              items and controls the overall layout via the{" "}
              <code className="text-sm text-foreground/80">position</code> prop
              (`'left'`, `'right'` (default), `'alternate'`,
              `'reverse-alternate'`).
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineItem />"}</code>
            <DescriptionTextSmall>
              Represents a single entry (`{`<li>`}`) in the timeline. It should
              contain the necessary parts like{" "}
              <code className="text-sm text-foreground/80">
                TimelineContent
              </code>{" "}
              and{" "}
              <code className="text-sm text-foreground/80">
                TimelineSeparator
              </code>
              . The visual order of its children depends on the{" "}
              <code className="text-sm text-foreground/80">position</code> prop
              of the parent{" "}
              <code className="text-sm text-foreground/80">Timeline</code>.
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineContent />"}</code>
            <DescriptionTextSmall>
              The primary container (`{`<div>`}`) for the descriptive content
              associated with a timeline item. It typically holds{" "}
              <code className="text-sm text-foreground/80">TimelineHeader</code>{" "}
              and{" "}
              <code className="text-sm text-foreground/80">TimelineBody</code>.
              For default layout (`position="right"`), place this *before*{" "}
              <code className="text-sm text-foreground/80">
                TimelineSeparator
              </code>{" "}
              in your JSX. For `position="left"`, place it *after*.
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineHeader />"}</code>
            <DescriptionTextSmall>
              A semantic heading (`{`<h3>`}`) for the timeline event, placed
              inside{" "}
              <code className="text-sm text-foreground/80">
                TimelineContent
              </code>
              .
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineBody />"}</code>
            <DescriptionTextSmall>
              The main container (`{`<div>`}`) for the body/details of the
              event. It can contain complex JSX structures, lists, code blocks,
              etc. Placed inside{" "}
              <code className="text-sm text-foreground/80">
                TimelineContent
              </code>
              .
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineSeparator />"}</code>
            <DescriptionTextSmall>
              A container (`{`<div>`}`) that visually separates timeline items
              or aligns the node/line. It holds the{" "}
              <code className="text-sm text-foreground/80">TimelineNode</code>{" "}
              and{" "}
              <code className="text-sm text-foreground/80">
                TimelineConnectorLine
              </code>
              . Its placement relative to{" "}
              <code className="text-sm text-foreground/80">
                TimelineContent
              </code>{" "}
              in the JSX determines the visual layout based on the{" "}
              <code className="text-sm text-foreground/80">position</code> prop.
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineNode />"}</code>
            <DescriptionTextSmall>
              The visual marker (`{`<div>`}`) for the event point (e.g., a dot,
              icon). It's placed inside{" "}
              <code className="text-sm text-foreground/80">
                TimelineSeparator
              </code>{" "}
              and can optionally contain children (like step numbers).
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">{"<TimelineConnectorLine />"}</code>
            <DescriptionTextSmall>
              The vertical line (`{`<span>`}`) connecting different{" "}
              <code className="text-sm text-foreground/80">TimelineNode</code>s.
              Placed inside{" "}
              <code className="text-sm text-foreground/80">
                TimelineSeparator
              </code>
              . It should typically be omitted for the final{" "}
              <code className="text-sm text-foreground/80">TimelineItem</code>{" "}
              in the list.
            </DescriptionTextSmall>
          </li>
          <li className="space-y-1.5">
            <code className="font-semibold">
              {"<TimelineOppositeContent />"}
            </code>
            <DescriptionTextSmall>
              An optional container (`{`<div>`}`) used to add spacing on the
              side opposite the main content. It's primarily useful when using{" "}
              <code className="text-sm text-foreground/80">
                position="alternate"
              </code>{" "}
              or{" "}
              <code className="text-sm text-foreground/80">
                position="reverse-alternate"
              </code>{" "}
              to maintain consistent alignment.
            </DescriptionTextSmall>
          </li>
        </ul>
      </section>

      <Separator />

      <section className="space-y-6">
        <header>
          <SubHeading id="examples">Examples</SubHeading>
        </header>
        {[
          {
            id: "example1",
            title: "Default layout (right) with custom styles",
            code: example1Code,
            name: "timeline-example1",
            Component: TimelineExample1
          },
          {
            id: "example2",
            title: "Left layout",
            code: example2Code,
            name: "timeline-example2",
            Component: TimelineExample2
          },
          {
            id: "example3",
            title: "Alternate layout with icons and opposite content",
            code: example3Code,
            name: "timeline-example3",
            Component: TimelineExample3
          },
          {
            id: "example4",
            title: "Complex body content and custom node",
            code: example4Code,
            name: "timeline-example4",
            Component: TimelineExample4
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
