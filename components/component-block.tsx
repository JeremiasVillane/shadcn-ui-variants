import dynamic from "next/dynamic"
import { config } from "@/config"
import { Copy, Info } from "lucide-react"

import { getFileContent } from "@/lib/file"
import { cn } from "@/lib/utils"

import { CodeBlock } from "./code-block"
import { ComponentPlayground } from "./component-playground"
import { CopyToClipboardButton } from "./copy-to-clipboard-button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface ComponentBlockProps {
  title: string
  name: string
  description?: React.ReactNode
  credit?: {
    label: string
    link: string
  }
  playground: Record<string, (string | number)[] | string | number | boolean>
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
  className?: string
  children?: React.ReactNode
}

export default async function ComponentBlock({
  title,
  name,
  description,
  credit,
  playground,
  PlaygroundComponent,
  playgroundCode,
  className
}: ComponentBlockProps) {
  const src = `components/ui/${name}.tsx`
  const code = await getFileContent(src)
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  // const registryUrl = `${protocol}://${config.appUrl}/r/${name}.json`

  // Dynamically import the component from its path
  // const DynamicComponent = dynamic(() =>
  //   import(`@/components/customized/${type}/${name}.tsx`).catch(
  //     () => BlockNotFound
  //   )
  // )

  return (
    <main
      className={cn("flex flex-col rounded-md bg-background px-3", className)}
    >
      <ComponentPlayground
        {...{
          title,
          name,
          code,
          playground,
          PlaygroundComponent,
          playgroundCode
        }}
      />

      <section className="flex h-10 items-center justify-between border-b border-muted pl-1">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold">{title}</span>
          {credit && (
            <a
              href={credit.link}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs text-muted-foreground hover:text-foreground hover:underline"
            >
              (Credits to {credit.label})
            </a>
          )}
          {description && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="flex items-center gap-2">
          <CopyToClipboardButton
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground"
            content={code}
          >
            <Copy />
          </CopyToClipboardButton>
        </div>
      </section>

      <section className="flex min-h-32 w-full flex-1 items-center justify-center rounded px-1 py-5">
        <CodeBlock
          code={code}
          // registryUrl={registryUrl}
        />
        {/* <DynamicComponent /> */}
      </section>
    </main>
  )
}

const BlockNotFound = () => <p>Block not found</p>
