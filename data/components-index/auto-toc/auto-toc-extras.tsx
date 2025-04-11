import { CodeBlock } from "@/components/ui/code-block"
import { Separator } from "@/components/ui/separator"
import { SubHeading, SubHeadingSmall } from "@/components/typography"

export function AutoTOCExtras() {
  return (
    <div className="flex flex-col gap-9">
      <section className="space-y-4">
        <header>
          <SubHeading id="features">Features</SubHeading>
        </header>

        <div className="space-y-4">
          <p>
            The Auto-Generating Table of Contents component includes several powerful
            features:
          </p>
          <ul className="list-disc space-y-2 pl-8">
            <li>Automatically detects headings in your content</li>
            <li>Creates a hierarchical navigation structure</li>
            <li>Highlights the currently active section</li>
            <li>Provides smooth scrolling to sections</li>
            <li>Fully responsive design with Tailwind CSS</li>
            <li>Accessible with proper ARIA attributes</li>
          </ul>
        </div>
      </section>

      <Separator className="my-9" />

      <section className="space-y-4">
        <header>
          <SubHeading id="usage">Usage</SubHeading>
        </header>

        <div className="space-y-6">
          <p>
            Using this component in your React application is straightforward:
          </p>

          <div className="space-y-3">
            <SubHeadingSmall id="basic-implementation">
              Basic Implementation
            </SubHeadingSmall>

            <article className="pt-4">
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
            </article>
          </div>
        </div>
      </section>

      <Separator className="my-9" />

      <section className="space-y-4">
        <header>
          <SubHeading id="accessibility">Accessibility</SubHeading>
        </header>

        <div className="space-y-4">
          <p>This component follows accessibility best practices:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Uses semantic HTML elements</li>
            <li>Includes proper ARIA attributes</li>
            <li>Supports keyboard navigation</li>
            <li>Maintains focus management</li>
          </ul>
        </div>
      </section>

      <Separator className="my-9" />

      <section className="space-y-4">
        <header>
          <SubHeading id="browser-support">Browser Support</SubHeading>
        </header>

        <p>
          This component uses the Intersection Observer API, which is supported
          in all modern browsers. For older browsers, you may need to include a
          polyfill.
        </p>
      </section>
    </div>
  )
}
