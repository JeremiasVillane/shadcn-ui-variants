"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionSubtitle,
  AccordionTitle,
  AccordionTrigger
} from "@/components/ui/accordion"
import { InlineCode } from "@/components/ui/prose"

export function AccordionExample5() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["info-section"]}
    >
      <AccordionItem value="info-section">
        <AccordionTrigger collapsible={false}>
          <AccordionTitle>Important Information</AccordionTitle>
          <AccordionSubtitle>This section always stays open.</AccordionSubtitle>
        </AccordionTrigger>
        <AccordionContent>
          This content is vital and should always be visible to the user.
          Setting <InlineCode>collapsible={false}</InlineCode> and{" "}
          <InlineCode>type="multiple"</InlineCode> ensures it cannot be closed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="other-section">
        <AccordionTrigger>
          <AccordionTitle>Another Section</AccordionTitle>
        </AccordionTrigger>
        <AccordionContent>
          This section can be toggled if there were other items and
          <InlineCode>type="multiple"</InlineCode>.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
