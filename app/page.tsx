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
import { ScrollDownButton } from "@/components/ui/scroll-down-button"
import { WordFadeIn } from "@/components/ui/word-fade-in"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore and implement beautiful custom variations of shadcn/ui components with interactive playgrounds."
}

const cardStyle =
  "flex w-full h-full cursor-default flex-col items-center justify-center overflow-hidden p-20 shadow-lg hover:border-foreground/20 transition-colors ease-in-out gap-2"
const titleStyle = "flex flex-col items-center justify-center whitespace-nowrap"
const subtitleStyle = "pb-2 leading-tight text-pretty py-2 md:py-0"
const descriptionStyle = "text-sm text-muted-foreground hidden md:flex"

export default function Home() {
  return (
    <DotBackground
      className="flex h-full flex-1 flex-col"
      bgStyle="opacity-50 bg-background/30"
    >
      <section className="relative flex h-screen w-full items-center justify-center md:h-screen">
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
                word="New variants for shadcn/ui"
              />
              <BlurIn
                duration={0.5}
                word="Explore and implement enhanced variations of shadcn/ui
                components with interactive playgrounds."
                className="mx-auto max-w-[700px] text-base text-muted-foreground md:text-xl"
              />
            </div>

            <BlurFade className="flex w-full flex-col justify-center gap-3 space-x-0 px-20 py-6 md:flex-row md:items-center md:gap-0 md:space-x-4 md:px-0">
              <Link href="/components/accordion">
                <Button
                  iconRight={<ArrowRight />}
                  iconAnimation="translateXRight"
                  className="w-full md:w-fit"
                >
                  Explore Components
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="w-full">
                  Documentation
                </Button>
              </Link>
            </BlurFade>
          </div>

          <ScrollDownButton
            targetId="features"
            offset={100}
            className="mx-auto mt-6 w-full"
          />
        </div>
      </section>

      <section className="relative flex min-h-screen w-full items-center justify-center p-12">
        <article className="container px-4 md:px-6">
          <div
            id="features"
            className="flex flex-col items-center justify-center space-y-12 text-center md:gap-8"
          >
            <BlurFade inView delay={0.3} duration={0.7} className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to customize and extend shadcn/ui components
              </p>
            </BlurFade>

            <div className="flex min-h-[600px] w-full flex-col gap-4 lg:min-h-[250px] lg:flex-row">
              <BlurFade inView delay={0.3} duration={0.3}>
                <Card className={cardStyle}>
                  <header>
                    <div className={titleStyle}>
                      <Paintbrush className="mb-2 size-6" />
                      <h3 className="leading-tight">Custom Variants</h3>
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
                  <header>
                    <div className={titleStyle}>
                      <Layers className="mb-2 size-6" />
                      <h3 className="text-pretty leading-tight md:text-nowrap">
                        Interactive Playground
                      </h3>
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
                  <header>
                    <div className={titleStyle}>
                      <GalleryVerticalEnd className="mb-2 size-6" />
                      <h3 className="leading-tight">Code Snippets</h3>
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
