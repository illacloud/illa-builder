import { XAXISTYPE } from "./interface"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  HorizontalEndIcon,
  HorizontalStartIcon,
  MinusIcon,
  VerticalEndIcon,
  VerticalStartIcon,
} from "@illa-design/icon"
import i18n from "@/i18n/config"

const baseWidgetName = "chart"

export const CHART_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-data-config-type`,
        attrName: "configType",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: "UI Form",
            value: "UIForm",
          },
          {
            label: "Chart JSON",
            value: "JSON",
          },
        ],
      },
      {
        id: `${baseWidgetName}-chartJson`,
        labelName: i18n.t("editor.inspect.setter_label.data"),
        isSetterSingleRow: true,
        attrName: "chartJson",
        setterType: "TEXT_AREA",
        bindAttrName: ["configType"],
        shown: value => value === "JSON",
      },
      {
        id: `${baseWidgetName}-data`,
        labelName: i18n.t("editor.inspect.setter_label.x_values"),
        attrName: "xAxis",
        isSetterSingleRow: true,
        useCustomLayout: true,
        setterType: "CHART_DATA_SETTER",
        bindAttrName: "configType",
        shown: value => value === "UIForm",
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-config-type`,
        attrName: "layoutConfigType",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "UIForm",
        options: [
          {
            label: "UI Form",
            value: "UIForm",
          },
          {
            label: "Chart JSON",
            value: "JSON",
          },
        ],
      },
      {
        id: `${baseWidgetName}-chartJson`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        isSetterSingleRow: true,
        attrName: "layoutJson",
        setterType: "TEXT_AREA",
        bindAttrName: ["layoutConfigType"],
        shown: value => {
          return value === "JSON"
        },
      },
      {
        id: `${baseWidgetName}-title`,
        labelName: i18n.t("editor.inspect.setter_label.title"),
        attrName: "title",
        setterType: "INPUT_SETTER",
        defaultValue: "chart",
        bindAttrName: ["layoutConfigType"],
        shown: value => {
          return value === "UIForm"
        },
      },
      {
        id: `${baseWidgetName}-xAxisTitle`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_title"),
        attrName: "xTitle",
        setterType: "INPUT_SETTER",
        bindAttrName: ["layoutConfigType"],
        shown: value => {
          return value === "UIForm"
        },
      },

      {
        id: `${baseWidgetName}-xAxisType`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_type"),
        attrName: "xAxisType",
        setterType: "BASE_SELECT_SETTER",
        options: XAXISTYPE,
        bindAttrName: ["layoutConfigType"],
        shown: value => {
          return value === "UIForm"
        },
      },
      {
        id: `${baseWidgetName}-yAxisTitle`,
        labelName: i18n.t("editor.inspect.setter_label.y_axis_title"),
        attrName: "yTitle",
        setterType: "INPUT_SETTER",
        bindAttrName: ["layoutConfigType"],
        shown: value => {
          return value === "UIForm"
        },
      },
      {
        id: `${baseWidgetName}-legend-position`,
        labelName: i18n.t("editor.inspect.setter_label.legend_position"),
        attrName: "legendPosition",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
        bindAttrName: ["type"],
        shown: value => {
          return value !== "pie"
        },
        options: [
          {
            label: <VerticalStartIcon />,
            value: "top",
          },
          { label: <HorizontalStartIcon />, value: "left" },
          { label: <HorizontalEndIcon />, value: "right" },

          {
            label: <VerticalEndIcon />,
            value: "bottom",
          },
          {
            label: (
              <span>
                <MinusIcon />
              </span>
            ),
            value: "hidden",
          },
        ],
      },
    ],
  },
]
