import { ReactComponent as RadioIcon } from "@/assets/radius-icon.svg"
import { ReactComponent as StrokeWidthIcon } from "@/assets/stroke-width-icon.svg"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { CONTAINER_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/ContainerWidget/eventHandlerConfig"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

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
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          CONTAINER_EVENT_HANDLER_CONFIG.events,
        ),
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
        id: `${baseWidgetName}-layout-height`,
        labelName: i18n.t("editor.inspect.setter_label.height"),
        attrName: "dynamicHeight",
        setterType: "HEIGHT_MODE_SELECT",
        options: [
          {
            label: i18n.t("editor.inspect.setter_option.fixed"),
            value: "fixed",
          },
          {
            label: i18n.t("editor.inspect.setter_option.auto_limited"),
            value: "limited",
          },
          {
            label: i18n.t("editor.inspect.setter_option.auto_height"),
            value: "auto",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
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
        labelName: i18n.t("editor.inspect.setter_label.border"),
        attrName: "border",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-border`,
            labelName: i18n.t("editor.inspect.setter_label.color"),
            attrName: "borderColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "#ffffffff",
          },
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            attrName: "radius",
            setterType: "EDITABLE_INPUT_WITH_MEASURE_SETTER",
            icon: <RadioIcon />,
            defaultValue: "4px",
          },
          {
            id: `${baseWidgetName}-style-border-width`,
            labelName: i18n.t("editor.inspect.setter_label.width"),
            attrName: "borderWidth",
            icon: <StrokeWidthIcon />,
            setterType: "EDITABLE_INPUT_WITH_MEASURE_SETTER",
            defaultValue: "1px",
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
            id: `${baseWidgetName}-style-background`,
            labelName: i18n.t("editor.inspect.setter_label.background"),
            attrName: "backgroundColor",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "#ffffffff",
          },
          {
            id: `${baseWidgetName}-style-shadow`,
            labelName: i18n.t("editor.inspect.setter_label.shadow.shadow"),
            attrName: "shadow",
            setterType: "SHADOW_SELECT_SETTER",
            defaultValue: "small",
            options: [
              {
                label: i18n.t("editor.inspect.setter_option.shadow.none"),
                value: "none",
              },
              {
                label: i18n.t("editor.inspect.setter_option.shadow.large"),
                value: "large",
              },
              {
                label: i18n.t("editor.inspect.setter_option.shadow.medium"),
                value: "medium",
              },
              {
                label: i18n.t("editor.inspect.setter_option.shadow.small"),
                value: "small",
              },
            ],
          },
        ],
      },
    ],
  },
]
