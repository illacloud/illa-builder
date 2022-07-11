import { ImageProps } from "@illa-design/image"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedImageProps
  extends Pick<ImageProps, "width" | "height" | "radius">,
    BaseWidgetProps {
  imageSrc?: ImageProps["src"]
  altText?: ImageProps["alt"]
  handleUpdateDsl: (value: Record<string, string>) => void
}
