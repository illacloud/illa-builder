import { ReactComponent as FormWidgetIcon } from "@/assets/widgetCover/form.svg"
import { WidgetConfig } from "@/widgetLibrary/interface"
import i18n from "@/i18n/config"
import { CONTAINER_TYPE } from "@/redux/currentApp/editor/components/componentsState"
import { TEXT_WIDGET_CONFIG } from "../TextWidget"

export const FORM_WIDGET_CONFIG: WidgetConfig = {
  type: "FORM_WIDGET",
  displayName: "form",
  widgetName: i18n.t("widget.form.name"),
  keywords: ["form", "表单"],
  icon: <FormWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 20,
  h: 40,
  childrenNode: [
    {
      type: "CANVAS",
      displayName: "canvas",
      widgetName: "canvas",
      containerType: CONTAINER_TYPE.EDITOR_DOT_PANEL,
      w: 0,
      h: 0,
      icon: <div />,
      childrenNode: [
        {
          ...TEXT_WIDGET_CONFIG,
          w: 10,
          h: 5,
          x: 0,
          y: 0,
        },
      ],
    },
  ],
  defaults: {
    borderColor: "#ffffffff",
    backgroundColor: "#ffffffff",
    radius: "4px",
    borderWidth: "4px",
    shadow: "small",
  },
}
