import React from "react"
import Link from "next/link"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, InlineCode, P, Strong } from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import {
  TagBoxExample1,
  TagBoxExample2,
  TagBoxExample3,
  TagBoxExample4
} from "./examples"

const importCode = `import { TagBox, type TagType } from "@/components/tag-box"`
const implementationCode = `<TagBox userTags={availableUserTags} />`

export async function TagBoxExtras() {
  const [example1Code, example2Code, example3Code, example4Code, example5Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/tag-box/examples/tag-box-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        The <InlineCode>TagBox</InlineCode> component offers a robust and
        user-friendly solution for managing tags within your application. It
        empowers users to effortlessly add, select, remove, and edit tags,
        complete with suggestions, customizable appearances, and flexible state
        management options (controlled and uncontrolled). It's designed to
        integrate seamlessly with your UI, leveraging components like Badges,
        Popovers, and Modals for a rich interactive experience.
      </P>

      <H2 id="features">Features</H2>

      <List>
        <ListItem>
          <Strong>Tag Input:</Strong> Add tags by typing or selecting from a
          dynamic list of suggestions.
        </ListItem>
        <ListItem>
          <Strong>Tag Creation:</Strong> Dynamically create new tags if they
          don't exist in the predefined list.
        </ListItem>
        <ListItem>
          <Strong>Tag Removal:</Strong> Easily remove selected tags with a
          single click on the 'x' icon.
        </ListItem>
        <ListItem>
          <Strong>Tag Management Interface:</Strong> A built-in modal allows
          users to edit tag names and colors (if enabled) for all known tags.
        </ListItem>
        <ListItem>
          <Strong>Color Customization:</Strong> Assign distinct colors to tags
          for better visual organization. This feature can be globally toggled
          using the <InlineCode>withColor</InlineCode> prop.
        </ListItem>
        <ListItem>
          <Strong>Controlled and Uncontrolled Modes:</Strong> Flexible state
          management. Use it as a controlled component by providing{" "}
          <InlineCode>value</InlineCode> and <InlineCode>onChange</InlineCode>{" "}
          props, or as an uncontrolled component with{" "}
          <InlineCode>defaultValue</InlineCode>.
        </ListItem>
        <ListItem>
          <Strong>Max Tags Limit:</Strong> Set a maximum number of selectable
          tags, with visual feedback when the limit is reached.
        </ListItem>
        <ListItem>
          <Strong>Customizable Placeholders:</Strong> Define custom placeholder
          text for the input field.
        </ListItem>
        <ListItem>
          <Strong>Styling:</Strong> Leverages <InlineCode>Badge</InlineCode>{" "}
          component for tag display, allowing easy styling via inherited props
          or custom class names (<InlineCode>className</InlineCode>,{" "}
          <InlineCode>tagClassName</InlineCode>).
        </ListItem>
        <ListItem>
          <Strong>Accessibility:</Strong> Built with Radix UI primitives,
          focusing on accessibility and keyboard navigation.
        </ListItem>
      </List>

      <H2 id="usage">Basic Usage</H2>

      <P>
        Import the <InlineCode>TagBox</InlineCode> component and, optionally,
        the <InlineCode>TagType</InlineCode> for typing your tag data.
      </P>

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

      <P className="mt-4">
        For a minimal setup, you can provide an array of{" "}
        <InlineCode>userTags</InlineCode> which are the predefined tags
        available for selection and management.
      </P>

      <H3 id="controlled-uncontrolled">Controlled vs. Uncontrolled Mode</H3>
      <P>
        <InlineCode>TagBox</InlineCode> can operate in two modes:
      </P>
      <List variant="numbered">
        <ListItem>
          <Strong>Controlled Mode:</Strong> You manage the state of selected
          tags. Provide the <InlineCode>value</InlineCode> prop (an array of
          selected <InlineCode>TagType</InlineCode> objects) and handle updates
          via the <InlineCode>onChange</InlineCode> callback. This gives you
          full control over the tag selection state.
          <CodeBlock
            language="tsx"
            code={`const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);\n\n<TagBox \n  userTags={allMyTags}\n  value={selectedTags} \n  onChange={setSelectedTags} \n/>`}
            className="mt-2 pb-4"
          />
        </ListItem>
        <ListItem>
          <Strong>Uncontrolled Mode:</Strong> The component manages its own
          selection state internally. You can provide a{" "}
          <InlineCode>defaultValue</InlineCode> prop for the initial set of
          selected tags. You can still listen to changes using the{" "}
          <InlineCode>onChange</InlineCode> callback if needed. This mode is
          simpler for basic use cases.
          <CodeBlock
            language="tsx"
            code={`<TagBox \n  userTags={allMyTags}\n  defaultValue={[{ id: "1", name: "Initial Tag" }]} \n  onChange={(tags) => console.log("Tags changed:", tags)}\n/>`}
            className="mt-2 pb-4"
          />
        </ListItem>
      </List>

      <H3 id="tag-management-callbacks">Tag Management Callbacks</H3>
      <P>
        The "Manage tags" dialog allows users to modify the global list of
        available tags. To persist these changes, use the{" "}
        <InlineCode>onTagEdit</InlineCode> and{" "}
        <InlineCode>onTagRemove</InlineCode> callbacks:
      </P>
      <List>
        <ListItem>
          <InlineCode>onTagEdit</InlineCode>: Called when a tag's name or color
          is saved in the management dialog. You should update your master list
          of
          <InlineCode>userTags</InlineCode> (e.g., in your state or database)
          with the received updated tag object.
        </ListItem>
        <ListItem>
          <InlineCode>onTagRemove</InlineCode>: Called when a tag is deleted
          from the management dialog. You should remove this tag from your
          master list of <InlineCode>userTags</InlineCode>.
        </ListItem>
      </List>
      <P>
        Properly handling these callbacks ensures that changes made in the
        "Manage tags" dialog are reflected globally and persist as needed.
      </P>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "With Maximum Tags Limit & Uncontrolled",
          description:
            "Demonstrates limiting the number of selectable tags with a visual indicator, used in an uncontrolled manner with a default value.",
          code: example1Code,
          name: "tag-box-example-1",
          Component: TagBoxExample1
        },
        {
          id: "example2",
          title: "Custom Styling",
          description: "Customize the appearance of the TagBox and its tags.",
          code: example2Code,
          name: "tag-box-example-2",
          Component: TagBoxExample2
        },
        {
          id: "example3",
          title: "Controlled Mode & Form Integration",
          description:
            "Illustrates using TagBox as a controlled component within a form, managing its state and potentially integrating with form validation.",
          code: example3Code,
          name: "tag-box-example-3",
          Component: TagBoxExample3
        },
        {
          id: "example4",
          title: "Tag Management & Real-time Filtering",
          description: (
            <>
              An advanced example showing how to handle{" "}
              <InlineCode>onTagEdit</InlineCode> and{" "}
              <InlineCode>onTagRemove</InlineCode> to manage{" "}
              <InlineCode>userTags</InlineCode>, and using selected tags to
              filter a list of items in real-time.
            </>
          ),
          code: example4Code,
          name: "tag-box-example-4",
          Component: TagBoxExample4
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

      <H2 id="badge-props-details">Badge Props Integration</H2>
      <P>
        The <InlineCode>TagBox</InlineCode> component renders each selected tag
        using an internal <InlineCode>Badge</InlineCode> component. You can
        directly pass props supported by the <InlineCode>Badge</InlineCode>{" "}
        component (such as <InlineCode>variant</InlineCode>,{" "}
        <InlineCode>size</InlineCode>, <InlineCode>shape</InlineCode>,{" "}
        <InlineCode>leftElement</InlineCode>,{" "}
        <InlineCode>rightElement</InlineCode>) to the{" "}
        <InlineCode>TagBox</InlineCode>. These props will be applied to each
        individual tag badge. For example, to change the shape of all tags:
      </P>
      <CodeBlock
        language="tsx"
        code={`<TagBox userTags={userTags} shape="square" />`}
        className="my-4 pb-4"
      />
      <P>
        Refer to the{" "}
        <Link href="/components/badge" className="underline hover:text-primary">
          <InlineCode>Badge</InlineCode> component documentation
        </Link>{" "}
        for a full list of available props and their effects. The{" "}
        <InlineCode>tagClassName</InlineCode> prop can also be used for more
        specific CSS customization of the badges.
      </P>

      <H2 id="notes-and-best-practices">Notes and Best Practices</H2>
      <List>
        <ListItem>
          <Strong>Unique Tag IDs:</Strong> While not strictly enforced for basic
          operation if only names are used, providing unique{" "}
          <InlineCode>id</InlineCode> fields in your{" "}
          <InlineCode>TagType</InlineCode> objects is highly recommended,
          especially for stable keying, reliable editing, and removal when tag
          names might not be unique or could change. The component will generate
          a temporary random ID for newly created tags if an ID is not part of
          the `existingUserTag` or implicitly handled by your `onTagEdit` logic
          for new tags.
        </ListItem>
        <ListItem>
          <Strong>
            State Management for <InlineCode>userTags</InlineCode>:
          </Strong>{" "}
          The <InlineCode>userTags</InlineCode> prop provides the initial set of
          available tags. If you allow tag creation or editing through the
          "Manage Tags" dialog, you are responsible for updating your source{" "}
          <InlineCode>userTags</InlineCode> array using the{" "}
          <InlineCode>onTagEdit</InlineCode> and{" "}
          <InlineCode>onTagRemove</InlineCode> callbacks to ensure consistency.
        </ListItem>
        <ListItem>
          <Strong>Performance:</Strong> For very large sets of{" "}
          <InlineCode>userTags</InlineCode> or selected tags, consider
          performance implications. Virtualization for the suggestion list is
          not built-in but could be a custom enhancement if needed.
        </ListItem>
        <ListItem>
          <Strong>Styling Conflicts:</Strong> Be mindful of CSS specificity if
          applying extensive custom styles, especially when using{" "}
          <InlineCode>className</InlineCode> and{" "}
          <InlineCode>tagClassName</InlineCode> alongside inherited Badge props.
        </ListItem>
      </List>
    </>
  )
}
