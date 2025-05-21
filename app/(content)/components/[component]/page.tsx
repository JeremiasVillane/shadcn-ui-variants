import Link from "next/link"
import { notFound } from "next/navigation"
import { getComponentDocumentation } from "@/actions"
import { componentsIndex } from "@/data/components-index"
import { env, publicUrl } from "@/env.mjs"
import { createPlayground } from "@/helpers/create-playground"
import registry from "@/registry.json"
import { RegistryItem } from "@/types"
import { ExternalLink } from "lucide-react"

import { constructMetadata } from "@/lib/metadata"
import { generateOgImageUrl } from "@/lib/og"
import { Badge } from "@/components/ui/badge"
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb"
import { H1, Lead } from "@/components/ui/prose"
import { Separator } from "@/components/ui/separator"
import { ComponentBlock } from "@/components/component-view"

export const generateStaticParams = async () => {
  return Object.keys(componentsIndex).map((component) => ({
    component
  }))
}

export const generateMetadata = async (props: {
  params: Promise<{ component: string }>
}) => {
  const nameParams = (await props.params).component
  const componentData = registry.items.find(
    (comp) => comp.name === nameParams
  ) as RegistryItem

  if (!componentData) return

  const title = `Shadcn UI Variants | ${componentData.title}`

  const description = `${componentData.description} Preview, customize, copy and install ${componentData.title} component variants to streamline your web development workflow.`

  return constructMetadata({
    title,
    description,
    openGraph: {
      images: [
        {
          url: generateOgImageUrl({
            title,
            type: "Component"
          }),
          width: 1200,
          height: 630,
          alt: `Custom Shadcn UI ${componentData.title} Variants`
        }
      ]
    },
    alternates: {
      canonical: `${publicUrl}/components/${nameParams}`
    }
  })
}

interface ComponentPageProps {
  params: Promise<{ component: string }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const nameParams = (await params).component
  const indexData = componentsIndex[nameParams]

  if (!indexData) {
    console.warn(
      `Component ${nameParams} not found in componentsIndex. Please check the index file.`
    )
    return notFound()
  }

  const registryItem = registry.items.find(
    (comp) => comp.name === nameParams
  )! as RegistryItem

  const docs = await getComponentDocumentation(
    `components/ui/${nameParams}.tsx`,
    env.API_KEY
  )
  const playground = { ...createPlayground(docs), ...indexData.playground }

  if (!docs.data) {
    return <div>{docs.error}</div>
  }

  return (
    <div>
      <DynamicBreadcrumb activeLinks={false} separatorVariant="chevrons" />
      <H1>{registryItem.title}</H1>
      <Lead>{registryItem.description}</Lead>

      {!!registryItem.dependencies &&
        registryItem.dependencies[0].startsWith("@radix-ui") &&
        registryItem.name !== "button" && (
          <Link
            href={`https://www.radix-ui.com/docs/primitives/components/${registryItem.name}#api-reference`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="mt-3 flex w-fit cursor-pointer items-center justify-center gap-1 bg-muted text-foreground/80 hover:text-background/80">
              Official API Reference <ExternalLink className="size-3" />
            </Badge>
          </Link>
        )}

      {!!registryItem.author && (
        <div className="text-right text-xs text-foreground/50">
          {registryItem.author}
        </div>
      )}

      <Separator variant="invisible" className="mb-8" />

      <ComponentBlock
        {...{
          registryItem,
          docs,
          playground,
          PlaygroundComponent: indexData.PlaygroundComponent,
          playgroundCode: indexData.playgroundCode,
          DemoComponent: indexData.DemoComponent,
          ExtrasComponent: indexData.ExtrasComponent,
          ApiReference: indexData.ApiReference
        }}
      />
    </div>
  )
}
