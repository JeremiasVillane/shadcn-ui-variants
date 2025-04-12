"use client"

import { List, ListItem } from "@/components/ui/list"

export function ListExample5() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="space-y-4">
        <div className="border-b pb-2 text-center text-lg font-medium">
          Basic
        </div>
        <List variant="check" className="[&>li]:before:text-green-500">
          <ListItem>5GB Storage</ListItem>
          <ListItem>2 Users</ListItem>
          <ListItem>Basic Support</ListItem>
        </List>
        <List variant="x" className="[&>li]:before:text-red-500">
          <ListItem>Advanced Features</ListItem>
          <ListItem>Custom Domain</ListItem>
          <ListItem>Analytics</ListItem>
        </List>
      </div>

      <div className="space-y-4 rounded-lg border-2 border-primary p-4">
        <div className="border-b pb-2 text-center text-lg font-medium text-primary">
          Pro
        </div>
        <List variant="check" className="[&>li]:before:text-green-500">
          <ListItem>50GB Storage</ListItem>
          <ListItem>10 Users</ListItem>
          <ListItem>Priority Support</ListItem>
          <ListItem>Advanced Features</ListItem>
          <ListItem>Custom Domain</ListItem>
        </List>
        <List variant="x" className="[&>li]:before:text-red-500">
          <ListItem>Analytics</ListItem>
        </List>
      </div>

      <div className="space-y-4">
        <div className="border-b pb-2 text-center text-lg font-medium">
          Enterprise
        </div>
        <List variant="check" className="[&>li]:before:text-green-500">
          <ListItem>Unlimited Storage</ListItem>
          <ListItem>Unlimited Users</ListItem>
          <ListItem>24/7 Support</ListItem>
          <ListItem>Advanced Features</ListItem>
          <ListItem>Custom Domain</ListItem>
          <ListItem>Analytics</ListItem>
          <ListItem>Custom Development</ListItem>
        </List>
      </div>
    </div>
  )
}
