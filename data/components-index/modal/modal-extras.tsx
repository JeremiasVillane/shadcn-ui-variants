import React from "react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, InlineCode, P, Strong } from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import { ModalExample1, ModalExample2, ModalExample3 } from "./examples"

const importCode = `import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  ModalAction,
} from "@/components/ui/modal"`
const implementationCode = `<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>

  <ModalContent>
    <ModalTitle>Modal Title</ModalTitle>
    <ModalDescription>This is a description of what this modal does.</ModalDescription>

    <ModalBody>
      <p>This is the main content of the modal.</p>
    </ModalBody>

    <ModalFooter>
      <ModalClose>Cancel</ModalClose>
      <ModalAction onClick={() => console.log("Action clicked")}>Confirm</ModalAction>
    </ModalFooter>
  </ModalContent>
</Modal>`

export async function ModalExtras() {
  const [example1Code, example2Code, example3Code] = await Promise.all(
    [1, 2, 3].map((num) =>
      getFileContent(
        `data/components-index/modal/examples/modal-example-${num}.tsx`
      )
    )
  )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        The <Strong>Modal</Strong> component it's built on top of Radix UI's
        Dialog primitive and Vaul's Drawer primitive, providing a consistent API
        across both presentation modes.
      </P>

      <H2 id="features">Key Features</H2>

      <List>
        <ListItem>
          <Strong>Responsive Design</Strong>: Automatically switches between a
          centered modal on desktop and a bottom drawer on mobile
        </ListItem>
        <ListItem>
          <Strong>Multiple Variants</Strong>: Supports different visual styles
          (default, success, destructive, warning)
        </ListItem>
        <ListItem>
          <Strong>Customizable Layout</Strong>: Configurable header, body, and
          footer sections
        </ListItem>
        <ListItem>
          <Strong>Icon Support</Strong>: Optional icons for different modal
          types
        </ListItem>
        <ListItem>
          <Strong>Alignment Options</Strong>: Content can be left-aligned or
          centered
        </ListItem>
        <ListItem>
          <Strong>Accessibility</Strong>: Built with accessibility in mind,
          including keyboard navigation and screen reader support
        </ListItem>
      </List>

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
          title: "Centered Modal with custom icon",
          code: example1Code,
          name: "modal-example-1",
          Component: ModalExample1
        },
        {
          id: "example2",
          title: "Dynamic Modal with separated header",
          code: example2Code,
          name: "modal-example-2",
          Component: ModalExample2
        },
        {
          id: "example3",
          title: "Form Modal in 'alertdialog' mode",
          code: example3Code,
          name: "modal-example-3",
          Component: ModalExample3
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

      <H2 id="anatomy" className="mt-6">
        Component Anatomy
      </H2>

      <H3>ModalTrigger</H3>

      <P>The element that triggers the modal to open:</P>

      <CodeBlock
        language="tsx"
        className="mt-4 pb-4"
        code={`<ModalTrigger>
  Open Modal
</ModalTrigger>`}
      />

      <P>
        By using only <InlineCode>ModalTrigger</InlineCode>, you can pass all
        the same props that you would pass to a <InlineCode>Button</InlineCode>{" "}
        component:
      </P>

      <CodeBlock
        language="tsx"
        className="mt-4 pb-4"
        code={`<ModalTrigger 
  iconRight={<ArrowRight />} 
  iconAnimation="translateXRight"
>
  Open Modal
</ModalTrigger>`}
      />

      <P>
        Or you can wrap a <InlineCode>Button</InlineCode> passsing{" "}
        <InlineCode>asChild</InlineCode>:
      </P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalTrigger asChild>
  <Button>Open Modal</Button>
</ModalTrigger>`}
      />

      <H3>ModalContent</H3>

      <P>The container for the modal content.</P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalContent>
  {/* Modal content goes here */}
</ModalContent>`}
      />

      <H3>ModalTitle</H3>

      <P>The title of the modal.</P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalTitle>Modal Title</ModalTitle>`}
      />

      <H3>ModalDescription</H3>

      <P>A description or subtitle for the modal.</P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalDescription>
  This is a description of what this modal does.
</ModalDescription>`}
      />

      <H3>ModalBody</H3>

      <P>The main content area of the modal.</P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalBody>
  <p>This is the main content of the modal.</p>
</ModalBody>`}
      />

      <H3>ModalFooter</H3>

      <P>The footer area of the modal, typically containing action buttons.</P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalFooter>
  <ModalClose>Cancel</ModalClose>
  <ModalAction>Confirm</ModalAction>
</ModalFooter>`}
      />

      <H3>ModalAction</H3>

      <P>A button for the primary action in the modal.</P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalAction onClick={handleAction}>Confirm</ModalAction>`}
      />

      <H3>ModalClose</H3>

      <P>
        A button that closes the modal. It is also a{" "}
        <InlineCode>Button</InlineCode> under the hood.
      </P>

      <CodeBlock
        language="tsx"
        className="pb-4"
        code={`<ModalClose>Cancel</ModalClose>`}
      />

      <H2>Accessibility</H2>

      <P>
        The <Strong>Modal</Strong> component is built with accessibility in
        mind:
      </P>

      <List variant="numbered">
        <ListItem>
          <Strong>Keyboard Navigation</Strong>: Users can navigate through the
          modal using the Tab key and close it using the Escape key.
        </ListItem>
        <ListItem>
          <Strong>Focus Management</Strong>: When the modal opens, focus is
          automatically moved to the first focusable element within the modal.
          When closed, focus returns to the element that triggered the modal.
        </ListItem>
        <ListItem>
          <Strong>ARIA Attributes</Strong>: The component uses appropriate ARIA
          roles and attributes to ensure screen readers can properly announce
          the modal and its content.
        </ListItem>
        <ListItem>
          <Strong>Alert Dialog Mode</Strong>: For critical actions, use the
          `mode="alertdialog"` prop to prevent users from accidentally
          dismissing the modal by clicking outside or pressing Escape.
        </ListItem>
      </List>
    </>
  )
}
