import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  GalleryVerticalEnd,
  Layers,
  Paintbrush
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/ui/dot-pattern"
import { MagicCard, MagicContainer } from "@/components/ui/magic-card"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore and implement beautiful custom variations of shadcn/ui components with interactive playgrounds."
}

const cardStyle =
  "flex w-full h-full cursor-default flex-col items-center justify-center overflow-hidden p-20 shadow-2xl"
const titleStyle = "flex flex-col items-center justify-center whitespace-nowrap"
const subtitleStyle = "text-balance pb-2 leading-tight"
const descriptionStyle = "text-sm text-muted-foreground hidden md:flex"

const GradientDiv = () => (
  <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
)

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative h-screen w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Custom Variants for shadcn/ui
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore and implement beautiful custom variations of shadcn/ui
                components with interactive playgrounds.
              </p>
            </div>

            <div className="space-x-4">
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
            </div>
          </div>
        </div>
        <DotPattern
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "h-full [mask-image:linear-gradient(to_bottom_right,white,transparent,white)]"
          )}
        />
      </section>

      <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to customize and extend shadcn/ui components
              </p>
            </div>

            <MagicContainer className="flex h-[600px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
              <MagicCard className={cardStyle}>
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

                <GradientDiv />
              </MagicCard>

              <MagicCard className={cardStyle}>
                <header className="pb-2">
                  <div className={titleStyle}>
                    <Layers className="mb-2 size-6" />
                    <h3>Interactive Playground</h3>
                  </div>
                  <p className={subtitleStyle}>Test and customize components</p>
                </header>

                <p className={descriptionStyle}>
                  Modify component props and see the changes instantly with our
                  interactive playground.
                </p>

                <GradientDiv />
              </MagicCard>

              <MagicCard className={cardStyle}>
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

                <GradientDiv />
              </MagicCard>
            </MagicContainer>
          </div>
        </div>
      </section>
    </main>
  )
}
