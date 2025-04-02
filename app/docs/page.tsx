import { Separator } from "@/components/ui/separator"

export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use and customize shadcn/ui variants.
          </p>
        </div>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Introduction
          </h2>
          <p>
            Shadcn Variants is a collection of custom variations for shadcn/ui
            components. This site provides interactive playgrounds to test
            different component variations and copy the code to use in your own
            projects.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Getting Started
          </h2>
          <p>
            To use the custom variants in your project, you'll need to have
            shadcn/ui installed. If you haven't already, follow the official
            installation guide at{" "}
            <a
              href="https://ui.shadcn.com/docs/installation"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-4"
            >
              ui.shadcn.com/docs/installation
            </a>
            .
          </p>
          <p>
            Once you have shadcn/ui set up, you can add the custom variants by
            modifying the component files or by using the provided className
            approach.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Using the Variants
          </h2>
          <p>There are two ways to use the custom variants:</p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Modify the component file:</strong> Add the custom
              variants to the component's variant definition. This allows you to
              use them with the variant prop.
            </li>
            <li>
              <strong>Use className directly:</strong> Apply the custom styles
              directly using the className prop without modifying the component
              file.
            </li>
          </ol>
          <p>Each component page provides code examples for both approaches.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Playground</h2>
          <p>The playground section on each component page allows you to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Customize component properties in real-time</li>
            <li>See the rendered component update as you change settings</li>
            <li>Copy the generated code for use in your project</li>
          </ul>
          <p>
            Use the playground to experiment with different combinations of
            props and styles before implementing them in your project.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Contributing
          </h2>
          <p>
            We welcome contributions to Shadcn Variants! If you have created a
            custom variant that you'd like to share, please submit a pull
            request to our GitHub repository.
          </p>
          <p>Make sure your contribution includes:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>The component code with your custom variant</li>
            <li>A brief description of the variant</li>
            <li>Example usage</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
