import React from "react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { Code, H2, H3, InlineCode, P, Strong } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import {
  FlexTableExample1,
  FlexTableExample2,
  FlexTableExample3,
  FlexTableExample4,
  FlexTableExample5,
  FlexTableExample6,
  FlexTableExample7
} from "./examples"

export async function FlexTableExtras() {
  const [
    example1Code,
    example2Code,
    example3Code,
    example4Code,
    example5Code,
    example6Code,
    example7Code
  ] = await Promise.all(
    [1, 2, 3, 4, 5, 6, 7].map((num) =>
      getFileContent(
        `data/components-index/flex-table/examples/flex-table-example-${num}.tsx`
      )
    )
  )

  return (
    <>
      <H2 id="overview">Overview</H2>
      <P>
        A flexible, orientation-aware, accessible pseudo-table built with{" "}
        <InlineCode>div</InlineCode>'s and modern layout primitives. Supports
        vertical (standard) and horizontal (rotated) orientations, customizable
        formatting, and graceful empty states.
      </P>
      <H2 id="features">Features</H2>
      <List variant="none">
        <ListItem icon={"✅"}>
          <Strong>Flexible orientation:</Strong> Vertical or horizontal layout.
        </ListItem>
        <ListItem icon={"📐"}>
          <Strong>Responsive layout:</Strong> Uses <InlineCode>grid</InlineCode>{" "}
          under the hood.
        </ListItem>
        <ListItem icon={"🎨"}>
          <Strong>Fully styleable:</Strong> Custom class names for headers,
          cells, and container.
        </ListItem>
        <ListItem icon={"🔄"}>
          <Strong>Formatter support:</Strong> Format individual cell content
          dynamically.
        </ListItem>
        <ListItem icon={"🧩"}>
          <Strong>Composable variants:</Strong> Includes{" "}
          <InlineCode>RowTable</InlineCode> and{" "}
          <InlineCode>ColumnTable</InlineCode> wrappers.
        </ListItem>
        <ListItem icon={"💬"}>
          <Strong>Empty state handling:</Strong> Customize fallback for empty
          data.
        </ListItem>
        <ListItem icon={"🔁"}>
          <Strong>Sortable columns:</Strong> Enable by passing{" "}
          <InlineCode>sortable</InlineCode>; click headers to toggle asc ↔ desc
          ↔ none.
        </ListItem>
        <ListItem icon={"🔍"}>
          <Strong>Filtering:</Strong> Provide a{" "}
          <InlineCode>filterBy</InlineCode> function to include/exclude rows
          before rendering.
        </ListItem>
      </List>

      <H2 id="use-cases">Use Cases</H2>

      <List>
        <ListItem>
          Rendering dynamic tabular data where layout needs to adapt.
        </ListItem>
        <ListItem>Building matrix-style inputs or dashboards.</ListItem>
        <ListItem>
          Displaying rotated column-based data (e.g. for mobile).
        </ListItem>
        <ListItem>
          Styling table-like data with Tailwind or design tokens, without using{" "}
          <InlineCode>{"<table>"}</InlineCode> tags.
        </ListItem>
      </List>

      <H2 id="basic-usage">Basic Usage</H2>

      <CodeBlock
        language="tsx"
        filename="flex-table-basic.tsx"
        className="border pb-3"
        code={`import { FlexTable } from "@/components/ui/flex-table"

const data = [
  { Name: "John", Age: 25 },
  { Name: "Jane", Age: 32 },
  { Name: "Charles", Age: 41 },
];

export default function FlexTableBasic() {
  return (<FlexTable data={data} />)
}`}
      />

      <H2 id="advanced">Advanced</H2>

      <H3 id="sorting">Sorting</H3>

      <P>
        Enable by passing <InlineCode>sortable</InlineCode>:
      </P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<FlexTable
  data={data}
  sortable
/>`}
      />

      <List variant="bullet-outline">
        <ListItem>
          Click on a header to sort ascending, click again for descending, and a
          third time to clear sort.
        </ListItem>
      </List>

      <H3 id="filtering">Filtering</H3>

      <P>
        Provide a <InlineCode>filterBy</InlineCode> function to prune rows
        before display:
      </P>

      <CodeBlock
        language="tsx"
        code={`<FlexTable
  data={data}
  filterBy={(row) => row.status === "active"}
/>`}
        className="pb-4"
      />

      <List variant="bullet-outline">
        <ListItem>
          Rows where <InlineCode>filterBy</InlineCode> returns{" "}
          <InlineCode>false</InlineCode> are excluded from the table entirely.
        </ListItem>
      </List>

      <H3 id="formatting">Formatting</H3>

      <P>
        Use the <InlineCode>formatter</InlineCode> prop to transform cell values
        dynamically. This is useful also for applying custom logic to individual
        cells.
      </P>

      <CodeBlock
        language="tsx"
        code={`<FlexTable
  data={data}
  formatter={(val, _, key) =>
    key === "date"
  ? new Date(val).toLocaleDateString()
  : val
  }
/>`}
        className="pb-4"
      />

      <List variant="bullet-outline">
        <ListItem>
          The formatter function receives the cell value, the entire row data,
          and the column key, allowing for context-aware formatting.
        </ListItem>
      </List>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "With custom styles",
          code: example1Code,
          name: "timeline-example-1",
          Component: FlexTableExample1
        },
        {
          id: "example2",
          title: "With formatter and horizontal orientation",
          code: example2Code,
          name: "timeline-example-2",
          Component: FlexTableExample2
        },
        {
          id: "example3",
          title: "With complex data",
          code: example3Code,
          name: "timeline-example-3",
          Component: FlexTableExample3
        },
        {
          id: "example4",
          title: "With complex generic type",
          code: example4Code,
          name: "timeline-example-4",
          Component: FlexTableExample4
        },
        {
          id: "example5",
          title: "Empty",
          code: example5Code,
          name: "timeline-example-5",
          Component: FlexTableExample5
        },
        {
          id: "example6",
          title: "Sortable with excluded columns",
          code: example6Code,
          name: "timeline-example-6",
          Component: FlexTableExample6
        },
        {
          id: "example7",
          title: "Dynamic filters and Sorting",
          code: example7Code,
          name: "timeline-example-7",
          Component: FlexTableExample7
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

      <H2 id="aux-components">Auxiliar Components</H2>

      <H3 id="row-table">{"<RowTable />"}</H3>

      <P>
        A preconfigured wrapper for `FlexTable` with `orientation="vertical"`.
      </P>

      <CodeBlock
        language="tsx"
        className="border pb-3"
        code="<RowTable data={data} />"
      />

      <P>Use this when you want a traditional table layout.</P>

      <H3 id="column-table">{"<ColumnTable />"}</H3>

      <P>
        A preconfigured wrapper for `FlexTable` with `orientation="horizontal"`.
      </P>

      <CodeBlock
        language="tsx"
        className="border pb-3"
        code="<ColumnTable data={data} />"
      />

      <P>
        Use this when you want headers on the left and data flowing to the
        right.
      </P>

      <H2>How it Works</H2>

      <P>
        Internally, <InlineCode>FlexTable</InlineCode> transforms row-based data
        into column-oriented arrays using the{" "}
        <InlineCode>formatTableData</InlineCode> function. This enables
        consistent rendering in both orientations:
      </P>

      <CodeBlock
        language="js"
        className="border pb-3"
        code={`[
  { Name: "Alice", Age: 30 },
  { Name: "Bob", Age: 25 }  
]`}
      />

      <P>becomes:</P>

      <CodeBlock
        language="js"
        className="border pb-3"
        code={`[
  { header: "Name", items: ["Alice", "Bob"] },
  { header: "Age", items: [30, 25] }
]`}
      />

      <P>Then:</P>

      <List>
        <ListItem>
          <Strong>Vertical orientation</Strong> renders using{" "}
          <InlineCode>flex</InlineCode> with rows and columns.
        </ListItem>
        <ListItem>
          <Strong>Horizontal orientation</Strong> uses CSS{" "}
          <InlineCode>grid</InlineCode> to transpose the layout.
        </ListItem>
      </List>

      <H2>Styling Tips</H2>

      <List>
        <ListItem>
          You can use Tailwind classes via <InlineCode>className</InlineCode>,{" "}
          <InlineCode>headerClassName</InlineCode>, and{" "}
          <InlineCode>cellClassName</InlineCode>.
        </ListItem>
        <ListItem>
          Combine with <InlineCode>@/lib/utils</InlineCode>'s{" "}
          <InlineCode>cn</InlineCode> for conditional styles.
        </ListItem>
        <ListItem>
          Use <InlineCode>min-w-[300px]</InlineCode>,{" "}
          <InlineCode>w-fit</InlineCode>, <InlineCode>border</InlineCode>,{" "}
          <InlineCode>rounded-md</InlineCode>, <InlineCode>bg-muted</InlineCode>
          , etc., for layout control.
        </ListItem>
      </List>

      <H2>Utility Function</H2>

      <H3>
        <InlineCode scale="lg" className="text-xl tracking-wider">
          {"formatTableData(data: T[]): Column<T>[]"}
        </InlineCode>
      </H3>

      <P>Converts an array of objects into a column-oriented structure.</P>

      <P>Useful for custom renderers or logic beyond this component.</P>

      <H2>Related Files</H2>

      <List>
        <ListItem>
          <InlineCode>FlexTable.tsx</InlineCode> - Main component
        </ListItem>
        <ListItem>
          <InlineCode>RowTable</InlineCode>,{" "}
          <InlineCode>ColumnTable</InlineCode> - Aliases for vertical/horizontal
          layout
        </ListItem>
        <ListItem>
          <InlineCode>formatTableData()</InlineCode> - Utility used internally,
          but exportable
        </ListItem>
      </List>
    </>
  )
}
