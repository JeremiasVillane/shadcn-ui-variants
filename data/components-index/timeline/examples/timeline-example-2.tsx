"use client"

import {
  Timeline,
  TimelineBody,
  TimelineConnectorLine,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
  TimelineNode,
  TimelineSeparator
} from "@/components/ui/timeline"

export function TimelineExample2() {
  const phases = [
    {
      id: "a",
      title: "Research",
      description: "Market and competition analysis."
    },
    {
      id: "b",
      title: "Prototyping",
      description: "Creation of initial models."
    },
    {
      id: "c",
      title: "Development",
      description: "Construction of the final product."
    }
  ]
  return (
    <div className="w-full">
      <Timeline position="left">
        {phases.map((phase, index) => (
          <TimelineItem key={phase.id}>
            <TimelineSeparator>
              <TimelineNode />
              {index < phases.length - 1 && <TimelineConnectorLine />}
            </TimelineSeparator>
            <TimelineContent className="w-96">
              <TimelineHeader>{phase.title}</TimelineHeader>
              <TimelineBody>{phase.description}</TimelineBody>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
