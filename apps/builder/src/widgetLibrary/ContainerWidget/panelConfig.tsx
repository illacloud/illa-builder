import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "container"
export const CONTAINER_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-views`,
    groupName: i18n.t("editor.inspect.setter_group.views"),
    children: [
      {
        id: `${baseWidgetName}-views-list`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        useCustomLayout: true,
        attrName: "viewList",
        setterType: "CONTAINER_VIEW_SETTER",
        childrenSetter: [
          {
            id: `${baseWidgetName}-viewList-key`,
            labelName: i18n.t("editor.inspect.setter_label.key"),
            attrName: "key",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-viewList-label`,
            labelName: i18n.t("editor.inspect.setter_label.label"),
            attrName: "label",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
          },
          {
            id: `${baseWidgetName}-viewList-disabled`,
            labelName: i18n.t("editor.inspect.setter_label.disabled"),
            attrName: "disabled",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
          {
            id: `${baseWidgetName}-viewList-hidden`,
            labelName: i18n.t("editor.inspect.setter_label.hidden"),
            attrName: "hidden",
            setterType: "DYNAMIC_SWITCH_SETTER",
            useCustomLayout: true,
            openDynamic: true,
            expectedType: VALIDATION_TYPES.BOOLEAN,
          },
        ],
      },
      {
        id: `${baseWidgetName}-views-default`,
        labelName: i18n.t("editor.inspect.setter_label.default_views"),
        attrName: "defaultView",
        setterType: "CONTAINER_DEFAULT_VIEW_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
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
        attrName: "hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-styles-color`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "colors",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-border`,
            labelName: i18n.t("editor.inspect.setter_label.border"),
            attrName: " borderColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "white",
          },
          {
            id: `${baseWidgetName}-style-background`,
            labelName: i18n.t("editor.inspect.setter_label.background"),
            attrName: " backgroundColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
          },
        ],
      },
      {
        id: `${baseWidgetName}-styles-style`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.style"),
        attrName: "style",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            attrName: "radius",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-style-border-width`,
            labelName: i18n.t("editor.inspect.setter_label.border_width"),
            attrName: "borderWidth",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-style-shadow`,
            labelName: i18n.t("editor.inspect.setter_label.shadow"),
            attrName: "shadow",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
          },
        ],
      },
    ],
  },
]
