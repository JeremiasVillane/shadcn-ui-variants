import * as React from "react"
import { InfoIcon } from "lucide-react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { H2, H3, InlineCode, Muted, P, Strong } from "@/components/ui/prose"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  CustomHtmlStyling,
  MixedContent,
  MyArticle,
  StandaloneUsage
} from "./examples"

export async function ProseExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/prose/examples/prose-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        The <InlineCode>Prose</InlineCode> component system provides tools to
        apply beautiful and consistent typographic styles to long-form text
        content, such as blog posts, articles, or documentation pages. It offers
        two primary ways of working:
      </P>

      <List variant="numbered">
        <ListItem>
          Wrapping with <InlineCode>{"<Prose>"}</InlineCode>: You can wrap
          standard HTML elements (like <InlineCode>{"<h1>"}</InlineCode>,{" "}
          <InlineCode>{"<p>"}</InlineCode>, {"<blockquote>"}) within the{" "}
          <InlineCode>{"<Prose>"}</InlineCode> component. It automatically
          detects these elements and applies predefined base styles (
          <InlineCode>proseStyles</InlineCode>) and typographic scale styles (
          <InlineCode>proseSizes</InlineCode>) based on the element type or an
          optional <InlineCode>data-prose-type</InlineCode> attribute. It also
          allows setting a global typographic <InlineCode>scale</InlineCode> for
          all nested content.
        </ListItem>
        <ListItem>
          Using Standalone Helper Components: You can use the exported,
          pre-styled helper components (like <InlineCode>H1</InlineCode>,{" "}
          <InlineCode>P</InlineCode>, <InlineCode>Lead</InlineCode>,{" "}
          <InlineCode>InlineCode</InlineCode>, etc.) directly in your JSX, even
          outside a <InlineCode>{"<Prose>"}</InlineCode> wrapper. These
          components apply their base styles automatically and can accept an
          individual <InlineCode>scale</InlineCode> prop.
        </ListItem>
      </List>

      <P>
        This system leverages predefined style configurations and allows for
        easy customization of the overall text scale and the semantic wrapper
        element when using <InlineCode>{"<Prose>"}</InlineCode>.
      </P>

      <H2 id="examples">Usage Examples</H2>

      {[
        {
          id: "example1",
          title: (
            <>
              1. Using <InlineCode className="text-xl">{"<Prose>"}</InlineCode>{" "}
              with Raw HTML
            </>
          ),
          description: (
            <>
              The <InlineCode>{"<Prose>"}</InlineCode> component automatically
              styles standard HTML tags and applies the specified{" "}
              <InlineCode>scale</InlineCode>.
            </>
          ),
          code: example1Code,
          name: "list-example-1",
          Component: MyArticle
        },
        {
          id: "example2",
          title: "2. Using Standalone Helper Components",
          description: (
            <>
              You can use helpers directly, without{" "}
              <InlineCode>{"<Prose>"}</InlineCode>, and control their scale
              individually.
            </>
          ),
          code: example2Code,
          name: "list-example-2",
          Component: StandaloneUsage
        },
        {
          id: "example3",
          title: (
            <>
              3. Using Helper Components Inside{" "}
              <InlineCode className="text-xl">{"<Prose>"}</InlineCode>
            </>
          ),
          description: (
            <>
              Helpers inside <InlineCode>{"<Prose>"}</InlineCode> inherit the
              global scale.
            </>
          ),
          code: example3Code,
          name: "list-example-3",
          Component: MixedContent
        },
        {
          id: "example4",
          title: (
            <>
              4. Using{" "}
              <InlineCode className="text-xl">data-prose-type</InlineCode>{" "}
              (Inside <InlineCode className="text-xl">{"<Prose>"}</InlineCode>)
            </>
          ),
          description: (
            <>
              Use this attribute on <Strong>native HTML elements</Strong> inside{" "}
              <InlineCode>{"<Prose>"}</InlineCode> when you want{" "}
              <InlineCode>Prose</InlineCode> to apply a specific style
              configuration <em>other than</em> the one associated with the
              element's default tag name. It tells{" "}
              <InlineCode>{"<Prose>"}</InlineCode> which key from{" "}
              <InlineCode>proseStyles</InlineCode> and{" "}
              <InlineCode>proseScale</InlineCode> to use for that specific
              element.
            </>
          ),
          code: example4Code,
          name: "list-example-4",
          Component: CustomHtmlStyling
        }
      ].map((example) => (
        <React.Fragment key={example.id}>
          <H3 id={example.id}>{example.title}</H3>
          <P>{example.description}</P>
          <ComponentTabs
            code={example.code}
            name={example.name}
            Component={example.Component}
          />
        </React.Fragment>
      ))}
      <Muted>
        <Strong>Note:</Strong> <InlineCode>data-prose-type</InlineCode> is
        generally <em>not</em> needed when using the helper components (like{" "}
        <InlineCode>{"<Lead>"}</InlineCode>,{" "}
        <InlineCode>{"<InlineCode>"}</InlineCode>), as they already apply the
        correct base styles internally. Its main use is for customizing how{" "}
        <InlineCode>{"<Prose>"}</InlineCode> styles raw HTML tags.
      </Muted>

      <H2 id="features">Features</H2>

      <List>
        <ListItem>
          <Strong>
            Automatic Typographic Styling (within{" "}
            <InlineCode>{"<Prose>"}</InlineCode>):
          </Strong>{" "}
          Applies base styles to standard HTML elements or elements with{" "}
          <InlineCode>data-prose-type</InlineCode>.
        </ListItem>
        <ListItem>
          <Strong>Typographic Scaling:</Strong> Supports multiple scales (
          <InlineCode>xs</InlineCode>, <InlineCode>sm</InlineCode>,{" "}
          <InlineCode>default</InlineCode>, <InlineCode>lg</InlineCode>) via the{" "}
          <InlineCode>scale</InlineCode> prop to adjust font sizes and related
          styles (<InlineCode>proseSizes</InlineCode>).
        </ListItem>
        <ListItem>
          <Strong>Flexible Usage:</Strong> Use the{" "}
          <InlineCode>{"<Prose>"}</InlineCode> wrapper for automatic styling or
          use standalone helper components for explicit styling.
        </ListItem>
        <ListItem>
          <Strong>
            <InlineCode>data-prose-type</InlineCode> Support (within{" "}
            <InlineCode>{"<Prose>"}</InlineCode>):
          </Strong>{" "}
          Allows overriding the default styling for a native HTML element by
          specifying a <InlineCode>data-prose-type</InlineCode> attribute (e.g.,{" "}
          <InlineCode>{'<p data-prose-type="lead">'}</InlineCode>).
        </ListItem>
        <ListItem>
          <Strong>
            Customizable Wrapper Element (for{" "}
            <InlineCode>{"<Prose>"}</InlineCode>):
          </Strong>{" "}
          Allows specifying the root HTML element (<InlineCode>div</InlineCode>,{" "}
          <InlineCode>main</InlineCode>, <InlineCode>section</InlineCode>,{" "}
          <InlineCode>article</InlineCode>) using the{" "}
          <InlineCode>as</InlineCode> prop.
        </ListItem>
        <ListItem>
          <Strong>Helper Components:</Strong> Exports pre-styled components
          (e.g., <InlineCode>H1</InlineCode>, <InlineCode>P</InlineCode>,{" "}
          <InlineCode>Code</InlineCode>) that encapsulate base styles and accept
          an individual <InlineCode>scale</InlineCode> prop.
        </ListItem>
        <ListItem>
          <Strong>Tailwind CSS Friendly:</Strong> Designed for seamless
          integration with Tailwind CSS utility classes and the{" "}
          <InlineCode>cn</InlineCode> utility.
        </ListItem>
      </List>

      <H2 id="scale-prop">Scale Prop Behavior</H2>

      <List>
        <ListItem>
          <Strong>
            Global Scale (<InlineCode>{'<Prose scale="...">'}</InlineCode>):
          </Strong>{" "}
          When you set the <InlineCode>scale</InlineCode> prop on the{" "}
          <InlineCode>{"<Prose>"}</InlineCode> wrapper, it attempts to apply
          that scale to all content inside it.
          <List variant="bullet-outline">
            <ListItem>
              For <Strong>native HTML elements</Strong> (like{" "}
              <InlineCode>{"<h1>"}</InlineCode>,{" "}
              <InlineCode>{"<p>"}</InlineCode>) directly inside{" "}
              <InlineCode>{"<Prose>"}</InlineCode>, the wrapper applies the
              specified scale's styles directly.
            </ListItem>
            <ListItem>
              For <Strong>helper components</Strong> (like{" "}
              <InlineCode>{"<H1>"}</InlineCode>,{" "}
              <InlineCode>{"<P>"}</InlineCode>) directly inside{" "}
              <InlineCode>{"<Prose>"}</InlineCode>, the wrapper passes its{" "}
              <InlineCode>scale</InlineCode> value down to the helper component
              as a prop.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Strong>
            Individual Scale (<InlineCode>{'<H1 scale="...">'}</InlineCode>):
          </Strong>{" "}
          Helper components can receive an individual{" "}
          <InlineCode>scale</InlineCode> prop. They use this prop to apply the
          appropriate scale styles internally.
        </ListItem>
        <ListItem>
          <Strong>Override Behavior:</Strong> If a helper component (e.g.,{" "}
          <InlineCode>{"<H1>"}</InlineCode>) is used <em>directly inside</em> a{" "}
          <InlineCode>{"<Prose>"}</InlineCode> wrapper, the{" "}
          <InlineCode>scale</InlineCode> prop set on the{" "}
          <Strong>
            <InlineCode>{"<Prose>"}</InlineCode> wrapper takes precedence
          </Strong>
          . The value from <InlineCode>{'<Prose scale="...">'}</InlineCode> will
          be passed down to the <InlineCode>{"<H1>"}</InlineCode>, overwriting
          any <InlineCode>scale</InlineCode> prop you might have set directly on
          the <InlineCode>{"<H1>"}</InlineCode> itself in that specific
          instance.
        </ListItem>
        <ListItem>
          <Strong>When to Use Individual Scale:</Strong> Setting the{" "}
          <InlineCode>scale</InlineCode> prop on an individual helper component
          primarily makes sense when you are using that component{" "}
          <Strong>outside</Strong> of a <InlineCode>{"<Prose>"}</InlineCode>{" "}
          wrapper, or if the parent <InlineCode>{"<Prose>"}</InlineCode> wrapper
          is using the <InlineCode>default</InlineCode>
          scale and you want to override just one specific element.
        </ListItem>
      </List>

      <H2 id="helper-components">Exported Helper Components</H2>

      <P>
        These components encapsulate base styles and accept the{" "}
        <InlineCode>scale</InlineCode> prop:
      </P>

      <List>
        <ListItem>
          <InlineCode>H1</InlineCode>, <InlineCode>H2</InlineCode>,{" "}
          <InlineCode>H3</InlineCode>, <InlineCode>H4</InlineCode>
        </ListItem>
        <ListItem>
          <InlineCode>P</InlineCode>
        </ListItem>
        <ListItem>
          <InlineCode>A</InlineCode>
        </ListItem>
        <ListItem>
          <InlineCode>Blockquote</InlineCode>
        </ListItem>
        <ListItem>
          <InlineCode>Code</InlineCode> (renders{" "}
          <InlineCode>{"<pre><code>...</code></pre>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>InlineCode</InlineCode> (renders{" "}
          <InlineCode>{"<code>...</code>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>Lead</InlineCode>, <InlineCode>SubLead</InlineCode>{" "}
          (render <InlineCode>{"<p>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>Large</InlineCode> (renders{" "}
          <InlineCode>{"<div>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>Small</InlineCode> (renders{" "}
          <InlineCode>{"<small>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>Muted</InlineCode> (renders{" "}
          <InlineCode>{"<p>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>Strong</InlineCode> (renders{" "}
          <InlineCode>{"<strong>"}</InlineCode>)
        </ListItem>
        <ListItem>
          <InlineCode>Ul</InlineCode>, <InlineCode>Ol</InlineCode>,{" "}
          <InlineCode>Li</InlineCode>
        </ListItem>
      </List>

      <H2 id="advantages">Advantages</H2>

      <List>
        <ListItem>
          <Strong>Consistency:</Strong> Ensures uniform typography.
        </ListItem>
        <ListItem>
          <Strong>Maintainability:</Strong> Centralizes styles.
        </ListItem>
        <ListItem>
          <Strong>Flexible Scaling:</Strong> Easy adjustment of text scale via
          the <InlineCode>scale</InlineCode> prop.
        </ListItem>
        <ListItem>
          <Strong>Semantic Control:</Strong> Choose the right wrapper with{" "}
          <InlineCode>as</InlineCode> or use semantic helper components.
        </ListItem>
        <ListItem>
          <Strong>Usage Flexibility:</Strong> Works via wrapping or standalone
          components.
        </ListItem>
      </List>

      <H2 id="helpers-props">Helper Component Props</H2>

      <P>
        Helper components (<InlineCode>H1</InlineCode>,{" "}
        <InlineCode>P</InlineCode>, <InlineCode>Lead</InlineCode>, etc.) accept
        standard HTML attributes for their underlying element and also the
        following special prop:
      </P>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/30 text-xs md:text-sm">
            <TableRow>
              <TableHead className="w-[180px]">Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[150px]">Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs md:text-sm">
            <TableRow>
              <TableCell className="font-mono">
                <div className="flex items-center gap-1.5">
                  <span>scale</span>
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon className="size-3 text-blue-700 dark:text-blue-500" />
                    </PopoverTrigger>
                    <PopoverContent side="top" className="text-xs md:text-sm">
                      The typographic scale to apply specifically to this
                      component instance. See{" "}
                      <Strong>Scale Prop Behavior</Strong> above.
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
              <TableCell className="leading-7">
                <InlineCode>
                  <span className="space-x-1">
                    <span>enum</span>
                    <Popover>
                      <PopoverTrigger>
                        <InfoIcon className="size-3 text-blue-700 dark:text-blue-500" />
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        className="max-w-64 font-mono text-xs md:text-sm"
                      >
                        "default" | "sm" | "xs" | "lg"
                      </PopoverContent>
                    </Popover>
                  </span>
                </InlineCode>
              </TableCell>
              <TableCell>
                <InlineCode>"default"</InlineCode>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  )
}
