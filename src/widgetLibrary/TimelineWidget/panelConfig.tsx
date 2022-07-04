import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "timeline"
export const TIMELINE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-items`,
        labelName: i18n.t("editor.inspect.setter_label.items"),
        attrName: "items",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.ARRAY,
      },
      {
        id: `${baseWidgetName}-direction`,
        labelName: i18n.t("editor.inspect.setter_label.direction"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: ["vertical", "horizontal"],
      },
      {
        id: `${baseWidgetName}-pending`,
        labelName: i18n.t("editor.inspect.setter_label.pending"),
        attrName: "pending",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "text-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "text-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
]
