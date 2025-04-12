"use client"

import { List, ListItem } from "@/components/ui/list"

export function ListExample1() {
  return (
    <div>
      <List variant="numbered">
        <ListItem>
          Main project setup
          <List variant="bullet" className="mt-2">
            <ListItem>Initialize repository</ListItem>
            <ListItem>
              Configure environment
              <List variant="dash" className="mt-2">
                <ListItem>Set up development variables</ListItem>
                <ListItem>Configure production settings</ListItem>
              </List>
            </ListItem>
            <ListItem>Install dependencies</ListItem>
          </List>
        </ListItem>
        <ListItem>
          Feature development
          <List variant="bullet" className="mt-2">
            <ListItem>User authentication</ListItem>
            <ListItem>Dashboard components</ListItem>
            <ListItem>API integration</ListItem>
          </List>
        </ListItem>
        <ListItem>
          Testing and deployment
          <List variant="check" className="mt-2">
            <ListItem>Unit tests</ListItem>
            <ListItem>Integration tests</ListItem>
            <ListItem>Deployment pipeline</ListItem>
          </List>
        </ListItem>
      </List>
    </div>
  )
}
