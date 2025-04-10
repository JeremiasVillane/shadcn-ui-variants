import { Metadata } from "next"

/** This function constructs the metadata for the application,
 * including title, description, Open Graph data, and authors.
 * It also includes a manifest file for the application.
 *
 * @param {Metadata} metadata - The metadata object containing the title, description, and Open Graph data.
 * @returns {Metadata} - The constructed metadata object.
 */
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
          url: "/og-image.png",
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
