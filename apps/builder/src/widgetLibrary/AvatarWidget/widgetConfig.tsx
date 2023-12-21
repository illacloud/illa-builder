import AvatarWidgetIcon from "@/assets/widgetCover/avatar.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const AVATAR_WIDGET_CONFIG: WidgetConfig = {
  type: "AVATAR_WIDGET",
  displayName: "avatar",
  widgetName: i18n.t("widget.avatar.name"),
  icon: <AvatarWidgetIcon />,
  keywords: ["avatar", "头像"],
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  sessionType: "PRESENTATION",
  w: 6,
  h: 6,
  version: 0,
  defaults: {
    avatarType: "image",
    imageSrc:
      "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg?auto=compress&cs=tinysrgb&w=800",
    hidden: false,
    label: "{{currentUserInfo.nickname}}",
    labelAlign: "left",
    labelPosition: "right",
    labelCaption: "{{currentUserInfo.email}}",
    avatarSize: "medium",
  },
}
