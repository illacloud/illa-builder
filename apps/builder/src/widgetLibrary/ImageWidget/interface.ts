import { ImageProps } from "@illa-design/react"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type HorizontalAlign = "start" | "center" | "end"
export type DynamicHeight = "auto" | "fixed"
export type ObjectFit = "contain" | "cover"
export interface WrappedImageProps
  extends Pick<ImageProps, "width" | "height"> {
  imageSrc?: ImageProps["src"]
  altText?: ImageProps["alt"]
  aspectRatio?: number
  objectFit?: ObjectFit
  dynamicHeight: DynamicHeight
  horizontalAlign?: HorizontalAlign
  imageRadius?: string
  handleOnClick: () => void
  sourceLoadErrorHandle: (
    source: string | undefined,
    widgetType: string,
  ) => void
}

export interface ImageWidgetProps
  extends Omit<WrappedImageProps, "handleOnClick">,
    BaseWidgetProps,
    TooltipWrapperProps {}
