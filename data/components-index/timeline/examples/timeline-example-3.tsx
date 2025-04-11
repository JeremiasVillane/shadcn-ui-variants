"use client"

import { Bug, CheckCircle2, Package, Rocket } from "lucide-react"

import {
  Timeline,
  TimelineConnectorLine,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineNode,
  TimelineOppositeContent,
  TimelineSeparator
} from "@/components/ui/timeline"

export function TimelineExample3() {
  const events = [
    {
      id: "ev1",
      time: "09:00",
      title: "Project Started",
      icon: Rocket,
      iconColor: "text-sky-500"
    },
    {
      id: "ev2",
      time: "10:30",
      title: "Component Created",
      icon: Package,
      iconColor: "text-amber-500"
    },
    {
      id: "ev3",
      time: "11:15",
      title: "Tests Passed",
      icon: CheckCircle2,
      iconColor: "text-green-500"
    },
    {
      id: "ev4",
      time: "11:45",
      title: "Bug Found",
      icon: Bug,
      iconColor: "text-red-500"
    }
  ]

  return (
    <div className="w-full overflow-auto">
      <Timeline position="alternate">
        {events.map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineOppositeContent className="pt-4">
              <span className="font-mono text-sm text-muted-foreground">
                {event.time}
              </span>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineNode className="size-7 border-muted bg-background p-1 shadow-none">
                <event.icon className={event.iconColor} />
              </TimelineNode>
              {index < events.length - 1 && <TimelineConnectorLine />}
            </TimelineSeparator>
            <TimelineContent>
              <TimelineHeader className="pt-1.5">{event.title}</TimelineHeader>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
