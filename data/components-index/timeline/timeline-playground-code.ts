"use client"

import type { TimelineProps } from "@/components/ui/timeline"

export const timelinePlaygroundCode = ({ position }: TimelineProps) => {
  const code = `import {
  Timeline,
  TimelineBody,
  TimelineConnectorLine,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineNode,
  TimelineOppositeContent,
  TimelineSeparator
} from "@/components/ui/timeline"

export function TimelinePlayground() {
  const events = [
    {
      id: "ev1",
      time: "08:30 AM",
      title: "Event 1",
      description: "Having breakfast and preparing for the day."
    },
    {
      id: "ev2",
      time: "10:00 AM",
      title: "Event 2",
      description: "Working on the project."
    },
    {
      id: "ev3",
      time: "11:15 AM",
      title: "Event 3",
      description: "Meeting with the team to discuss progress."
    }
  ]

  return (
    <Timeline${position !== "right" ? ` position="${position}"` : ""}>
      {events.map((evt, index) => (
        <TimelineItem key={evt.id}>
          <TimelineOppositeContent className="pt-2.5">
            <span className="text-sm text-muted-foreground">{evt.time}</span>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineNode className="size-5" />
            {index < events.length - 1 && <TimelineConnectorLine />}
          </TimelineSeparator>
          <TimelineContent className="py-2">
            <TimelineHeader>{evt.title}</TimelineHeader>
            <TimelineBody>{evt.description}</TimelineBody>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
`

  return code
}
