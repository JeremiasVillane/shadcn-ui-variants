"use client"

import { TagBox, TagType } from "@/components/ui/tag-box"

export function TagBoxExample1() {
  const tags: TagType[] = [
    { id: "1", name: "React", color: "#61DAFB" },
    { id: "2", name: "Next.js", color: "#B64343" },
    { id: "3", name: "TypeScript", color: "#3178C6" },
    { id: "4", name: "Radix UI", color: "#7E5BEF" },
    { id: "5", name: "Tailwind CSS", color: "#06B6D4" },
    { id: "7", name: "CSS", color: "#1572B6" },
    { id: "8", name: "JavaScript", color: "#F7DF1E" }
  ]

  return (
    <TagBox
      userTags={tags}
      defaultValue={tags.slice(0, 3)}
      maxTags={6}
      showMaxTags={true}
      placeholderWhenFull="Maximum of 6 tags reached"
    />
  )
}
