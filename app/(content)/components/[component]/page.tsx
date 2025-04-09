import { notFound } from "next/navigation"
import { getComponentDocumentation } from "@/actions"
import { componentsIndex } from "@/data/components-index"
import { publicUrl } from "@/env.mjs"
import registry from "@/registry.json"

import { constructMetadata } from "@/lib/metadata"
import { generateOgImageUrl } from "@/lib/og"
import { createPlayground } from "@/lib/utils"
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
  const componentData = registry.items.find((comp) => comp.name === nameParams)

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
  const details = componentsIndex[nameParams]

  if (!details) return notFound()

  const { name, title, description } = registry.items.find(
    (comp) => comp.name === nameParams
  )!
  const docs = await getComponentDocumentation(
    `components/ui/${nameParams}.tsx`
  )
  const playground = { ...createPlayground(docs), ...details.playground }

  if (!docs.data) {
    return <div>{docs.error}</div>
  }

  return (
    <div>
      <DynamicBreadcrumb activeLinks={false} separatorVariant="chevrons" />
      <MainHeading>{title}</MainHeading>
      <DescriptionText>{description}</DescriptionText>

      <Separator className="mb-8 mt-6" />

      <ComponentBlock
        name={name}
        title={title}
        docs={docs}
        cliCommand={details.cliCommand}
        playground={playground}
        PlaygroundComponent={details.PlaygroundComponent}
        playgroundCode={details.playgroundCode}
      />
    </div>
  )
}
