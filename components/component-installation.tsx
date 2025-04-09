import { TabsContent } from "@radix-ui/react-tabs"

import { SubHeading } from "@/components/typography"

import { CodeBlockWrapper } from "./code-block-wrapper"
// import { CodeBlock } from "./code-block"
import PackageManagerTabs from "./package-manager-tabs"
import { CodeBlock } from "./ui/code-block"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineLine,
  TimelineNode,
  TimelineTitle
} from "./ui/timeline"

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
    <section className="flex flex-col">
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
                <TimelineConnector>
                  <TimelineNode>1</TimelineNode>
                  <TimelineLine />
                </TimelineConnector>

                <TimelineContent>
                  <TimelineTitle>
                    Install the following dependencies:
                  </TimelineTitle>
                  <TimelineDescription>
                    <PackageManagerTabs
                      cliCommand={cliCommand}
                      className="pt-2"
                    />
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            )}

            <TimelineItem>
              <TimelineConnector>
                <TimelineNode>{!!cliCommand ? 2 : 1}</TimelineNode>
                <TimelineLine />
              </TimelineConnector>

              <TimelineContent>
                <TimelineTitle>
                  Copy and paste the following code or download the file into
                  your project.
                </TimelineTitle>
                <TimelineDescription>
                  <CodeBlockWrapper>
                    <CodeBlock
                      language="tsx"
                      filename={`${name}.tsx`}
                      code={code}
                      className="mb-7 mt-6 border"
                    />
                  </CodeBlockWrapper>
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineConnector>
                <TimelineNode>{!!cliCommand ? 3 : 2}</TimelineNode>
              </TimelineConnector>

              <TimelineContent>
                <TimelineTitle>
                  Update the import paths to match your project setup.
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </TabsContent>

        <TabsContent value="cli">
          <div className="py-6 font-medium text-foreground/80">
            Coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
