import { ComponentDoc, RegistryItem } from "@/types"

import { getFileContent } from "@/lib/file-utils"
import { Separator } from "@/components//ui/separator"

import ComponentAPI from "./component-api"
import { ComponentDemo } from "./component-demo"
import ComponentInstallation from "./component-installation"
import ComponentPlayground from "./component-playground"

interface ComponentBlockProps {
  registryItem: RegistryItem
  docs: {
    data: ComponentDoc
    error?: undefined
  }
  playground: { [x: string]: string | number | boolean | string[] }
  PlaygroundComponent?: (...args: any[]) => React.JSX.Element
  playgroundCode?: (...args: any[]) => string
  DemoComponent?: () => React.JSX.Element
  ExtrasComponent?: () => React.JSX.Element | Promise<React.JSX.Element>
  ApiReference?: () => React.JSX.Element
  children?: React.ReactNode
}

export async function ComponentBlock({
  registryItem,
  docs,
  playground,
  PlaygroundComponent,
  playgroundCode,
  DemoComponent,
  ExtrasComponent,
  ApiReference
}: ComponentBlockProps) {
  const src = `components/ui/${registryItem.name}.tsx`
  const code = await getFileContent(src)

  const demoSrc = `data/components-index/${registryItem.name}/${registryItem.name}-demo.tsx`
  const demoCode = !!DemoComponent ? await getFileContent(demoSrc) : null

  return (
    <main className="pb-96">
      {!!PlaygroundComponent && !!playgroundCode && (
        <ComponentPlayground
          {...{
            name: registryItem.name,
            title: registryItem.title,
            playground,
            PlaygroundComponent,
            playgroundCode
          }}
        />
      )}

      {!!DemoComponent && !!demoCode && (
        <ComponentDemo
          {...{
            name: registryItem.name,
            title: registryItem.title,
            DemoComponent,
            demoCode
          }}
        />
      )}

      <ComponentInstallation {...{ registryItem, code }} />

      {!!ExtrasComponent && <ExtrasComponent />}

      {!!ApiReference ? (
        <ApiReference />
      ) : (
        <ComponentAPI {...{ docs, name: registryItem.name }} />
      )}
    </main>
  )
}
