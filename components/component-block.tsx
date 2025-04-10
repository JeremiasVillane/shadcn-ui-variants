import { ComponentDoc } from "@/types"

import { getFileContent } from "@/lib/file"
import { Separator } from "@/components//ui/separator"

import ComponentAPI from "./component-api"
import ComponentInstallation from "./component-installation"
import { ComponentPlayground } from "./component-playground"

interface ComponentBlockProps {
  name: string
  title: string
  dependencies: string[] | undefined
  registryDependencies: string[] | undefined
  tailwind: Record<string, any> | undefined
  docs: {
    data: ComponentDoc
    error?: undefined
  }
  playground: { [x: string]: string | number | boolean | string[] }
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
  children?: React.ReactNode
}

export default async function ComponentBlock({
  name,
  title,
  dependencies,
  registryDependencies,
  tailwind,
  docs,
  playground,
  PlaygroundComponent,
  playgroundCode
}: ComponentBlockProps) {
  const src = `components/ui/${name}.tsx`
  const code = await getFileContent(src)

  return (
    <main className="flex flex-col rounded-md bg-background pb-96">
      <ComponentPlayground
        {...{ name, title, playground, PlaygroundComponent, playgroundCode }}
      />

      <Separator className="my-9" />

      <ComponentInstallation
        {...{ name, code, dependencies, registryDependencies, tailwind }}
      />

      <Separator className="my-9" />

      <ComponentAPI {...{ docs }} />
    </main>
  )
}
