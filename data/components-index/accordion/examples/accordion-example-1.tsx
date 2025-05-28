"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionSubtitle,
  AccordionTitle,
  AccordionTrigger
} from "@/components/ui/accordion"

export function AccordionExample1() {
  return (
    <Accordion
      type="single"
      variant="separated"
      styleVariant="fill"
      trigger="plus-minus"
    >
      <AccordionItem value="feature-1">
        <AccordionTrigger>
          <AccordionTitle>Advanced Analytics 📊</AccordionTitle>
          <AccordionSubtitle>
            Gain deep insights into your data.
          </AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          Our advanced analytics dashboard provides real-time data
          visualization, custom reporting, and predictive insights to help you
          make informed decisions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="feature-2">
        <AccordionTrigger>
          <AccordionTitle>Seamless Integrations 🔗</AccordionTitle>
          <AccordionSubtitle>
            Connect with your favorite tools.
          </AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          Easily integrate with popular services like Slack, Google Drive,
          Salesforce, and more. Our robust API allows for custom integrations
          too.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="feature-3">
        <AccordionTrigger>
          <AccordionTitle>24/7 Priority Support 📞</AccordionTitle>
          <AccordionSubtitle>We're here to help, anytime.</AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          Our dedicated support team is available around the clock to assist you
          with any questions or issues you may encounter.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
