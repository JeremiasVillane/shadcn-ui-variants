"use client"

import { useState } from "react"
import { Plus, Star, Tag, Trash, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function BadgeExample2() {
  const [tags, setTags] = useState([
    { id: 1, name: "React", selected: false },
    { id: 2, name: "Next.js", selected: false },
    { id: 3, name: "TypeScript", selected: true }
  ])

  const [favorites, setFavorites] = useState([
    { id: 1, name: "React", favorited: true },
    { id: 2, name: "Next.js", favorited: false },
    { id: 3, name: "TypeScript", favorited: false }
  ])

  const toggleTag = (id: number) => {
    setTags(
      tags.map((tag) =>
        tag.id === id ? { ...tag, selected: !tag.selected } : tag
      )
    )
  }

  const toggleFavorite = (id: number) => {
    setFavorites(
      favorites.map((item) =>
        item.id === id ? { ...item, favorited: !item.favorited } : item
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={tag.selected ? "default" : "outline"}
            size="md"
            shape="tag"
            leftElement={<Tag />}
            rightElement={tag.selected ? <X /> : <Plus />}
            className="cursor-pointer"
            onClick={() => toggleTag(tag.id)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      <Separator variant="double" />

      <div className="flex flex-col gap-2">
        {favorites.map((item) => (
          <Badge
            key={item.id}
            size="lg"
            variant="outline"
            shape="base"
            className={`space-x-3 ${item.favorited ? "border-amber-300 dark:border-amber-500" : ""}`}
          >
            <span>{item.name}</span>

            <Badge
              variant={item.favorited ? "warning" : "outline"}
              leftElement={<Star />}
              className="cursor-pointer"
              onClick={() => toggleFavorite(item.id)}
            >
              {item.favorited ? "Favorited" : "Favorite"}
            </Badge>
          </Badge>
        ))}
      </div>
    </div>
  )
}
