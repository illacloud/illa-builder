import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type AvatarType = "image" | "icon" | "text"

export interface WrappedAvatarProps
  extends Pick<LabelProps, "label" | "labelCaption" | "labelHidden"> {
  avatarType: AvatarType
  imageSrc?: string
  text?: string
  icon?: string
  colorScheme?: string
  allowWrap?: boolean
  avatarSize?: "small" | "medium" | "large"
  labelPosition?: "left" | "right"
  labelAlign?: "left" | "right"
  handleOnClick?: () => void
}

export interface AvatarWidgetProps extends BaseWidgetProps, WrappedAvatarProps {
  disabled?: boolean
}
