import { ImageProps } from "@illa-design/image"
import { TooltipWrapperProps } from "@/wrappedComponents/TooltipWrapper/interface"

export interface WrappedImageProps
  extends Pick<TooltipWrapperProps, "tooltipText">,
    Pick<ImageProps, "fallbackSrc" | "alt" | "radius" | "width" | "height"> {
  handleUpdateDsl: (value: Record<string, string>) => void
}
