"use client"

import { List, ListItem, type ListProps } from "@/components/ui/list"

export function ListPlayground({ variant, spacing }: ListProps) {
  return (
    <div className="rounded-md border border-muted px-6 py-4 shadow">
      <List {...{ variant, spacing }}>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </List>
    </div>
  )
}
