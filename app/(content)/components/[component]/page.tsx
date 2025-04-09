import { notFound } from "next/navigation"
import { getComponentDocumentation } from "@/actions"
import { componentsIndex } from "@/data/site-index"
import { publicUrl } from "@/env.mjs"

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
  const name = (await props.params).component
  const docs = await getComponentDocumentation(`components/ui/${name}.tsx`)

  if (!docs.data) return

  const title = `Shadcn UI Variants | ${docs.data.title}`

  const description = `${docs.data.description} Preview, customize, copy and install ${docs.data.title} component variants to streamline your web development workflow.`

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
      canonical: `${publicUrl}/components/${name}`
    }
  })
}

interface ComponentPageProps {
  params: Promise<{ component: string }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const name = (await params).component
  const details = componentsIndex[name]

  if (!details) return notFound()

  const docs = await getComponentDocumentation(`components/ui/${name}.tsx`)
  const playground = { ...createPlayground(docs), ...details.playground }

  if (!docs.data) {
    return <div>{docs.error}</div>
  }

  return (
    <div>
      <DynamicBreadcrumb activeLinks={false} separatorVariant="chevrons" />
      <MainHeading>{docs.data.title}</MainHeading>
      <DescriptionText>{docs.data.description}</DescriptionText>

      <Separator className="mb-8 mt-6" />

      <ComponentBlock
        docs={docs}
        cliCommand={details.cliCommand}
        playground={playground}
        PlaygroundComponent={details.PlaygroundComponent}
        playgroundCode={details.playgroundCode}
      />
    </div>
  )
}
