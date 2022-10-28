import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"

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
        isSetterSingleRow: true,
      },
      {
        id: `${baseWidgetName}-direction`,
        labelName: i18n.t("editor.inspect.setter_label.direction"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.timeline_direction"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: [
          { label: i18n.t("widget.timeline.vertical"), value: "vertical" },
          {
            label: i18n.t("widget.timeline.horizontal"),
            value: "horizontal",
          },
        ],
      },
      {
        id: `${baseWidgetName}-pending`,
        labelName: i18n.t("editor.inspect.setter_label.pending"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.timeline_pending"),
        attrName: "pending",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
]
