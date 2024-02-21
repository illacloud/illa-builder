import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import StrokeWidthIcon from "@/assets/stroke-width-icon.svg?react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

const baseWidgetName = "circle-progress"
export const CIRCLE_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-Value`,
        labelName: i18n.t("editor.inspect.setter_label.value"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.progress_percentage"),
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-basic-showText`,
        labelName: i18n.t("editor.inspect.setter_label.hide_value_label"),
        attrName: "showText",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
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
        id: `${baseWidgetName}-layout-hidden`,
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        attrName: "hidden",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-layout-alignment`,
        setterType: "RADIO_GROUP_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.label_alignment"),
        attrName: "alignment",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "end",
          },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-color-list`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-color`,
            labelName: i18n.t("editor.inspect.setter_label.styles"),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "color",
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-trailColor`,
            labelName: i18n.t("editor.inspect.setter_label.trail_color"),
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            attrName: "trailColor",
            defaultValue: "gray",
          },
        ],
      },
      {
        id: `${baseWidgetName}-style-list`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-strokeWidth`,
            labelName: i18n.t("editor.inspect.setter_label.stroke_width"),
            setterType: "MEASURE_CHECK_INPUT_SETTER",
            useCustomLayout: true,
            icon: <StrokeWidthIcon />,
            attrName: "strokeWidth",
            defaultValue: "4px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
