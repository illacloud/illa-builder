import { ImageProps } from "@illa-design/image"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedImageProps
  extends Pick<ImageProps, "width" | "height" | "radius"> {
  imageSrc?: ImageProps["src"]
  altText?: ImageProps["alt"]
}

export interface ImageWidgetProps extends WrappedImageProps, BaseWidgetProps {}
