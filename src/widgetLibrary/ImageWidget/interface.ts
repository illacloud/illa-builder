import { ImageProps } from "@illa-design/image"

export interface WrappedImageProps
  extends Pick<ImageProps, "width" | "height" | "radius"> {
  imageSrc?: ImageProps["src"]
  altText?: ImageProps["alt"]
  handleUpdateDsl: (value: Record<string, string>) => void
}
