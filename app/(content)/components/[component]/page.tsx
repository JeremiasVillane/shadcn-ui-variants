import Link from "next/link"
import { notFound } from "next/navigation"
import { getComponentDocumentation } from "@/actions"
import { componentsIndex } from "@/data/components-index"
import { publicUrl } from "@/env.mjs"
import registry from "@/registry.json"
import { RegistryItem } from "@/types"
import { ExternalLink } from "lucide-react"

import { constructMetadata } from "@/lib/metadata"
import { generateOgImageUrl } from "@/lib/og"
import { createPlayground } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DynamicBreadcrumb } from "@/components/ui/dynamic-breadcrumb"
import { Separator } from "@/components/ui/separator"
import ComponentBlock from "@/components/component-block"
import { DescriptionText, MainHeading } from "@/components/typography"

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
          alt: "Custom Shadcn UI Component Variants"
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

  if (!indexData) return notFound()

  const registryItem = registry.items.find(
    (comp) => comp.name === nameParams
  )! as RegistryItem
  const docs = await getComponentDocumentation(
    `components/ui/${nameParams}.tsx`
  )
  const playground = { ...createPlayground(docs), ...indexData.playground }

  if (!docs.data) {
    return <div>{docs.error}</div>
  }

  return (
    <div>
      <DynamicBreadcrumb activeLinks={false} separatorVariant="chevrons" />
      <MainHeading>{registryItem.title}</MainHeading>
      <DescriptionText>{registryItem.description}</DescriptionText>
      {!!registryItem.dependencies &&
        registryItem.dependencies[0].startsWith("@radix-ui") &&
        registryItem.name !== "button" && (
          <Link
            href={`https://www.radix-ui.com/docs/primitives/components/${registryItem.name}#api-reference`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge className="mt-3 flex w-fit items-center justify-center gap-1 bg-muted text-foreground/80 hover:text-background/80">
              Official API Reference <ExternalLink className="size-3" />
            </Badge>
          </Link>
        )}

      <Separator className="mb-8 mt-6" />

      <ComponentBlock
        {...{
          registryItem,
          docs,
          playground,
          PlaygroundComponent: indexData.PlaygroundComponent,
          playgroundCode: indexData.playgroundCode
        }}
      />
    </div>
  )
}
