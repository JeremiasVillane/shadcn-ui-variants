"use client"

import { RegistryItem } from "@/types"

import { DescriptionTextSmall, SubHeading } from "@/components/typography"

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
        <SubHeading id="demo">Demo</SubHeading>
        <DescriptionTextSmall>{`See the ${title} component in action.`}</DescriptionTextSmall>
      </header>

      <ComponentTabs
        code={demoCode}
        name={`${name}-demo`}
        Component={DemoComponent}
      />
    </section>
  )
}
