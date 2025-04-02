import { Metadata } from "next"

export const constructMetadata = (metadata: Metadata): Metadata => {
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title!,
      description: metadata.description!,
      siteName: "Shadcn UI Variants",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          height: 630,
          width: 1200,
          alt: "Shadcn UI Variants"
        }
      ],
      locale: "en_US",
      ...metadata.openGraph
    },
    authors: [
      {
        name: "Jeremias Villane",
        url: "https://github.com/JeremiasVillane"
      }
    ],
    manifest: "/site.webmanifest",
    ...metadata
  }
}
