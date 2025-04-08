import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import "../styles/globals.css"

import { getComponentDocumentation } from "@/actions"
import { components } from "@/data/site-index"

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
    "Custom variations of shadcn/ui components with interactive playgrounds"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
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
