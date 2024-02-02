import { RESIZE_DIRECTION } from "@/widgetLibrary/interface"

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"

export interface ResizeHandlerProps {
  resizeDirection: RESIZE_DIRECTION
  displayName: string
}

export interface PartResizeHandlerProps {
  displayName: string
}
