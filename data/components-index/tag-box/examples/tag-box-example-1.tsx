"use client"

import { TagBox, TagType } from "@/components/ui/tag-box"

export function TagBoxExample1() {
  const tags: TagType[] = [
    { id: "1", name: "React", color: "#61DAFB" },
    { id: "2", name: "Next.js", color: "#B64343" },
    { id: "3", name: "TypeScript", color: "#3178C6" },
    { id: "4", name: "Radix UI", color: "#7E5BEF" }
  ]

  return (
    <TagBox
      defaultValue={tags}
      maxTags={6}
      showMaxTags={true}
      placeholderWhenFull="Maximum of 6 tags reached"
    />
  )
}
