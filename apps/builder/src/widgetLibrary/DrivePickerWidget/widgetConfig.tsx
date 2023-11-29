import DrivePickerWidgetIcon from "@/assets/widgetCover/drivePicker.svg?react"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const DRIVE_PICKER_WIDGET_CONFIG: WidgetConfig = {
  type: "DRIVE_PICKER_WIDGET",
  displayName: "drivePicker",
  widgetName: i18n.t("widget.drive_picker.name"),
  icon: <DrivePickerWidgetIcon />,
  keywords: ["drivePicker", "文件选择器"],
  sessionType: "ILLA_DRIVE",
  w: 6,
  h: 5,
  version: 0,
  defaults: {
    variant: "fill",
    colorScheme: "blue",
    hidden: false,
    expirationType: "persistent",
    useHotlink: "{{true}}",
    text: i18n.t(
      "editor.inspect.setter_default_value.drive_builder.button_text",
    ),
    sizeType: "mb",
    value: [],
    files: [],
  },
}
