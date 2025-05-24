"use client"

import { FormEvent, useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TagBox, TagType } from "@/components/ui/tag-box"

interface SubmittedDataType {
  title: string
  tags: TagType[]
}

export function TagBoxExample3() {
  const [title, setTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [allTags, setAllTags] = useState<TagType[]>([
    { id: "1", name: "UI", color: "#FF5630" },
    { id: "2", name: "Backend", color: "#FF8B00" },
    { id: "3", name: "Testing", color: "#36B37E" },
    { id: "4", name: "DevOps", color: "#00B8D9" }
  ])
  const [error, setError] = useState("")
  const [submittedData, setSubmittedData] = useState<SubmittedDataType | null>(
    null
  )

  const handleTagEdit = (updatedTag: TagType) => {
    setAllTags(
      allTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    )
    // Also update selectedTags if the edited tag was among them
    setSelectedTags((prevSelected) =>
      prevSelected.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
    )
  }

  const handleTagRemove = (tagToRemove: TagType) => {
    setAllTags(allTags.filter((tag) => tag.id !== tagToRemove.id))
    // Also remove from selectedTags if it was there
    setSelectedTags((prevSelected) =>
      prevSelected.filter((tag) => tag.id !== tagToRemove.id)
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSubmittedData(null)

    const formData = new FormData(e.currentTarget)
    const formTitle = formData.get("task_title") as string
    const formTagsJSON = formData.get("task_categories_json") as string | null

    if (!formTitle || formTitle.trim() === "") {
      setError("Please enter a title")
      return
    }

    let parsedTags: TagType[] = []
    if (formTagsJSON) {
      try {
        parsedTags = JSON.parse(formTagsJSON)
      } catch (err) {
        setError("Error processing tags data. Please try again.")
        console.error("Failed to parse tags JSON:", err)
        return
      }
    }

    if (parsedTags.length === 0) {
      setError("Please select at least one tag")
      return
    }

    // Form is valid
    const submission: SubmittedDataType = {
      title: formTitle.trim(),
      tags: parsedTags
    }
    setSubmittedData(submission)
    console.log("Form Submitted Successfully:", submission)

    // Optionally clear the form fields after successful submission
    // setTitle("");
    // setSelectedTags([]);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
          <CardDescription>
            Fill in the details below to create a new task.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task_title">Task Title</Label>
              <Input
                id="task_title"
                name="task_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                aria-describedby={
                  error && title === "" ? "title-error" : undefined
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task_categories">Task Categories</Label>
              <TagBox
                id="task_categories"
                name="task_categories_json"
                value={selectedTags}
                onChange={setSelectedTags}
                userTags={allTags}
                onTagEdit={handleTagEdit}
                onTagRemove={handleTagRemove}
                placeholder="Select or create tags..."
                aria-describedby={
                  error && selectedTags.length === 0 ? "tags-error" : undefined
                }
              />
            </div>

            {error && (
              <div
                id={error.includes("title") ? "title-error" : "tags-error"}
                className="flex items-center gap-2 text-sm text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Submit Task
            </Button>
          </form>
        </CardContent>
      </Card>

      {submittedData && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="mr-2 h-5 w-5" />
              Task Submitted Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-green-600">
            <p>
              <strong>Title:</strong> {submittedData.title}
            </p>

            <div className="flex gap-1">
              <strong>Tags:</strong>
              <div className="flex flex-wrap gap-2">
                {submittedData.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    style={
                      tag.color
                        ? {
                            backgroundColor: `${tag.color}30`,
                            color: tag.color,
                            borderColor: tag.color
                          }
                        : {}
                    }
                    variant="outline"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
