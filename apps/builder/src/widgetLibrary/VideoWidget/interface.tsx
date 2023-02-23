import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedVideoProps extends BaseWidgetProps {
  url?: string
  controls?: boolean
  autoPlay?: boolean
  playing?: boolean
  loop?: boolean
  volume?: number
  playbackRate?: number
  muted?: boolean
  onPlay: () => void
  onPause: () => void
  onEnded: () => void
  onReady: () => void
}

export interface VideoWidgetProps
  extends Omit<WrappedVideoProps, "onPlay" | "onPause" | "onEnded" | "onReady">,
    BaseWidgetProps,
    TooltipWrapperProps {}
