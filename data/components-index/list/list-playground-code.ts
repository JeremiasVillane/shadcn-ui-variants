"use client"

import type { ListProps } from "@/components/ui/list"

export const listPlaygroundCode = ({ variant, spacing }: ListProps) => {
  const code = `import { List, ListItem } from "@/components/ui/list"

export function ListPlayground() {
  return (
    <div>
      <List${variant !== "default" ? ` variant="${variant}"` : ""}${spacing !== "default" ? ` spacing="${spacing}"` : ""}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    </div>
  )
}
`

  return code
}
