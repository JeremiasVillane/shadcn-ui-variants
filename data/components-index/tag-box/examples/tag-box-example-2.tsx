"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import { TagBox, TagType } from "@/components/ui/tag-box"

export function TagBoxExample2() {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([
    { id: "1", name: "Priority", color: "#FF5630" }
  ])
  const [allTags, setAllTags] = useState<TagType[]>([
    { id: "1", name: "Priority", color: "#FF5630" },
    { id: "2", name: "In Progress", color: "#FF8B00" },
    { id: "3", name: "Completed", color: "#36B37E" }
  ])

  const handleTagEdit = (updatedTag: TagType) => {
    setAllTags(
      allTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    )
  }

  const handleTagRemove = (tagToRemove: TagType) => {
    setAllTags(allTags.filter((tag) => tag.id !== tagToRemove.id))
  }

  return (
    <TagBox
      value={selectedTags}
      onChange={setSelectedTags}
      userTags={allTags}
      onTagEdit={handleTagEdit}
      onTagRemove={handleTagRemove}
      className="rounded-lg border bg-muted/10 p-4 shadow-md"
      tagClassName="font-medium"
      leftElement={<Star />}
      shape="rounded"
      tagsPosition="inner"
      placeholder="Add project status..."
    />
  )
}
