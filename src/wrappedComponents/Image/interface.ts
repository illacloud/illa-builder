import { ImageProps } from "@illa-design/image"

export interface WrappedImageProps
  extends Pick<
    ImageProps,
    "fallbackSrc" | "alt" | "radius" | "width" | "height"
  > {
  tooltipText?: string
  handleUpdateDsl: (value: Record<string, string>) => void
}
