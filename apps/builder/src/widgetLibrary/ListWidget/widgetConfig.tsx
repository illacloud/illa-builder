import { ReactComponent as FormWidgetIcon } from "@/assets/widgetCover/form.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"
import { OVERFLOW_TYPE } from "@/widgetLibrary/ListWidget/interface"

export const LIST_WIDGET_CONFIG: WidgetConfig = {
  type: "LIST_WIDGET",
  displayName: " list",
  widgetName: i18n.t("widget.list.name"),
  keywords: ["list", "列表"],
  icon: <FormWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 32,
  h: 40,
  childrenNode: [],
  defaults: {
    overflowMethod: OVERFLOW_TYPE.SCROLL,
    pageSize: "{{6}}",
    itemBackGroundColor: "white",
    backgroundColor: "white",
    itemHeight: 48,
  },
}
