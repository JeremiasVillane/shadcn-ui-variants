import * as React from "react"

import { getFileContent } from "@/lib/file-utils"
import { CodeBlock } from "@/components/local/ui/code-block"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, InlineCode, P, Strong } from "@/components/ui/prose"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  SimpleToastExample1,
  SimpleToastExample2,
  SimpleToastExample3,
  SimpleToastExample4,
  SimpleToastExample5
} from "./examples"

const usageCode1 = `// In app/layout.tsx or src/App.tsx
import { Toaster } from "@/components/ui/toast";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster
          defaultPosition="bottom-right"
          defaultDuration={4000}
          defaultShowProgressBar={true}
          gap={12}
        />
      </body>
    </html>
  );
}`

const usageCode2 = `import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

function MyPage() {
  return (
    <Button
      onClick={() => {
        toast({
          title: "Event Scheduled",
          description: "Friday, April 25 at 10:00 AM",
          type: "success",
          duration: 5000,
        });
      }}
    >
      Agendar Evento
    </Button>
  );
}`

export async function SimpleToastExtras() {
  const [example1Code, example2Code, example3Code, example4Code, example5Code] =
    await Promise.all(
      [1, 2, 3, 4, 5].map((num) =>
        getFileContent(
          `data/components-index/simple-toast/examples/simple-toast-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="overview">Overview</H2>

      <P>
        This component provides a highly customizable and lightweight toast
        system, built with React and Tailwind CSS. It integrates directly into
        your project through a simple copy and paste, giving you full control
        over the code and appearance.
      </P>

      <H2 id="usage">Usage</H2>

      <List variant="numbered" className="space-y-9 [&>li]:space-y-4">
        <ListItem>
          <Strong>
            Render the <InlineCode>{"<Toaster />"}</InlineCode>:
          </Strong>{" "}
          Import and render the <InlineCode>Toaster</InlineCode> component once
          in your application, preferably in your root layout. You can set
          default values here.
          <article className="relative">
            <CodeBlock className="pb-3" language="tsx" code={usageCode1} />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={usageCode1} />
            </div>
          </article>
        </ListItem>

        <ListItem>
          <Strong>
            Call <InlineCode>toast()</InlineCode>:
          </Strong>{" "}
          Import the <InlineCode>toast</InlineCode> function and use it to
          display notifications from anywhere.
          <article className="relative">
            <CodeBlock className="pb-3" language="tsx" code={usageCode2} />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={usageCode1} />
            </div>
          </article>
        </ListItem>
      </List>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "Toast with Actions",
          code: example1Code,
          name: "simple-toast-example-1",
          Component: SimpleToastExample1
        },
        {
          id: "example2",
          title: "Permanent Toast with Manual Closing",
          code: example2Code,
          name: "simple-toast-example-2",
          Component: SimpleToastExample2
        },
        {
          id: "example3",
          title: "Toast with Custom Animation and Positioning",
          code: example3Code,
          name: "simple-toast-example-3",
          Component: SimpleToastExample3
        },
        {
          id: "example4",
          title: "Toast with Icon and Custom Content",
          code: example4Code,
          name: "simple-toast-example-4",
          Component: SimpleToastExample4
        },
        {
          id: "example5",
          title: "Nested toasts with combined animations and styles",
          code: example5Code,
          name: "simple-toast-example-5",
          Component: SimpleToastExample5
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

      <H2 id="features">Features</H2>

      <List>
        <ListItem>
          <Strong>Ultra Lightweight:</Strong> No external <em>runtime</em>{" "}
          dependencies (React only).
        </ListItem>
        <ListItem>
          <Strong>Customizable:</Strong> Modify styles with Tailwind, use your
          own icons, define enter/exit animations, render complex React
          content, add action buttons and more.
        </ListItem>
        <ListItem>
          <Strong>Copy & Paste:</Strong> Easy integration by copying a single
          file into your project.
        </ListItem>
        <ListItem>
          <Strong>Total Control:</Strong> You own the source code, modify it
          according to your needs.
        </ListItem>
        <ListItem>
          <Strong>Intuitive API:</Strong> Use <InlineCode>toast()</InlineCode>{" "}
          function to show notifications and{" "}
          <InlineCode>{"<Toaster />"}</InlineCode> to configure and render.
        </ListItem>
        <ListItem>
          <Strong>Configurable Animations:</Strong> Define separate enter and
          exit animations, or let the exit animation be inferred automatically.
        </ListItem>
        <ListItem>
          <Strong>Dual Actions:</Strong> Support for primary and secondary
          action buttons with callbacks.
        </ListItem>
        <ListItem>
          <Strong>Progress Bar:</Strong> Optionally show the time remaining for
          automatic closing.
        </ListItem>
        <ListItem>
          <Strong>Typed with TypeScript:</Strong> Fully written in TypeScript.
        </ListItem>
      </List>

      <H2 id="customization">Customization</H2>

      <P>Being a copied component in your project, you have total freedom:</P>

      <List>
        <ListItem>
          <Strong>Styles:</Strong> Modify directly{" "}
          <InlineCode>ToastPrimitive</InlineCode> inside{" "}
          <InlineCode>simple-toast.tsx</InlineCode>. Use Tailwind to change
          colors, spacing, fonts, borders, shadows, etc. Use the{" "}
          <InlineCode>className</InlineCode> prop for quick overrides.
        </ListItem>
        <ListItem>
          <Strong>Colors and Icons:</Strong> Edit{" "}
          <InlineCode>colorVariants</InlineCode> and{" "}
          <InlineCode>iconVariants</InlineCode> objects to change the base
          colors of the default fonts or icons. Use the{" "}
          <InlineCode>customIcon</InlineCode> prop for unique icons per toast.
        </ListItem>
        <ListItem>
          <Strong>Animations:</Strong>
          <List variant="bullet-outline">
            <ListItem>
              Modify the <InlineCode>keyframes</InlineCode> and{" "}
              <InlineCode>animation</InlineCode> in{" "}
              <InlineCode>tailwind.config.js</InlineCode> to change the
              appearance or duration of animations.
            </ListItem>
            <ListItem>
              Adjust the <InlineCode>EXIT_ANIMATION_DURATION</InlineCode>{" "}
              constant in <InlineCode>simple-toast.tsx</InlineCode> if you
              change the duration of exit animations in CSS.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Strong>HTML/JSX structure:</Strong> Change the structure inside{" "}
          <InlineCode>ToastPrimitive</InlineCode> if you need a different
          layout.
        </ListItem>
        <ListItem>
          <Strong>State Logic:</Strong> Modify the{" "}
          <InlineCode>toast</InlineCode>, <InlineCode>dismiss</InlineCode>{" "}
          functions or the <InlineCode>useToast</InlineCode> hook if you require
          different state handling behavior.
        </ListItem>
      </List>
    </>
  )
}
