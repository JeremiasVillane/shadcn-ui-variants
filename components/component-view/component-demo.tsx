"use client"

import { RegistryItem } from "@/types"

import { H2, SubLead } from "@/components/ui/prose"

import { ComponentTabs } from "./component-tabs"

interface ComponentDemoProps {
  name: RegistryItem["name"]
  title: RegistryItem["title"]
  DemoComponent: () => React.JSX.Element
  demoCode: string
}

export function ComponentDemo({
  name,
  title,
  DemoComponent,
  demoCode
}: ComponentDemoProps) {
  return (
    <section>
      <header className="mb-6">
        <H2 id="demo">Demo</H2>
        <SubLead>{`See the ${title} component in action.`}</SubLead>
      </header>

      <ComponentTabs
        code={demoCode}
        name={`${name}-demo`}
        Component={DemoComponent}
      />
    </section>
  )
}
