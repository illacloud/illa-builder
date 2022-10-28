import { ImageProps } from "@illa-design/image"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"

export interface WrappedImageProps
  extends Pick<ImageProps, "width" | "height" | "radius"> {
  imageSrc?: ImageProps["src"]
  altText?: ImageProps["alt"]
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"
  handleOnClick: () => void
}

export interface ImageWidgetProps
  extends WrappedImageProps,
    BaseWidgetProps,
    TooltipWrapperProps {}
