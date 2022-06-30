import { ImageProps } from "@illa-design/image"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedImageProps
  extends Pick<TooltipWrapperProps, "tooltipText">,
    Pick<ImageProps, "width" | "height"> {
  imageSrc?: ImageProps["src"]
  altText?: ImageProps["alt"]
  handleUpdateDsl: (value: Record<string, string>) => void
  styles?: {
    radius?: ImageProps["radius"]
  }
}
