import Link from "next/link"
import { publicUrl } from "@/env.mjs"
import { RegistryItem } from "@/types"
import { TabsContent } from "@radix-ui/react-tabs"

import { getFileContent } from "@/lib/file-utils"
import { toWordCase } from "@/lib/string-utils"
import { CodeBlockWrapper, CommandTabs } from "@/components/common"
import { SubHeading } from "@/components/typography"

import { CodeBlock } from "../ui/code-block"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineLine,
  TimelineNode,
  TimelineTitle
} from "../ui/timeline"

const commonDependencies = "class-variance-authority tailwind-merge clsx"

interface ComponentInstallationProps {
  registryItem: RegistryItem
  code: string
}

export default async function ComponentInstallation({
  registryItem: { name, dependencies, registryDependencies, tailwind, files },
  code
}: ComponentInstallationProps) {
  const extraFiles = files?.filter((f) => f.type !== "registry:ui")

  let stepCounter = 0

  return (
    <section className="flex flex-col">
      <SubHeading id="installation" className="mb-6">
        Installation
      </SubHeading>

      <Tabs variant="underlined" defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="cli">
          <CommandTabs
            variant="bootstrap"
            commandMap={{
              pnpm: `pnpm dlx shadcn@latest add ${publicUrl}/r/${name}.json`,
              npm: `npx shadcn@latest add ${publicUrl}/r/${name}.json`,
              yarn: `npx shadcn@latest add ${publicUrl}/r/${name}.json`,
              bun: `bunx --bun shadcn@latest add ${publicUrl}/r/${name}.json`
            }}
            className="py-4"
          />
        </TabsContent>

        <TabsContent value="manual">
          <Timeline className="py-6">
            {!!registryDependencies && (
              <TimelineItem>
                <TimelineConnector>
                  <TimelineNode>{++stepCounter}</TimelineNode>
                  <TimelineLine />
                </TimelineConnector>

                <TimelineContent>
                  <TimelineTitle>
                    First, you need to install the following components:
                  </TimelineTitle>

                  <TimelineDescription>
                    <ol className="pt-3">
                      {registryDependencies.map((dep, idx) => (
                        <li
                          key={idx}
                          className="ms-9 list-disc text-foreground/80"
                        >
                          <Link
                            href={`/components/${dep}`}
                            className="transition-color text-base font-medium underline underline-offset-4 ease-in-out hover:text-foreground/70"
                          >
                            {toWordCase(dep)}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            )}

            <TimelineItem>
              <TimelineConnector>
                <TimelineNode>{++stepCounter}</TimelineNode>
                <TimelineLine />
              </TimelineConnector>

              <TimelineContent>
                <TimelineTitle>Install dependencies:</TimelineTitle>
                <TimelineDescription>
                  <div className="flex flex-col gap-6 pt-4">
                    <CommandTabs
                      commandMap={{
                        pnpm: `pnpm add ${commonDependencies}`,
                        npm: `npm install ${commonDependencies}`,
                        yarn: `yarn add ${commonDependencies}`,
                        bun: `bun add ${commonDependencies}`
                      }}
                    />

                    {dependencies?.map((dep, idx) => (
                      <CommandTabs
                        key={idx}
                        commandMap={{
                          pnpm: `pnpm add ${dep}`,
                          npm: `npm install ${dep}`,
                          yarn: `yarn add ${dep}`,
                          bun: `bun add ${dep}`
                        }}
                      />
                    ))}
                  </div>
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineConnector>
                <TimelineNode>{++stepCounter}</TimelineNode>
                <TimelineLine />
              </TimelineConnector>

              <TimelineContent>
                <TimelineTitle>Add util file:</TimelineTitle>
                <TimelineDescription className="pt-5">
                  <CodeBlock
                    className="border pb-3"
                    language="tsx"
                    filename="lib/utils.ts"
                    code={`import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`}
                  />
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector>
                <TimelineNode>{++stepCounter}</TimelineNode>
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
                      className="mb-7 mt-5 border"
                    />
                  </CodeBlockWrapper>
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>

            {extraFiles?.map(async (file, idx) => {
              const filePath = file.path
              const fileName = filePath.split("/").pop() as string
              const fileNameWithoutExtension = fileName.split(".")[0]

              const fileContent = await getFileContent(filePath)

              return (
                <TimelineItem key={idx}>
                  <TimelineConnector>
                    <TimelineNode>{++stepCounter}</TimelineNode>
                    <TimelineLine />
                  </TimelineConnector>

                  <TimelineContent>
                    <TimelineTitle>
                      Add{" "}
                      <span className="rounded-sm bg-muted px-1 font-mono text-sm font-normal">
                        {fileNameWithoutExtension}
                      </span>{" "}
                      {file.type.split(":").at(-1)}:
                    </TimelineTitle>
                    <TimelineDescription className="pt-5">
                      <CodeBlockWrapper>
                        <CodeBlock
                          language="tsx"
                          filename={fileName}
                          code={fileContent}
                          className="mb-7 border"
                        />
                      </CodeBlockWrapper>
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              )
            })}

            {!!tailwind && (
              <TimelineItem>
                <TimelineConnector>
                  <TimelineNode>{++stepCounter}</TimelineNode>
                  <TimelineLine />
                </TimelineConnector>

                <TimelineContent>
                  <TimelineTitle>
                    Add the followind to your{" "}
                    <span className="rounded-md bg-muted px-1 font-mono text-sm font-normal">
                      tailwind.config.ts
                    </span>{" "}
                    file:
                  </TimelineTitle>
                  <TimelineDescription>
                    <CodeBlockWrapper>
                      <CodeBlock
                        language="ts"
                        filename="tailwind.config.ts"
                        code={`const config = ${JSON.stringify(tailwind.config, null, 2)}`}
                        className="mb-7 mt-5 border"
                      />
                    </CodeBlockWrapper>
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            )}

            <TimelineItem>
              <TimelineConnector>
                <TimelineNode>{++stepCounter}</TimelineNode>
              </TimelineConnector>

              <TimelineContent>
                <TimelineTitle>
                  Update the import paths to match your project setup.
                </TimelineTitle>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </TabsContent>
      </Tabs>
    </section>
  )
}
