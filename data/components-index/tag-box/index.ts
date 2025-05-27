import { TagBoxProps } from "@/components/ui/tag-box"

import { ComponentDetails } from "../site-index"
import { TagBoxExtras } from "./tag-box-extras"
import { TagBoxPlayground } from "./tag-box-playground"
import { tagBoxPlaygroundCode } from "./tag-box-playground-code"

export const tagBox: ComponentDetails<TagBoxProps> = {
  playground: {
    placeholder: "Click here to see the dropdown...",
    maxTags: 4,
    name: undefined,
    defaultValue: undefined,
    value: undefined,
    onChange: undefined,
    userTags: undefined,
    onTagEdit: undefined,
    onTagRemove: undefined,
    className: undefined,
    tagClassName: undefined
  },
  PlaygroundComponent: TagBoxPlayground,
  playgroundCode: tagBoxPlaygroundCode,
  ExtrasComponent: TagBoxExtras
}
