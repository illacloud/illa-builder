import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { ImageProps } from "@illa-design/react"

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
