import { List, ListItem } from "@/components/ui/list"
import { Separator } from "@/components/ui/separator"
import {
  DescriptionText,
  MainHeading,
  Paragraph,
  SubHeading
} from "@/components/typography"

export default function DocsPage() {
  return (
    <main className="container py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <MainHeading>Documentation</MainHeading>
          <DescriptionText className="text-muted-foreground">
            Learn how to use and customize shadcn/ui variants.
          </DescriptionText>
        </div>

        <Separator />

        <section className="space-y-4">
          <SubHeading id="intro">Introduction</SubHeading>
          <Paragraph>
            Shadcn Variants is a curated collection of custom variations for{" "}
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline underline-offset-4"
            >
              shadcn/ui
            </a>{" "}
            components alongside original components using the same design
            guidelines from sahscn/ui. This project aims to provide developers
            with a set of ready-to-use, visually appealing, and easily
            customizable component variants that extend the base shadcn/ui
            library. Each component showcase includes an interactive playground,
            allowing you to experiment with different configurations and preview
            the resulting code. You can also explore the component source code
            and documentation to understand how the variants are implemented.
          </Paragraph>
        </section>

        <section className="space-y-4">
          <SubHeading id="using">Using the Components</SubHeading>
          <p>
            There are three main methods to integrate these components into your
            project:
          </p>

          <List variant="numbered">
            <ListItem>
              <strong>Using the Custom CLI Command:</strong> Run the dedicated
              CLI command to automatically install and configure the components.
            </ListItem>
            <ListItem>
              <strong>Copying and Pasting the Code:</strong> Follow the steps to
              manually copy the provided code snippets into your project.
            </ListItem>
            <ListItem>
              <strong>Downloading as a File:</strong> Download the component as
              a file and add it to your project.
            </ListItem>
          </List>

          <Paragraph>
            Detailed instructions and examples are available on each component
            page to guide you through the integration process.
          </Paragraph>
        </section>

        <section className="space-y-4">
          <SubHeading id="playground">Interactive Playground</SubHeading>
          <Paragraph>
            Explore the capabilities of each variant through our interactive
            playground, where you can:
          </Paragraph>

          <List variant="triangle">
            <ListItem>Dynamically adjust component properties</ListItem>
            <ListItem>
              Observe real-time updates reflecting your changes
            </ListItem>
            <ListItem>
              Generate and copy the corresponding code snippets
            </ListItem>
          </List>
        </section>

        <section className="space-y-4">
          <SubHeading id="contributing">Contributing</SubHeading>
          <Paragraph>
            We encourage community contributions to expand the Shadcn Variants
            collection! If you've developed a unique custom variant, we invite
            you to submit a pull request to our GitHub repository.
          </Paragraph>

          <p>Please ensure your submission includes:</p>

          <List variant="check">
            <ListItem>
              The complete component code, incorporating your custom variant
            </ListItem>
            <ListItem>
              A concise description of the variant's purpose and aesthetics
            </ListItem>
            <ListItem>Illustrative examples demonstrating its usage</ListItem>
          </List>
        </section>
      </div>
    </main>
  )
}
