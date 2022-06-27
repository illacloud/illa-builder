import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

export const CIRCLE_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "circle-progress-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "circle-progress-basic-Value",
        labelName: i18n.t("editor.inspect.setter_label.value"),
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "circle-progress-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "circle-progress-adornments-showText",
        labelName: i18n.t("editor.inspect.setter_label.hide_value_label"),
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "circle-progress-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "circle-progress-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "circle-progress-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        attrName: "hidden",
      },
      {
        id: "circle-progress-layout-alignment",
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
    id: "circle-progress-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "circle-progress-style-list",
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "circle-progress-color",
            labelName: i18n.t("editor.inspect.setter_label.color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "circle-progress-trailColor",
            labelName: i18n.t("editor.inspect.setter_label.trail_color"),
            setterType: "COLOR_SELECT_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "circle-progress-strokeWidth",
            labelName: i18n.t("editor.inspect.setter_label.stroke_width"),
            setterType: "INPUT_SETTER",
            attrName: "strokeWidth",
            defaultValue: "4px",
          },
        ],
      },
    ],
  },
]
