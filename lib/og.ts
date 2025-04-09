import { publicUrl } from "@/env.mjs"

export const generateOgImageUrl = ({
  title,
  type,
  mode = "light"
}: {
  title: string
  type: string
  mode?: "light" | "dark"
}) => {
  const url = publicUrl

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", title)
  ogUrl.searchParams.set("type", type)
  ogUrl.searchParams.set("mode", mode)

  return ogUrl.toString()
}
