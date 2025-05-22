import { ModalProps } from "@/components/ui/modal"

import { ComponentDetails } from "../site-index"
import { ModalExtras } from "./modal-extras"
import { ModalPlayground } from "./modal-playground"
import { modalPlaygroundCode } from "./modal-playground-code"

export const modal: ComponentDetails<ModalProps> = {
  playground: {
    children: undefined,
    className: undefined,
    asChild: undefined,
    open: undefined,
    onOpenChange: undefined,
    customIcon: undefined
  },
  PlaygroundComponent: ModalPlayground,
  playgroundCode: modalPlaygroundCode,
  ExtrasComponent: ModalExtras
}
