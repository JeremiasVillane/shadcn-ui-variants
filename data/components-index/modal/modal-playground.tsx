"use client"

import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalAction,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalProps,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal"

export function ModalPlayground(props: ModalProps) {
  return (
    <Modal {...props}>
      <ModalTrigger asChild>
        <Button>Show Modal</Button>
      </ModalTrigger>

      <ModalContent>
        <ModalTitle>This is only a heads up</ModalTitle>
        <ModalDescription>
          Everything is happening right now. All of this is going somewhere,
          wether you like it or not. So, sit down.
        </ModalDescription>

        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <ModalAction>Continue</ModalAction>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
