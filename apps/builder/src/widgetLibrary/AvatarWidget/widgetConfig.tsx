import IconsWidgetIcon from "@/assets/widgetCover/icon.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const AVATAR_WIDGET_CONFIG: WidgetConfig = {
  type: "AVATAR_WIDGET",
  displayName: "avatar",
  widgetName: i18n.t("widget.avatar.name"),
  icon: <IconsWidgetIcon />,
  keywords: ["avatar", "头像"],
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  sessionType: "PRESENTATION",
  w: 8,
  h: 6,
  version: 0,
  defaults: {
    avatarType: "image",
    image:
      "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg?auto=compress&cs=tinysrgb&w=800",
    hidden: false,
    label: "Label",
    labelAlign: "left",
    labelPosition: "right",
    labelCaption: "Caption",
    avatarSize: "medium",
  },
}
