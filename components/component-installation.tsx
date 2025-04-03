import { TabsContent } from "@radix-ui/react-tabs"

import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine
} from "@/components/ui/timeline"
import { SubHeading } from "@/components/typography"

import { CodeBlock } from "./code-block"
import PackageManagerTabs from "./package-manager-tabs"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

interface ComponentInstallationProps {
  name: string
  code: string
  cliCommand?: string
}

export default function ComponentInstallation({
  name,
  code,
  cliCommand
}: ComponentInstallationProps) {
  return (
    <div>
      <SubHeading id="installation" className="mb-6">
        Installation
      </SubHeading>

      <Tabs variant="underlined" defaultValue="manual">
        <TabsList>
          <TabsTrigger value="manual">Manual</TabsTrigger>
          <TabsTrigger value="cli">CLI</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Timeline className="py-6">
            {!!cliCommand && (
              <TimelineItem>
                <TimelineHeading>
                  Install the following dependencies:
                </TimelineHeading>
                <TimelineDot value={1} />
                <TimelineLine />
                <TimelineContent>
                  <PackageManagerTabs
                    cliCommand={cliCommand}
                    className="py-6"
                  />
                </TimelineContent>
              </TimelineItem>
            )}

            <TimelineItem>
              <TimelineHeading>
                Copy and paste the following code or download the file into your
                project.
              </TimelineHeading>
              <TimelineDot value={!!cliCommand ? 2 : 1} />
              <TimelineLine />
              <TimelineContent>
                <CodeBlock
                  {...{ name, code }}
                  // registryUrl={registryUrl}
                  className="my-6"
                />
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineHeading>
                Update the import paths to match your project setup.
              </TimelineHeading>
              <TimelineDot value={!!cliCommand ? 3 : 2} />
            </TimelineItem>
          </Timeline>
        </TabsContent>

        <TabsContent value="cli">
          <div className="py-6 font-medium text-foreground/80">
            Coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
