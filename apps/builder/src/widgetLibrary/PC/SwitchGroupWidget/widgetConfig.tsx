import { v4 } from "uuid"
import SwitchGroupWidgetIcon from "@/assets/widgetCover/switchGroup.svg?react"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const SWITCH_GROUP_WIDGET_CONFIG: WidgetConfig = {
  type: "SWITCH_GROUP_WIDGET",
  displayName: "switchGroup",
  widgetName: i18n.t("widget.switch_group.name"),
  icon: <SwitchGroupWidgetIcon />,
  keywords: ["switchGroup", "开关组"],
  sessionType: "SELECT",
  w: 10,
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
    formDataKey: "switchGroup",
    layoutPosition: "left",
    value: undefined,
  },
}
