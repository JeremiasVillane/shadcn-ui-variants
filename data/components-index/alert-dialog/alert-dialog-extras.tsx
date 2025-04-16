import * as React from "react"
import Link from "next/link"

import { getFileContent } from "@/lib/file-utils"
import { A, H2, H3, Muted } from "@/components/ui/prose"
import { ComponentTabs } from "@/components/component-view/component-tabs"

import {
  AlertDialogExample1,
  AlertDialogExample2,
  AlertDialogExample3,
  AlertDialogExample4
} from "./examples"

export async function AlertDialogExtras() {
  const [example1Code, example2Code, example3Code, example4Code] =
    await Promise.all(
      [1, 2, 3, 4].map((num) =>
        getFileContent(
          `data/components-index/alert-dialog/examples/alert-dialog-example-${num}.tsx`
        )
      )
    )

  return (
    <>
      <H2 id="examples">Examples</H2>

      <Muted>
        The following examples use the{" "}
        <Link href={"button"} legacyBehavior>
          <A>Button</A>
        </Link>{" "}
        component.
      </Muted>

      {[
        {
          id: "example1",
          title: "Critical Elimination Confirmation",
          code: example1Code,
          name: "alert-dialog-example-1",
          Component: AlertDialogExample1
        },
        {
          id: "example2",
          title: "Success with Separate and Centered Header",
          code: example2Code,
          name: "alert-dialog-example-2",
          Component: AlertDialogExample2
        },
        {
          id: "example3",
          title: "Informative Alert with Custom Icon",
          code: example3Code,
          name: "alert-dialog-example-3",
          Component: AlertDialogExample3
        },
        {
          id: "example4",
          title: "Centered Warning Without Icon",
          code: example4Code,
          name: "alert-dialog-example-4",
          Component: AlertDialogExample4
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
    </>
  )
}
