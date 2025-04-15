import { CodeBlock } from "@/components/local/ui/code-block"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, P } from "@/components/ui/prose"

export function AutoTOCExtras() {
  return (
    <>
      <H2 id="features">Features</H2>

      <P>
        The Auto-Generating Table of Contents component includes several
        powerful features:
      </P>
      <List>
        <ListItem>Automatically detects headings in your content</ListItem>
        <ListItem>Creates a hierarchical navigation structure</ListItem>
        <ListItem>Highlights the currently active section</ListItem>
        <ListItem>Provides smooth scrolling to sections</ListItem>
        <ListItem>Fully responsive design with Tailwind CSS</ListItem>
        <ListItem>Accessible with proper ARIA attributes</ListItem>
      </List>

      <H2 id="usage">Usage</H2>

      <P>Using this component in your React application is straightforward:</P>

      <H3 id="basic-implementation">Basic Implementation</H3>

      <CodeBlock
        language="tsx"
        filename="auto-toc-basic.tsx"
        className="border pb-3"
        code={`import { AutoTableOfContents } from "@/components/ui/auto-toc"

export default function AutoTOCBasic() {
  return (
    <div className="flex">
      <AutoTableOfContents />
      <main>
        <h1 id="heading-1">Heading 1</h1>
        {/* Your content here */}
      </main>
    </div>
  )
}`}
      />

      <H2 id="accessibility">Accessibility</H2>

      <P>This component follows accessibility best practices:</P>
      <List variant="check">
        <ListItem>Uses semantic HTML elements</ListItem>
        <ListItem>Includes proper ARIA attributes</ListItem>
        <ListItem>Supports keyboard navigation</ListItem>
        <ListItem>Maintains focus management</ListItem>
      </List>

      <H2 id="browser-support">Browser Support</H2>

      <P>
        This component uses the Intersection Observer API, which is supported in
        all modern browsers. For older browsers, you may need to include a
        polyfill.
      </P>
    </>
  )
}
