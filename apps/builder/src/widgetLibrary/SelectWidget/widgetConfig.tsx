import { v4 } from "uuid"
import SelectWidgetIcon from "@/assets/widgetCover/select.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const SELECT_WIDGET_CONFIG: WidgetConfig = {
  type: "SELECT_WIDGET",
  displayName: "select",
  widgetName: i18n.t("widget.select.name"),
  icon: <SelectWidgetIcon />,
  keywords: ["Select", "选择器"],
  sessionType: "SELECT",
  w: 6,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  version: 0,
  defaults: {
    optionConfigureMode: "static",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    manualOptions: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
    colorScheme: "blue",
    hidden: false,
    formDataKey: "select",
  },
}
