import { ComponentDoc } from "@/types"

import { getFileContent } from "@/lib/file"
import { Separator } from "@/components//ui/separator"

import ComponentAPI from "./component-api"
import ComponentInstallation from "./component-installation"
import { ComponentPlayground } from "./component-playground"

interface ComponentBlockProps {
  docs: {
    data: ComponentDoc
    error?: undefined
  }
  cliCommand?: string
  playground: { [x: string]: string | number | boolean | string[] }
  PlaygroundComponent: (...args: any[]) => React.JSX.Element
  playgroundCode: (...args: any[]) => string
  children?: React.ReactNode
}

export default async function ComponentBlock({
  docs,
  cliCommand,
  playground,
  PlaygroundComponent,
  playgroundCode
}: ComponentBlockProps) {
  const src = `components/ui/${docs.data?.name}.tsx`
  const code = await getFileContent(src)

  return (
    <main className="flex flex-col rounded-md bg-background pb-96">
      <ComponentPlayground
        name={docs.data.name}
        title={docs.data.title}
        playground={playground}
        PlaygroundComponent={PlaygroundComponent}
        playgroundCode={playgroundCode}
      />

      <Separator className="my-9" />

      <ComponentInstallation {...{ name: docs.data.name, code, cliCommand }} />

      <Separator className="my-9" />

      <ComponentAPI {...{ docs }} />
    </main>
  )
}
