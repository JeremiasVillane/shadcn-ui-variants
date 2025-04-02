import { notFound } from "next/navigation"
import { componentsIndex } from "@/data/components-index"

import { constructMetadata } from "@/lib/metadata"
import { generateOgImageUrl } from "@/lib/og"
import { absoluteUrl, cn } from "@/lib/utils"
import ComponentBlock from "@/components/component-block"
import { DescriptionText, MainHeading } from "@/app/components/typography"

export const generateStaticParams = async () => {
  return Object.keys(componentsIndex).map((component) => ({
    component
  }))
}

export const generateMetadata = async (props: {
  params: Promise<{ component: string }>
}) => {
  const params = await props.params
  const details =
    componentsIndex[params.component as keyof typeof componentsIndex]
  const variants = componentsIndex[
    params.component as keyof typeof componentsIndex
  ].playground.variant as unknown as string[]

  const title = `Shadcn UI Variants | Discover ${variants.length} new custom ${details.title} variants`
  const description = `${variants.length} custom variants for Shadcn UI ${details.title} component. Preview, customize, and copy ready-to-use code snippets to streamline your web development workflow.`

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
      canonical: absoluteUrl(`/components/${params.component}`)
    }
  })
}

interface ComponentPageProps {
  params: Promise<{ component: string }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const component = (await params).component
  const details = componentsIndex[component as keyof typeof componentsIndex]
  // const components =
  //   customVariants[component as keyof typeof customVariants] || []

  if (!details) return notFound()

  return (
    <div>
      <MainHeading>{details.title}</MainHeading>
      <DescriptionText className="mt-2">{details.description}</DescriptionText>

      <div className={cn("mt-12 grid gap-2", details.className)}>
        <ComponentBlock
          key={component}
          title={details.title}
          name={details.componentName}
          playground={details.playground}
          PlaygroundComponent={details.PlaygroundComponent}
          playgroundCode={details.playgroundCode}
        />

        {/* {components.map((component, index) => (
          <ComponentBlock key={`${component.title}-${index}`} {...component} />
        ))} */}
      </div>
    </div>
  )
}
