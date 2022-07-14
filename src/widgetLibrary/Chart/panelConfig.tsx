import { COLOR_SCHEME, XAXISTYPE } from "./interface"
import {
  PanelConfig,
  PanelFieldConfig,
} from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  HorizontalEndIcon,
  HorizontalStartIcon,
  MinusIcon,
  VerticalEndIcon,
  VerticalStartIcon,
} from "@illa-design/icon"

export const CHART_DATASET_CONFIG: PanelFieldConfig[] = [
  {
    id: "dataset-name",
    labelName: "Dataset name",
    attrName: "name",
    setterType: "INPUT_SETTER",
    isSetterSingleRow: true,
  },
  {
    id: "dataset-values",
    labelName: "Dataset values",
    attrName: "values",
    setterType: "INPUT_SETTER",
    isSetterSingleRow: true,
    expectedType: VALIDATION_TYPES.ARRAY,
  },
  {
    id: "dataset-type",
    labelName: "Type",
    attrName: "type",
    setterType: "BASE_SELECT_SETTER",
    options: [
      {
        label: "Bar Chart",
        value: "bar",
      },
      {
        label: "Line Chart",
        value: "line",
      },
      {
        label: "Scatterplot",
        value: "scatter",
      },
    ],
    isSetterSingleRow: true,
  },
  {
    id: "dataset-toolTip",
    labelName: "Tooltip",
    attrName: "toolTip",
    setterType: "INPUT_SETTER",
    isSetterSingleRow: true,
  },
  {
    id: "dataset-lineColor",
    labelName: "Color",
    attrName: "lineColor",
    setterType: "CHART_LINE_COLOR_LIST_SETTER",
    isSetterSingleRow: true,
    options: ["#fff", "#000", "#454545"],
  },
  {
    id: "dataset-remove",
    useCustomLayout: true,
    attrName: "remove",
    setterType: "CHART_REMOVE_BUTTON",
    isSetterSingleRow: true,
  },
]

export const CHART_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "chart-data",
    groupName: "DATA",
    children: [
      {
        id: "chart-data-config-type",
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
        id: "chart-chartJson",
        labelName: "data",
        isSetterSingleRow: true,
        attrName: "chartJson",
        setterType: "TEXT_AREA",
        bindAttrName: ["configType", "type"],
        shown: (value) => {
          return value["configType"] === "JSON"
        },
      },
      {
        id: "chart-data",
        labelName: "X-axis values",
        attrName: "xAxis",
        isSetterSingleRow: true,
        useCustomLayout: true,
        setterType: "CHART_DATA_SETTER",
        bindAttrName: ["configType", "type"],
        shown: (value) => {
          return value["configType"] === "UIForm"
        },
      },
    ],
  },
  {
    id: "chart-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "chart-layout-config-type",
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
        id: "chart-chartJson",
        labelName: "Layout",
        isSetterSingleRow: true,
        attrName: "layoutJson",
        setterType: "TEXT_AREA",
        bindAttrName: ["layoutConfigType", "type"],
        shown: (value) => {
          return value["layoutConfigType"] === "JSON"
        },
      },
      {
        id: "chart-title",
        labelName: "Title",
        attrName: "title",
        setterType: "INPUT_SETTER",
        defaultValue: "chart",
        bindAttrName: ["layoutConfigType", "type"],
        shown: (value) => {
          return value["layoutConfigType"] === "UIForm"
        },
      },
      {
        id: "chart-xAxisTitle",
        labelName: "xAxisTitle",
        attrName: "xTitle",
        setterType: "INPUT_SETTER",
        bindAttrName: ["layoutConfigType", "type"],
        shown: (value) => {
          return value["layoutConfigType"] === "UIForm"
        },
      },

      {
        id: "chart-xAxisType",
        labelName: "X-axis type",
        attrName: "xAxisType",
        setterType: "BASE_SELECT_SETTER",
        options: XAXISTYPE,
        bindAttrName: ["layoutConfigType", "type"],
        shown: (value) => {
          return value["layoutConfigType"] === "UIForm"
        },
      },
      {
        id: "chart-yAxisTitle",
        labelName: "yAxisTitle",
        attrName: "yTitle",
        setterType: "INPUT_SETTER",
        bindAttrName: ["layoutConfigType", "type"],
        shown: (value) => {
          return value["layoutConfigType"] === "UIForm"
        },
      },
      {
        id: "chart-legend-position",
        labelName: "Legend position",
        attrName: "legendPosition",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: "type",
        shown: (value) => {
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
