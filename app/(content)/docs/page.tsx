import { List, ListItem } from "@/components/ui/list"
import { A, H1, H2, Lead, P, Strong } from "@/components/ui/typography"

export default function DocsPage() {
  return (
    <main className="container">
      <H1>Documentation</H1>
      <Lead>Learn how to use and customize shadcn/ui variants.</Lead>

      <H2 id="intro">Introduction</H2>
      <P>
        Shadcn Variants is a curated collection of custom variations for{" "}
        <A
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4"
        >
          shadcn/ui
        </A>{" "}
        components alongside original components using the same design
        guidelines from sahscn/ui. This project aims to provide developers with
        a set of ready-to-use, visually appealing, and easily customizable
        component variants that extend the base shadcn/ui library. Each
        component showcase includes an interactive playground, allowing you to
        experiment with different configurations and preview the resulting code.
        You can also explore the component source code and documentation to
        understand how the variants are implemented.
      </P>

      <H2 id="using">Using the Components</H2>
      <P>
        There are three main methods to integrate these components into your
        project:
      </P>

      <List variant="numbered">
        <ListItem>
          <Strong>Using the Custom CLI Command:</Strong> Run the dedicated CLI
          command to automatically install and configure the components.
        </ListItem>
        <ListItem>
          <Strong>Copying and Pasting the Code:</Strong> Follow the steps to
          manually copy the provided code snippets into your project.
        </ListItem>
        <ListItem>
          <Strong>Downloading as a File:</Strong> Download the component as a
          file and add it to your project.
        </ListItem>
      </List>

      <P>
        Detailed instructions and examples are available on each component page
        to guide you through the integration process.
      </P>

      <H2 id="playground">Interactive Playground</H2>
      <P>
        Explore the capabilities of each variant through our interactive
        playground, where you can:
      </P>

      <List variant="triangle">
        <ListItem>Dynamically adjust component properties</ListItem>
        <ListItem>Observe real-time updates reflecting your changes</ListItem>
        <ListItem>Generate and copy the corresponding code snippets</ListItem>
      </List>

      <H2 id="contributing">Contributing</H2>
      <P>
        We encourage community contributions to expand the Shadcn Variants
        collection! If you've developed a unique custom variant, we invite you
        to submit a pull request to our GitHub repository.
      </P>

      <P>Please ensure your submission includes:</P>

      <List variant="check">
        <ListItem>
          The complete component code, incorporating your custom variant
        </ListItem>
        <ListItem>
          A concise description of the variant's purpose and aesthetics
        </ListItem>
        <ListItem>Illustrative examples demonstrating its usage</ListItem>
      </List>
    </main>
  )
}
