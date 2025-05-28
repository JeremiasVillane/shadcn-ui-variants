"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionSubtitle,
  AccordionTitle,
  AccordionTrigger
} from "@/components/ui/accordion"

export function AccordionExample3() {
  return (
    <Accordion
      type="single"
      collapsible
      variant="tabs"
      styleVariant="outline"
      triggerPosition="right"
    >
      <AccordionItem value="step-1">
        <AccordionTrigger>
          <AccordionTitle>Step 1: Create Your Account</AccordionTitle>
          <AccordionSubtitle>Quick and easy sign-up process.</AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          Fill in your basic details like name, email, and password. Verify your
          email address to activate your account.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-2">
        <AccordionTrigger>
          <AccordionTitle>Step 2: Set Up Your Profile</AccordionTitle>
          <AccordionSubtitle>Personalize your experience.</AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          Add a profile picture, write a short bio, and link your social media
          accounts to complete your profile.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="step-3">
        <AccordionTrigger>
          <AccordionTitle>Step 3: Explore Features</AccordionTitle>
          <AccordionSubtitle>Discover what you can do.</AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          Take a guided tour of our main features or jump right in and start
          exploring. Don't forget to check out our tutorials section!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
