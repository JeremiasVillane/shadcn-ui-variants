"use client"

import { useState } from "react"
import { Gift } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalAction,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal"

export function ModalExample1() {
  const [open, setOpen] = useState(false)

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      align="center"
      withIcon
      customIcon={<Gift className="animate-pulse text-purple-500" />}
    >
      <ModalTrigger asChild>
        <Button className="transition-transform ease-in-out hover:scale-105">
          Special Offer
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalTitle>Special Offer!</ModalTitle>
        <ModalDescription>
          We have a special offer just for you.
        </ModalDescription>
        <ModalBody>
          <p className="text-center">
            Enjoy 20% off your next purchase with code:{" "}
            <strong>SPECIAL20</strong>
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose>Maybe Later</ModalClose>
          <ModalAction>Claim Now</ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
