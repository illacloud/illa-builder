import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "pdf"
export const PDF_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-source-self-host`,
        attrName: "url",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: i18n.t("editor.inspect.setter_label.file_url"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.file_url"),
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-Adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-layout-show-tool-bar`,
        labelName: i18n.t("editor.inspect.setter_label.show_tool_bar"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "showToolBar",
        placeholder: "{{false}}",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-scaleMode`,
        labelName: i18n.t("editor.inspect.setter_label.scale"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.scale"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "scaleMode",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.scale_width"),
            value: "width",
          },
          {
            label: i18n.t("editor.inspect.setter_option.scale_height"),
            value: "height",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
]
