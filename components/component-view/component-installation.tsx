import Link from "next/link"
import { publicUrl } from "@/env.mjs"
import { RegistryItem } from "@/types"
import { TabsContent } from "@radix-ui/react-tabs"

import { getFileContent } from "@/lib/file-utils"
import { toWordCase } from "@/lib/string-utils"
import { H2 } from "@/components/ui/prose"
import {
  Stepper,
  StepperConnector,
  StepperContent,
  StepperDescription,
  StepperDot,
  StepperItem,
  StepperLine,
  StepperTitle
} from "@/components/ui/simple-stepper"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlockWrapper, CommandTabs } from "@/components/common"
import { CodeBlock } from "@/components/local/ui/code-block"

import { List, ListItem } from "../ui/list"

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
    <>
      <H2 id="installation">Installation</H2>

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
            className="pb-1 pt-4"
          />
        </TabsContent>

        <TabsContent value="manual">
          <Stepper className="pt-6">
            {!!registryDependencies && (
              <StepperItem>
                <StepperConnector>
                  <StepperDot>{++stepCounter}</StepperDot>
                  <StepperLine />
                </StepperConnector>

                <StepperContent>
                  <StepperTitle>
                    First, you need to install the following components:
                  </StepperTitle>

                  <StepperDescription>
                    <List className="pt-3">
                      {registryDependencies.map((depValue, idx) => {
                        let depUrl = depValue
                        const match = depUrl.match(/\/([^\/?#]+)\.[^\/?#]+$/)
                        let depName = match ? match[1] : null

                        if (!depName && !depUrl.startsWith("https://")) {
                          depName = depValue
                          depUrl = `https://ui.shadcn.com/docs/components/${depValue}`
                        } else depName

                        return (
                          <ListItem key={idx} className="text-foreground/80">
                            <Link
                              href={depUrl}
                              className="transition-color text-base font-medium underline underline-offset-4 ease-in-out hover:text-foreground/70"
                            >
                              {toWordCase(depName!)}
                            </Link>
                          </ListItem>
                        )
                      })}
                    </List>
                  </StepperDescription>
                </StepperContent>
              </StepperItem>
            )}

            <StepperItem>
              <StepperConnector>
                <StepperDot>{++stepCounter}</StepperDot>
                <StepperLine />
              </StepperConnector>

              <StepperContent>
                <StepperTitle>Install dependencies:</StepperTitle>
                <StepperDescription>
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
                </StepperDescription>
              </StepperContent>
            </StepperItem>

            <StepperItem>
              <StepperConnector>
                <StepperDot>{++stepCounter}</StepperDot>
                <StepperLine />
              </StepperConnector>

              <StepperContent>
                <StepperTitle>Add util file:</StepperTitle>
                <StepperDescription className="pt-5">
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
                </StepperDescription>
              </StepperContent>
            </StepperItem>
            <StepperItem>
              <StepperConnector>
                <StepperDot>{++stepCounter}</StepperDot>
                <StepperLine />
              </StepperConnector>

              <StepperContent>
                <StepperTitle>
                  Copy and paste the following code or download the file into
                  your project.
                </StepperTitle>
                <StepperDescription>
                  <CodeBlockWrapper>
                    <CodeBlock
                      language="tsx"
                      filename={`${name}.tsx`}
                      code={code}
                      className="mb-7 mt-5 border"
                    />
                  </CodeBlockWrapper>
                </StepperDescription>
              </StepperContent>
            </StepperItem>

            {extraFiles?.map(async (file, idx) => {
              const filePath = file.path
              const fileName = filePath.split("/").pop() as string
              const fileNameWithoutExtension = fileName.split(".")[0]

              const fileContent = await getFileContent(filePath)

              return (
                <StepperItem key={idx}>
                  <StepperConnector>
                    <StepperDot>{++stepCounter}</StepperDot>
                    <StepperLine />
                  </StepperConnector>

                  <StepperContent>
                    <StepperTitle>
                      Add{" "}
                      <span className="rounded-sm bg-muted px-1 font-mono text-sm font-normal">
                        {fileNameWithoutExtension}
                      </span>{" "}
                      {file.type.split(":").at(-1)}:
                    </StepperTitle>
                    <StepperDescription className="pt-5">
                      <CodeBlockWrapper>
                        <CodeBlock
                          language="tsx"
                          filename={fileName}
                          code={fileContent}
                          className="mb-7 border"
                        />
                      </CodeBlockWrapper>
                    </StepperDescription>
                  </StepperContent>
                </StepperItem>
              )
            })}

            {!!tailwind && (
              <StepperItem>
                <StepperConnector>
                  <StepperDot>{++stepCounter}</StepperDot>
                  <StepperLine />
                </StepperConnector>

                <StepperContent>
                  <StepperTitle>
                    Add the followind to your{" "}
                    <span className="rounded-md bg-muted px-1 font-mono text-sm font-normal">
                      tailwind.config.ts
                    </span>{" "}
                    file:
                  </StepperTitle>
                  <StepperDescription>
                    <CodeBlockWrapper>
                      <CodeBlock
                        language="ts"
                        filename="tailwind.config.ts"
                        code={`const config = ${JSON.stringify(tailwind.config, null, 2)}`}
                        className="mb-7 mt-5 border"
                      />
                    </CodeBlockWrapper>
                  </StepperDescription>
                </StepperContent>
              </StepperItem>
            )}

            <StepperItem>
              <StepperConnector>
                <StepperDot>{++stepCounter}</StepperDot>
              </StepperConnector>

              <StepperContent>
                <StepperTitle>
                  Update the import paths to match your project setup.
                </StepperTitle>
              </StepperContent>
            </StepperItem>
          </Stepper>
        </TabsContent>
      </Tabs>
    </>
  )
}
