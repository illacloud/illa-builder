import { v4 } from "uuid"
import { ReactComponent as CheckboxWidgetIcon } from "@/assets/widgetCover/checkBox.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const CHECKBOX_GROUP_WIDGET_CONFIG: WidgetConfig = {
  type: "CHECKBOX_GROUP_WIDGET",
  widgetName: i18n.t("widget.check_box_group.name"),
  displayName: "checkboxGroup",
  icon: <CheckboxWidgetIcon />,
  keywords: ["Checkbox Group", "复选框组"],
  sessionType: "SELECT",
  w: 20,
  h: 5,
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
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
    direction: "horizontal",
    colorScheme: "blue",
    formDataKey: "radioButton",
  },
}
