"use client"

import { Check } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { List, ListItem } from "@/components/ui/list"

export function ListExample4() {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardTitle>Premium Plan Features</CardTitle>
        <CardDescription className="text-white/80">
          Everything you get with our premium subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <List icon={<Check className="h-5 w-5 text-green-500" />}>
          <ListItem className="pb-3">
            <div className="font-medium">Unlimited Projects</div>
            <p className="text-sm text-muted-foreground">
              Create as many projects as you need
            </p>
          </ListItem>
          <ListItem className="pb-3">
            <div className="font-medium">Priority Support</div>
            <p className="text-sm text-muted-foreground">
              Get help within 2 hours, 24/7
            </p>
          </ListItem>
          <ListItem className="pb-3">
            <div className="font-medium">Advanced Analytics</div>
            <p className="text-sm text-muted-foreground">
              Detailed insights and reporting
            </p>
          </ListItem>
          <ListItem className="pb-3">
            <div className="font-medium">Custom Integrations</div>
            <p className="text-sm text-muted-foreground">
              Connect with your favorite tools
            </p>
          </ListItem>
          <ListItem>
            <div className="font-medium">White-labeling</div>
            <p className="text-sm text-muted-foreground">
              Add your own branding
            </p>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
