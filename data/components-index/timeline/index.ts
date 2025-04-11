import { ComponentDetails } from "../site-index"
import { TimelineExtras } from "./timeline-extras"
import { TimelinePlayground } from "./timeline-playground"
import { timelinePlaygroundCode } from "./timeline-playground-code"

export const timeline: ComponentDetails = {
  PlaygroundComponent: TimelinePlayground,
  playgroundCode: timelinePlaygroundCode,
  ExtrasComponent: TimelineExtras
}
