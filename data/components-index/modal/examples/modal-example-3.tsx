"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Mail, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal"
import { toast } from "@/components/ui/simple-toast"

export function ModalExample3() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate a delay of 1 second
    setTimeout(() => {
      toast({
        title: "Form submitted:",
        description: (
          <article className="w-full">
            <div className="mb-2 font-semibold">Your data:</div>
            <div className="whitespace-nowrap text-foreground/80">
              Name: {name}
            </div>
            <div className="whitespace-nowrap text-foreground/80">
              Email: {email}
            </div>
          </article>
        ),
        type: "info",
        position: "top-center",
        enterAnimationType: "slide-down",
        showProgressBar: true,
        duration: 3000
      })
      setIsSubmitting(false)
      setOpen(false)
      // Reset form
      setName("")
      setEmail("")
    }, 1000)
  }

  return (
    <Modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setName("")
          setEmail("")
        }
        setOpen(isOpen)
      }}
      separatedFooter
      mode="alertdialog"
    >
      <ModalTrigger iconLeft={<Mail />} iconAnimation="zoomIn">
        Contact Us
      </ModalTrigger>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalTitle>Contact Form</ModalTitle>
          <ModalBody className="px-2">
            <div className="grid gap-4 pb-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  startAddon={<UserCircle className="size-4" />}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  showMaxLength="inside"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  startAddon={"@"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={50}
                  showMaxLength="inside"
                  required
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalClose disabled={isSubmitting}>Cancel</ModalClose>
            <Button
              type="submit"
              isLoading={isSubmitting}
              iconRight={<ArrowRight />}
              iconAnimation="translateXRight"
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
