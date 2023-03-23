import { ReactComponent as MultiselectWidgetIcon } from "@/assets/widgetCover/multiselect.svg"
import i18n from "@/i18n/config"
import { WidgetConfig } from "@/widgetLibrary/interface"

export const MULTISELECT_WIDGET_CONFIG: WidgetConfig = {
  type: "MULTISELECT_WIDGET",
  displayName: "multiselect",
  widgetName: i18n.t("widget.multiselect.name"),
  icon: <MultiselectWidgetIcon />,
  keywords: ["Multiselect", "选择器"],
  sessionType: "SELECT",
  w: 15,
  h: 5,
  defaults: {
    label: "Label",
    labelAlign: "left",
    labelPosition: "left",
    labelWidth: "{{33}}",
    dataSources: "{{[]}}",
    colorScheme: "blue",
    hidden: false,
    dynamicHeight: "fixed",
    formDataKey: "multiselect",
  },
}
