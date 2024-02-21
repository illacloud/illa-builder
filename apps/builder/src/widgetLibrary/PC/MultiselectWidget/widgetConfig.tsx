import { v4 } from "uuid"
import MultiselectWidgetIcon from "@/assets/widgetCover/multiselect.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const MULTISELECT_WIDGET_CONFIG: WidgetConfig = {
  type: "MULTISELECT_WIDGET",
  displayName: "multiselect",
  widgetName: i18n.t("widget.multiselect.name"),
  icon: <MultiselectWidgetIcon />,
  keywords: ["Multiselect", "多项选择"],
  sessionType: "SELECT",
  w: 7,
  h: 5,
  version: 0,
  defaults: {
    label: "Label",
    optionConfigureMode: "static",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    dataSources: "{{[]}}",
    colorScheme: "blue",
    hidden: false,
    manualOptions: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dynamicHeight: "auto",
    formDataKey: "multiselect",
    resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  },
}
