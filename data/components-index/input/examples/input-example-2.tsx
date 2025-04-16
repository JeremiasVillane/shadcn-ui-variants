"use client"

import { MailIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export function InputExample2() {
  return (
    <div className="container max-w-md">
      <Input
        placeholder="Email"
        startAddon="https://"
        endIcon={<MailIcon size={16} aria-hidden="true" />}
      />{" "}
    </div>
  )
}
