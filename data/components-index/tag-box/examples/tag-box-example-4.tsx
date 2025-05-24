"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { TagBox, TagType } from "@/components/ui/tag-box"

interface Task {
  id: string
  title: string
  tags: TagType[]
}

export function TagBoxExample4() {
  const [allTags, setAllTags] = useState<TagType[]>([
    { id: "1", name: "Frontend", color: "#FF5630" },
    { id: "2", name: "Backend", color: "#FF8B00" },
    { id: "3", name: "Bug", color: "#36B37E" },
    { id: "4", name: "Feature", color: "#00B8D9" }
  ])

  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Fix navigation menu",
      tags: [
        { id: "1", name: "Frontend", color: "#FF5630" },
        { id: "3", name: "Bug", color: "#36B37E" }
      ]
    },
    {
      id: "2",
      title: "Implement authentication",
      tags: [
        { id: "2", name: "Backend", color: "#FF8B00" },
        { id: "4", name: "Feature", color: "#00B8D9" }
      ]
    },
    {
      id: "3",
      title: "Add dark mode",
      tags: [
        { id: "1", name: "Frontend", color: "#FF5630" },
        { id: "4", name: "Feature", color: "#00B8D9" }
      ]
    },
    {
      id: "4",
      title: "Fix API response format",
      tags: [
        { id: "2", name: "Backend", color: "#FF8B00" },
        { id: "3", name: "Bug", color: "#36B37E" }
      ]
    }
  ])

  const [filterTags, setFilterTags] = useState<TagType[]>([])

  const handleTagEdit = (updatedTag: TagType) => {
    setAllTags(
      allTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    )
  }

  const handleTagRemove = (tagToRemove: TagType) => {
    setAllTags(allTags.filter((tag) => tag.id !== tagToRemove.id))
  }

  const filteredTasks =
    filterTags.length === 0
      ? tasks
      : tasks.filter((task) =>
          filterTags.every((filterTag) =>
            task.tags.some((taskTag) => taskTag.id === filterTag.id)
          )
        )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Filter Tasks by Tags:</h3>
        <TagBox
          value={filterTags}
          onChange={setFilterTags}
          userTags={allTags}
          onTagEdit={handleTagEdit}
          onTagRemove={handleTagRemove}
          placeholder="Select tags to filter tasks..."
        />
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="pb-2">
              <CardTitle>{task.title}</CardTitle>
              <CardDescription className="mt-2 flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    style={{
                      backgroundColor: `${tag.color}30`,
                      color: tag.color,
                      borderColor: tag.color
                    }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No tasks match the selected filters
          </div>
        )}
      </div>
    </div>
  )
}
