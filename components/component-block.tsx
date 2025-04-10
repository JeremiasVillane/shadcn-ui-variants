import { ComponentDoc, RegistryItem } from "@/types"

import { getFileContent } from "@/lib/file"
import { Separator } from "@/components//ui/separator"

import ComponentAPI from "./component-api"
import ComponentInstallation from "./component-installation"
import { ComponentPlayground } from "./component-playground"

interface ComponentBlockProps {
  registryItem: RegistryItem
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
  registryItem,
  docs,
  playground,
  PlaygroundComponent,
  playgroundCode
}: ComponentBlockProps) {
  const src = `components/ui/${registryItem.name}.tsx`
  const code = await getFileContent(src)

  return (
    <main className="flex flex-col rounded-md bg-background pb-96">
      <ComponentPlayground
        {...{
          name: registryItem.name,
          title: registryItem.title,
          playground,
          PlaygroundComponent,
          playgroundCode
        }}
      />

      <Separator className="my-9" />

      <ComponentInstallation {...{ registryItem, code }} />

      <Separator className="my-9" />

      <ComponentAPI {...{ docs }} />
    </main>
  )
}
