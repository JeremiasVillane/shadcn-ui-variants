import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { WebSite, WithContext } from "schema-dts"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import "../styles/globals.css"

import { getComponentDocumentation } from "@/actions"
import { components } from "@/data/site-index"
import { publicUrl } from "@/env.mjs"

import { cn } from "@/lib/utils"

const geist = Geist({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})
const geistMono = Geist_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: "Shadcn UI Variants",
  description:
    "Custom variations of shadcn/ui components with interactive playgrounds.",
  keywords: [
    "Shadcn UI components",
    "Shadcn UI variants",
    "Shadcn UI previews",
    "UI blocks for developers",
    "Shadcn UI code snippets",
    "Shadcn UI examples",
    "Shadcn UI customization",
    "Preview Shadcn UI components",
    "Shadcn UI examples for websites",
    "Copy Shadcn UI code snippets",
    "UI design components",
    "Custom Shadcn UI components",
    "Free Shadcn UI components",
    "New Shadcn UI components"
  ],
  icons: [
    {
      url: "/apple-touch-icon.png",
      type: "image/png",
      rel: "apple-touch-icon"
    },
    {
      sizes: "96x96",
      url: "/favicon-96x96.png",
      type: "image/png",
      rel: "icon"
    }
  ],
  openGraph: {
    title:
      "Customized Shadcn UI Components | Code Snippets & Interactive Playgrounds",
    description:
      "Custom variations of shadcn/ui components with interactive playgrounds",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        height: 630,
        width: 1200,
        alt: "Shadcn UI Component Variants with Interactive Playground"
      }
    ]
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shadcn UI Variants",
    url: publicUrl
  }

  const navComponentCards = await Promise.all(
    components.map(async (component) => {
      const docs = await getComponentDocumentation(
        `components/ui/${component.name}.tsx`
      )
      return docs.data || null
    })
  ).then((res) => res.filter((c) => !!c))

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geist.className, geistMono.variable, "antialiased")}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />

        <ThemeProvider attribute="class" disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader navComponentCards={navComponentCards} />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
