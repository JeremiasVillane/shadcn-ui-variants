"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
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

export function TimelineExample4() {
  const updates = [
    {
      id: "up1",
      status: "OK",
      title: "Server A Updated",
      description: "Version 2.1.0 deployed.",
      badge: "Success",
      badgeColor: "bg-green-100 text-green-800"
    },
    {
      id: "up2",
      status: "!",
      title: "Server B - Warning",
      description: "CPU usage at 85%.",
      badge: "Warning",
      badgeColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "up3",
      status: "OK",
      title: "Migrated Database",
      description: "Migration completed without errors.",
      badge: "Success",
      badgeColor: "bg-green-100 text-green-800"
    }
  ]

  return (
    <div className="w-full overflow-auto">
      <Timeline position="right" className="w-full lg:w-[30rem]">
        {updates.map((update, index) => (
          <TimelineItem key={update.id}>
            <TimelineSeparator>
              <TimelineNode
                className={cn(
                  "flex size-6 items-center justify-center border-2 p-0 font-bold",
                  update.status === "OK" &&
                    "border-white bg-green-500 text-[0.7rem] text-white",
                  update.status === "!" &&
                    "border-white bg-yellow-400 text-xs text-black"
                )}
              >
                {update.status}
              </TimelineNode>
              {index < updates.length - 1 && <TimelineConnectorLine />}
            </TimelineSeparator>
            <TimelineContent>
              <TimelineHeader className="pt-1">{update.title}</TimelineHeader>
              <TimelineBody className="w-64">
                <p className="mb-2">{update.description}</p>
                <Badge size="xs" className={update.badgeColor}>
                  {update.badge}
                </Badge>
              </TimelineBody>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
