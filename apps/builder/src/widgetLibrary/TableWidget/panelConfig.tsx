import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

const baseWidgetName = "table"
export const TABLE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-basic-data`,
        labelName: i18n.t("editor.inspect.setter_label.data"),
        attrName: "originData",
        setterType: "INPUT_SETTER",
      },
    ],
  },
]
