import { v4 } from "uuid"
import { ReactComponent as RadioButtonWidgetIcon } from "@/assets/widgetCover/radioButton.svg"
import i18n from "@/i18n/config"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const RADIO_BUTTON_WIDGET_CONFIG: WidgetConfig = {
  type: "RADIO_BUTTON_WIDGET",
  widgetName: i18n.t("widget.radio_button.name"),
  displayName: "radioButton",
  w: 18,
  h: 5,
  icon: <RadioButtonWidgetIcon />,
  keywords: ["Radio Button", "按钮单选"],
  sessionType: "PRESENTATION",
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
    colorScheme: "blue",
    hidden: false,
    formDataKey: "radioButton",
  },
}
