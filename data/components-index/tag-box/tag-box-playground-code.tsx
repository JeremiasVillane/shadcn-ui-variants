"use client"

import { TagBoxProps } from "@/components/ui/tag-box"

export const tagBoxPlaygroundCode = ({
  maxTags,
  showMaxTags,
  placeholder,
  placeholderWhenFull,
  withColor,
  openOnFocus,
  enableCreate,
  enableManage,
  tagsPosition,
  disabled
}: TagBoxProps): string => {
  const code = `"use client"

import { useState } from "react"

import { toast } from "@/components/ui/simple-toast"
import { TagBox, TagType } from "@/components/ui/tag-box"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/local/ui/card"

export function TagBoxPlayground() {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [allTags, setAllTags] = useState<TagType[]>([
    { id: "1", name: "Important", color: "#FF5630" },
    { id: "2", name: "Bug", color: "#FF8B00" },
    { id: "3", name: "Feature", color: "#36B37E" },
    { id: "4", name: "Enhancement", color: "#00B8D9" },
    { id: "5", name: "Documentation", color: "#6554C0" },
    { id: "6", name: "Design", color: "#403294" },
    { id: "7", name: "Testing", color: "#0052CC" },
    { id: "8", name: "Security", color: "#BF2600" },
    { id: "9", name: "Performance", color: "#006644" },
    { id: "10", name: "Accessibility", color: "#5243AA" }
  ])

  const handleTagEdit = (updatedTag: TagType) => {
    setAllTags(
      allTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    )
    toast({
      title: "Tag edited successfully",
      type: "success",
      position: "top-center",
      enterAnimationType: "slide-down",
      duration: 2000
    })
  }

  const handleTagRemove = (tagToRemove: TagType) => {
    setAllTags(allTags.filter((tag) => tag.id !== tagToRemove.id))
    toast({
      title: "Tag removed successfully",
      type: "success",
      position: "top-center",
      enterAnimationType: "slide-down",
      duration: 2000
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standard Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          This example demonstrates the TagBox with Radix UI Popover for
          positioning. The dropdown will be correctly positioned and not clipped
          by parent containers.
        </p>

        <TagBox
          value={selectedTags}
          onChange={setSelectedTags}
          userTags={allTags}
          onTagEdit={handleTagEdit}
          onTagRemove={handleTagRemove}${
            !!maxTags && maxTags > 0
              ? `
          maxTags={${maxTags}}`
              : ""
          }${
            showMaxTags
              ? `
          showMaxTags`
              : ""
          }${
            !!placeholder && placeholder.length > 0
              ? `
          placeholder="${placeholder}"`
              : ""
          }${
            !!placeholderWhenFull && placeholderWhenFull.length > 0
              ? `
          placeholderWhenFull="${placeholderWhenFull}"`
              : ""
          }${
            !withColor
              ? `
          withColor={false}`
              : ""
          }${
            !openOnFocus
              ? `
          openOnFocus={false}`
              : ""
          }${
            !enableCreate
              ? `
          enableCreate={false}`
              : ""
          }${
            !enableManage
              ? `
          enableManage={false}`
              : ""
          }${
            tagsPosition !== "bottom"
              ? `
          tagsPosition="${tagsPosition}"`
              : ""
          }${
            disabled
              ? `
          disabled`
              : ""
          }
        />
      </CardContent>
    </Card>
  )
}
`

  return code
}
