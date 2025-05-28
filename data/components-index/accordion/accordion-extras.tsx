import React from "react"

import { getFileContent } from "@/lib/file-utils"
import { H2, H3, InlineCode, Muted, P } from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import {
  AccordionExample1,
  AccordionExample2,
  AccordionExample3,
  AccordionExample4,
  AccordionExample5
} from "./examples"

const importCode = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTrigger,
} from "@/components/ui/accordion"`
const implementationCode = `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>
      <AccordionTitle>Title 1</AccordionTitle>
    </AccordionTrigger>
    <AccordionContent>
      Content 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>
      <AccordionTitle>Title 2</AccordionTitle>
    </AccordionTrigger>
    <AccordionContent>
      Content 2
    </AccordionContent>
  </AccordionItem>
</Accordion>`

export async function AccordionExtras() {
  const [example1Code, example2Code, example3Code, example4Code, example5Code] =
    await Promise.all(
      [1, 2, 3, 4, 5].map((num) =>
        getFileContent(
          `data/components-index/accordion/examples/accordion-example-${num}.tsx`
        )
      )
    )

  return (
    <>
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
          title: "Product Features (Separated & Plus/Minus Icon)",
          description: (
            <>
              Use the <InlineCode>separated</InlineCode> variant with the{" "}
              <InlineCode>fill</InlineCode> style for a visually distinct look,
              perfect for highlighting key product features. This example also
              uses the <InlineCode>plus-minus</InlineCode> trigger icon.
            </>
          ),
          code: example1Code,
          name: "accordion-example-1",
          Component: AccordionExample1
        },
        {
          id: "example2",
          title: "Settings Panel (Contained & Left Trigger)",
          description: (
            <>
              The <InlineCode>contained</InlineCode> variant is ideal for
              grouping related settings. This example shows a{" "}
              <InlineCode>fill</InlineCode> style and moves the{" "}
              <InlineCode>chevron</InlineCode> trigger to the{" "}
              <InlineCode>left</InlineCode>.
            </>
          ),
          code: example2Code,
          name: "accordion-example-2",
          Component: AccordionExample2
        },
        {
          id: "example3",
          title: "Interactive Tutorial Steps (Tabs Style)",
          description: (
            <>
              The <InlineCode>tabs</InlineCode> variant can create a
              step-by-step guide or a tab-like interface where only one item is
              prominently displayed when open. This example uses{" "}
              <InlineCode>styleVariant="outline"</InlineCode>.
            </>
          ),
          footer: (
            <>
              The <InlineCode>tabs</InlineCode> variant can create a
              step-by-step guide or a tab-like interface where only one item is
              prominently displayed when open. This example uses{" "}
              <InlineCode>styleVariant="outline"</InlineCode>.
            </>
          ),
          code: example3Code,
          name: "accordion-example-3",
          Component: AccordionExample3
        },
        {
          id: "example4",
          title: "Multi-Select Filters (Multiple Open)",
          description: (
            <>
              This example showcases the <InlineCode>multiple</InlineCode> type,
              which lets several sections remain open simultaneously —ideal for
              filter menus.
            </>
          ),
          code: example4Code,
          name: "accordion-example-4",
          Component: AccordionExample4
        },
        {
          id: "example5",
          title: (
            <>
              Always Open Section (Using{" "}
              <InlineCode scale="lg" className="text-xl">
                {"collapsible={false}"}
              </InlineCode>
              )
            </>
          ),
          description: (
            <>
              If you need a section that is always open by default and cannot be
              closed by the user, you can set{" "}
              <InlineCode>{"collapsible={false}"}</InlineCode> on the{" "}
              <InlineCode>AccordionTrigger</InlineCode> component. If only one
              specific item should always be open, you should also set the{" "}
              <InlineCode>defaultValue</InlineCode> to the value of that item.
            </>
          ),
          footer: (
            <>
              <InlineCode>{"collapsible={false}"}</InlineCode> on the root means
              no items can be collapsed once opened if{" "}
              <InlineCode>type="single"</InlineCode>.
            </>
          ),
          code: example5Code,
          name: "accordion-example-5",
          Component: AccordionExample5
        }
      ].map((example) => (
        <React.Fragment key={example.id}>
          <H3 id={example.id}>{example.title}</H3>
          {<P>{example.description}</P>}
          <ComponentTabs
            code={example.code}
            name={example.name}
            Component={example.Component}
          />
          {!!example.footer && (
            <Muted className="ml-4 mt-0">{example.footer}</Muted>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
