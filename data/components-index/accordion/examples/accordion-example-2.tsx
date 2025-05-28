"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTrigger
} from "@/components/ui/accordion"

export function AccordionExample2() {
  return (
    <Accordion
      type="single"
      collapsible
      variant="contained"
      styleVariant="fill"
      triggerPosition="left"
    >
      <AccordionItem value="profile-settings">
        <AccordionTrigger>
          <AccordionTitle>Profile Settings</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent>
          Manage your username, email, password, and profile picture here. You
          can also update your contact information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="notification-settings">
        <AccordionTrigger>
          <AccordionTitle>Notification Preferences</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent>
          Choose how you want to be notified: email, push notifications, or
          in-app alerts. Customize for different event types.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy-settings">
        <AccordionTrigger>
          <AccordionTitle>Privacy & Security</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent>
          Configure your account privacy, manage connected apps, and enable
          two-factor authentication for enhanced security.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
