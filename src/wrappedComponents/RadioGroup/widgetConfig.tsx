import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import { v4 } from "uuid"
import i18n from "@/i18n/config"

export const RADIO_GROUP_WIDGET_CONFIG: WidgetConfig = {
  displayName: "RadioGroup",
  type: "RADIO_GROUP_WIDGET",
  widgetName: i18n.t("widget.radio_group.name"),
  icon: <SearchIcon />,
  sessionType: "SELECT",
  w: 10,
  h: 5,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "500px",
    direction: "horizontal",
    options: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
  },
}
