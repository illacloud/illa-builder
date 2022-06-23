import { SearchIcon } from "@illa-design/icon"
import { WidgetConfig } from "@/wrappedComponents/interface"
import { v4 } from "uuid"
import i18n from "@/i18n/config"

export const SELECT_WIDGET_CONFIG: WidgetConfig = {
  type: "SELECT_WIDGET",
  displayName: "select",
  widgetName: i18n.t("widget.select.name"),
  icon: <SearchIcon />,
  sessionType: "SELECT",
  w: 10,
  h: 5,
  defaults: {
    optionMode: "manual",
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    width: "200px",
    value: "Option 1",
    options: [
      { id: `option-${v4()}`, label: "Option 1", value: "Option 1" },
      { id: `option-${v4()}`, label: "Option 2", value: "Option 2" },
      { id: `option-${v4()}`, label: "Option 3", value: "Option 3" },
    ],
    dataSources: "{{[]}}",
  },
}
