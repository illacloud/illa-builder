import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import {
  defaultChartData,
  defaultChartData02,
  LEGEND_POSITION,
  XAXISTYPE,
} from "@/wrappedComponents/Chart/interface"

export const CHART_DATASET_CONFIG: PanelConfig[] = [
  {
    id: "chart-title",
    isFullWidth: true,
    labelName: "Title",
    attrName: "title", // todo@aoao
    setterType: "INPUT_SETTER",
  },
  {
    id: "chart-xAxisTitle",
    isFullWidth: true,
    labelName: "xAxisTitle",
    attrName: "xTitle",
    setterType: "INPUT_SETTER",
  },

  {
    id: "chart-xAxisType",
    labelName: "X-axis type",
    attrName: "xAxisType",
    isFullWidth: true,
    setterType: "SELECT_SETTER",
    options: XAXISTYPE,
  },
  {
    id: "chart-yAxisTitle",
    isFullWidth: true,
    labelName: "yAxisTitle",
    attrName: "yTitle",
    setterType: "INPUT_SETTER",
  },
  {
    id: "chart-legend-position",
    labelName: "Legend position",
    attrName: "type",
    setterType: "RADIO_GROUP_SETTER",
    options: LEGEND_POSITION, // @todo 等晨哥把方位抽出
  },
]

export const CHART_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "chart-data",
    groupName: "DATA",
    children: [
      {
        id: "chart-data-config-type",
        isFullWidth: true,
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
        id: "chart-data-source",
        labelName: "Data source",
        isFullWidth: true,
        useCustomLabel: true,
        attrName: "dataSource",
        setterType: "CHART_DATA_SETTER",
        options: [
          {
            label: "value01",
            value: "value01",
          },
          {
            label: "value02",
            value: "value02",
          },
        ],
        bindAttrName: ["configType", "type"],
        shown: (value) => {
          return value["configType"] === "UIForm"
        },
      },
      // {
      //   id: "chart-type",
      //   labelName: "Chart type",
      //   isFullWidth: true,
      //   attrName: "type",
      //   setterType: "SELECT_SETTER",
      //   options: [
      //     {
      //       label: "Line chart",
      //       value: "Line",
      //     },
      //     {
      //       label: "Bar chart",
      //       value: "Bar",
      //     },
      //     {
      //       label: "Pie chart",
      //       value: "Pie",
      //     },
      //     {
      //       label: "ScatterPlot",
      //       value: "ScatterPlot",
      //     },
      //   ],
      //   bindAttrName: "configType",
      //   shown: (value) => value === "UIForm",
      // },
      // {
      //   id: "chart-xAxisValues",
      //   labelName: "X-axis values",
      //   useCustomLabel: true,
      //   attrName: "xAxisValues",
      //   setterType: "DYNAMIC_SELECT_SETTER",
      //   bindAttrName: ["configType", "type"],
      //   shown: (value) => {
      //     return value["configType"] === "UIForm" && value["type"] !== "Pie"
      //   },
      // },
      // {
      //   id: "chart-groupBy",
      //   labelName: "Group by",
      //   useCustomLabel: true,
      //   isFullWidth: true,
      //   attrName: "groupBy",
      //   setterType: "DYNAMIC_SELECT_SETTER",
      //   bindAttrName: ["configType", "type"],
      //   shown: (value) => {
      //     return value["configType"] === "UIForm" && value["type"] !== "Pie"
      //   },
      // },
      // {
      //   id: "chart-value-labels",
      //   labelName: "Value labels",
      //   useCustomLabel: true,
      //   isFullWidth: true,
      //   attrName: "groupBy",
      //   setterType: "DYNAMIC_SELECT_SETTER",
      //   bindAttrName: ["configType", "type"],
      //   shown: (value) => {
      //     return value["configType"] === "UIForm" && value["type"] === "Pie"
      //   },
      // },
      // {
      //   id: "chart-datasets",
      //   labelName: "datasets",
      //   isFullWidth: true,
      //   attrName: "type",
      //   setterType: "CHART_DATASETS_LIST_SETTER", // todo @aoao
      //   options: ["value1", "value2", "value3"],
      //   bindAttrName: "configType",
      //   shown: (value) => value === "UIForm",
      // },
      {
        id: "chart-data",
        labelName: "data",
        isFullWidth: true,
        attrName: "chartJson",
        setterType: "TEXTAREA_SETTER", // todo @aoao
        bindAttrName: ["configType", "type"],
        shown: (value) => {
          return value["configType"] === "JSON"
        },
      },
    ],
  },
  {
    id: "chart-interaction",
    groupName: "INTERACTION",
    children: [
      {
        id: "chart-interaction-disabled",
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
      {
        id: "chart-interaction-readonly",
        labelName: "Readonly",
        attrName: "readOnly",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: "chart-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "chart-title",
        isFullWidth: true,
        labelName: "Title",
        attrName: "title", // todo@aoao
        setterType: "INPUT_SETTER",
      },
      {
        id: "chart-xAxisTitle",
        isFullWidth: true,
        labelName: "xAxisTitle",
        attrName: "xTitle",
        setterType: "INPUT_SETTER",
      },

      {
        id: "chart-xAxisType",
        labelName: "X-axis type",
        attrName: "xAxisType",
        isFullWidth: true,
        setterType: "SELECT_SETTER",
        options: XAXISTYPE,
      },
      {
        id: "chart-yAxisTitle",
        isFullWidth: true,
        labelName: "yAxisTitle",
        attrName: "yTitle",
        setterType: "INPUT_SETTER",
      },
      {
        id: "chart-legend-position",
        labelName: "Legend position",
        attrName: "type",
        setterType: "RADIO_GROUP_SETTER",
        options: LEGEND_POSITION, // @todo 等晨哥把方位抽出
      },
    ],
  },
]
