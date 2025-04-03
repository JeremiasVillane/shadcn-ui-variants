import { getFileContent } from "@/lib/file"
import { cn } from "@/lib/utils"

import ComponentInstallation from "./component-installation"
import { ComponentPlayground } from "./component-playground"

interface ComponentBlockProps {
  title: string
  name: string
  credit?: {
    label: string
    link: string
  }
  playground: Record<string, (string | number)[] | string | number | boolean>
  cliCommand?: string
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
  className?: string
  children?: React.ReactNode
}

export default async function ComponentBlock({
  title,
  name,
  credit,
  playground,
  cliCommand,
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
  //   import(`@/components/data/components-index/${name}/${example}.tsx`).catch(
  //     () => BlockNotFound
  //   )
  // )

  return (
    <main className={cn("flex flex-col rounded-md bg-background", className)}>
      <ComponentPlayground
        {...{
          title,
          name,
          playground,
          PlaygroundComponent,
          playgroundCode
        }}
      />

      <ComponentInstallation {...{ name, code, cliCommand }} />
    </main>
  )
}

// const BlockNotFound = () => <p>Block not found</p>
