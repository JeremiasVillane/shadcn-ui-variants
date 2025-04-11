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

export function TimelineExample1() {
  const steps = [
    {
      id: 1,
      title: "Order Received",
      description: "We have received your order."
    },
    {
      id: 2,
      title: "Payment Confirmed",
      description: "Your payment has been successfully processed."
    },
    {
      id: 3,
      title: "In Preparation",
      description: "Your order is being prepared."
    },
    { id: 4, title: "Shipped", description: "Your package is on its way!" }
  ]

  return (
    <div className="w-full">
      <Timeline>
        {steps.map((step, index) => (
          <TimelineItem key={step.id} className="ml-0 md:-ml-[50%]">
            <TimelineSeparator>
              <TimelineNode className="border-2 border-white bg-blue-500" />
              {index < steps.length - 1 && (
                <TimelineConnectorLine className="bg-blue-300" />
              )}
            </TimelineSeparator>
            <TimelineContent className="w-96">
              <TimelineHeader className="pt-1 text-base text-blue-600">
                {step.title}
              </TimelineHeader>
              <TimelineBody className="text-slate-600">
                {step.description}
              </TimelineBody>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
