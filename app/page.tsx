import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  GalleryVerticalEnd,
  Layers,
  Paintbrush
} from "lucide-react"

import { BlurFade } from "@/components/ui/blur-fade"
import { BlurIn } from "@/components/ui/blur-in"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DotBackground } from "@/components/ui/dot-background"
import { GridBackground } from "@/components/ui/grid-background"
import { WordFadeIn } from "@/components/ui/word-fade-in"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore and implement beautiful custom variations of shadcn/ui components with interactive playgrounds."
}

const cardStyle =
  "flex w-full h-full cursor-default flex-col items-center justify-center overflow-hidden p-20 shadow-lg hover:border-foreground/20 transition-colors ease-in-out"
const titleStyle = "flex flex-col items-center justify-center whitespace-nowrap"
const subtitleStyle = "text-balance pb-2 leading-tight"
const descriptionStyle = "text-sm text-muted-foreground hidden md:flex"

export default function Home() {
  return (
    <DotBackground
      className="flex h-full flex-1 flex-col"
      bgStyle="opacity-50 bg-background/30"
    >
      <section className="relative flex h-[80vh] w-full items-center justify-center md:h-screen">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <BlurFade>
              <GalleryVerticalEnd className="size-24" />
            </BlurFade>
            <WordFadeIn words="Shadcn UI Variants" className="text-5xl" />
            <div className="space-y-2 pt-3">
              <BlurIn
                duration={0.25}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                word="Custom Variants for shadcn/ui"
              />
              <BlurIn
                duration={0.5}
                word="Explore and implement beautiful custom variations of shadcn/ui
                components with interactive playgrounds."
                className="mx-auto max-w-[700px] text-base text-muted-foreground md:text-xl"
              />
            </div>

            <BlurFade className="space-x-4 py-6">
              <Link href="/components/accordion">
                <Button
                  iconRight={<ArrowRight />}
                  iconAnimation="translateXRight"
                >
                  Explore Components
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline">Documentation</Button>
              </Link>
            </BlurFade>
          </div>
        </div>
      </section>

      <section className="relative flex h-[90vh] w-full items-center justify-center p-12">
        <article className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-12 text-center md:gap-8">
            <BlurFade inView delay={0.3} duration={0.7} className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to customize and extend shadcn/ui components
              </p>
            </BlurFade>

            <div className="flex h-[600px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
              <BlurFade inView delay={0.3} duration={0.3}>
                <Card className={cardStyle}>
                  <header className="pb-2">
                    <div className={titleStyle}>
                      <Paintbrush className="mb-2 size-6" />
                      <h3>Custom Variants</h3>
                    </div>
                    <p className={subtitleStyle}>
                      Explore beautiful custom variants
                    </p>
                  </header>

                  <p className={descriptionStyle}>
                    Each component comes with multiple custom variants that you
                    can easily copy and use in your projects.
                  </p>
                </Card>
              </BlurFade>

              <BlurFade inView delay={0.5} duration={0.5}>
                <Card className={cardStyle}>
                  <header className="pb-2">
                    <div className={titleStyle}>
                      <Layers className="mb-2 size-6" />
                      <h3>Interactive Playground</h3>
                    </div>
                    <p className={subtitleStyle}>
                      Test and customize components
                    </p>
                  </header>

                  <p className={descriptionStyle}>
                    Modify component props and see the changes instantly with
                    our interactive playground.
                  </p>
                </Card>
              </BlurFade>

              <BlurFade inView delay={0.6} duration={0.8}>
                <Card className={cardStyle}>
                  <header className="pb-2">
                    <div className={titleStyle}>
                      <GalleryVerticalEnd className="mb-2 size-6" />
                      <h3>Code Snippets</h3>
                    </div>
                    <p className={subtitleStyle}>View and copy complete code</p>
                  </header>

                  <p className={descriptionStyle}>
                    Get the exact code you need for each custom component,
                    including installation instructions.
                  </p>
                </Card>
              </BlurFade>
            </div>
          </div>
        </article>
      </section>
    </DotBackground>
  )
}
