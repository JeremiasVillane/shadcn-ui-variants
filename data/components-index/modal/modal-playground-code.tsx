"use client"

import { ModalProps } from "@/components/ui/modal"

export const modalPlaygroundCode = ({
  separatedHeader,
  separatedFooter,
  variant,
  withIcon,
  align,
  mode,
  showCloseButton,
  responsive
}: ModalProps): string => {
  const code = `import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalAction,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalTitle,
  ModalTrigger
} from "@/components/ui/modal"

export function ModalPlayground() {
  return (
    <Modal${separatedHeader ? ` separatedHeader` : ""}${separatedFooter ? ` separatedFooter` : ""}${variant !== "default" ? ` variant="${variant}"` : ""}${withIcon ? ` withIcon` : ""}${align !== "left" ? ` align="${align}"` : ""}${mode !== "dialog" ? ` mode="${mode}"` : ""}${showCloseButton ? ` showCloseButton` : ""}${!responsive ? ` responsive="${responsive}"` : ""}>
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
`

  return code
}
