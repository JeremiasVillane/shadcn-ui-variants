"use client"

import {
  Code,
  Database,
  FileCode,
  FileText,
  Folder,
  FolderOpen
} from "lucide-react"

import { List, ListItem } from "@/components/ui/list"

export function ListExample2() {
  return (
    <div>
      <List icon={<Folder className="mb-1 h-5 w-5 text-blue-500" />}>
        <ListItem>
          Project Documentation
          <List
            icon={<FileText className="mb-1 h-4 w-4 text-gray-500" />}
            className="mt-2"
          >
            <ListItem>README.md</ListItem>
            <ListItem>
              API Documentation
              <List icon={<Code className="h-4 w-4 text-green-500" />}>
                <ListItem>Authentication endpoints</ListItem>
                <ListItem>User endpoints</ListItem>
                <ListItem>Admin endpoints</ListItem>
              </List>
            </ListItem>
            <ListItem>Deployment Guide</ListItem>
          </List>
        </ListItem>
        <ListItem>
          Source Code
          <List icon={<FolderOpen className="mb-1 h-4 w-4 text-amber-500" />}>
            <ListItem>
              Frontend
              <List
                icon={<FileCode className="mb-1 h-4 w-4 text-purple-500" />}
              >
                <ListItem>Components</ListItem>
                <ListItem>Pages</ListItem>
                <ListItem>Utilities</ListItem>
              </List>
            </ListItem>
            <ListItem>
              Backend
              <List icon={<Database className="h-4 w-4 text-red-500" />}>
                <ListItem>Models</ListItem>
                <ListItem>Controllers</ListItem>
                <ListItem>Services</ListItem>
              </List>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </div>
  )
}
