"use client"

import * as React from "react"
import { CheckCircle, Circle } from "lucide-react"

import { List, ListItem } from "@/components/ui/list"

export function ListExample3() {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: "Research component libraries", completed: true },
    { id: 2, text: "Design system implementation", completed: true },
    { id: 3, text: "Create reusable components", completed: false },
    { id: 4, text: "Write documentation", completed: false },
    { id: 5, text: "Unit testing", completed: false }
  ])

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }
  return (
    <div>
      <List variant="none" className="space-y-3">
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            className="transition-colors hover:bg-muted/50"
            icon={
              task.completed ? (
                <CheckCircle
                  className="h-5 w-5 cursor-pointer pb-1 text-green-500"
                  onClick={() => toggleTask(task.id)}
                />
              ) : (
                <Circle
                  className="h-5 w-5 cursor-pointer pb-1 text-muted-foreground"
                  onClick={() => toggleTask(task.id)}
                />
              )
            }
          >
            <span
              className={
                task.completed ? "text-muted-foreground line-through" : ""
              }
            >
              {task.text}
            </span>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
