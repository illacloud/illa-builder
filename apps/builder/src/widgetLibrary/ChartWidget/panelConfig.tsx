import { ChartType } from "chart.js"
import {
  HorizontalEndIcon,
  HorizontalStartIcon,
  ReduceIcon,
  VerticalEndIcon,
  VerticalStartIcon,
} from "@illa-design/react"
import BarChartIcon from "@/assets/chart/bar-chart.svg?react"
import LineChartIcon from "@/assets/chart/line-chart.svg?react"
import ScatterPlotIcon from "@/assets/chart/scatter-plot.svg?react"
import RadioIcon from "@/assets/radius-icon.svg?react"
import i18n from "@/i18n/config"
import {
  chartTypeIconCss,
  chartTypeStringCss,
} from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/style"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { CHART_DATASET_AGGREGATION_METHOD } from "@/widgetLibrary/ChartWidget/interface"
import { typeWithNoAxis } from "./utils"

const datasetsTypeOption = [
  {
    label: (
      <span>
        <BarChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.bar")}
        </span>
      </span>
    ),
    value: "bar",
  },
  {
    label: (
      <div>
        <LineChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.line")}
        </span>
      </div>
    ),
    value: "line",
  },
  {
    label: (
      <div>
        <ScatterPlotIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.scatterplot")}
        </span>
      </div>
    ),
    value: "scatter",
  },
]

const aggregationMethodOptions = [
  CHART_DATASET_AGGREGATION_METHOD.SUM,
  CHART_DATASET_AGGREGATION_METHOD.COUNT,
  CHART_DATASET_AGGREGATION_METHOD.MAX,
  CHART_DATASET_AGGREGATION_METHOD.MIN,
  CHART_DATASET_AGGREGATION_METHOD.AVERAGE,
  CHART_DATASET_AGGREGATION_METHOD.MEDIAN,
]

const baseWidgetName = "chart"
export const CHART_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-data-source`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        useCustomLayout: true,
        attrName: "dataSource",
        setterType: "DATA_SOURCE_SELECT_SETTER",
      },
      {
        id: `${baseWidgetName}-data-chart-type`,
        labelName: i18n.t("editor.inspect.setter_label.chart_type"),
        attrName: "chartType",
        setterType: "CHART_TYPE_SELECT_SETTER",
      },
      {
        id: `${baseWidgetName}-data-direction`,
        labelName: i18n.t("editor.inspect.setter_label.chart.direction"),
        labelDesc: i18n.t("editor.inspect.setter_tips.chart.direction"),
        attrName: "direction",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: ChartType) => !typeWithNoAxis(chartType),
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.chart.direction.vertical",
            ),
            value: "x",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_option.chart.direction.horizontal",
            ),
            value: "y",
          },
        ],
      },
      // x axis or horizontal x axis
      {
        id: `${baseWidgetName}-data-x-asis`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_value"),
        isSetterSingleRow: true,
        useCustomLayout: true,
        openDynamic: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_DYNAMIC_SELECT_SETTER",
        bindAttrName: ["chartType", "direction"],
        shown: (chartType: ChartType, direction: "x" | "y") => {
          if (
            typeWithNoAxis(chartType) ||
            (!typeWithNoAxis(chartType) && direction === "y")
          )
            return false
          return true
        },
      },
      {
        id: `${baseWidgetName}-data-x-asis-horizontal`,
        labelName: i18n.t("editor.inspect.setter_label.chart.y-axis_value"),
        labelDesc: i18n.t("editor.inspect.setter_tips.chart.y-axis_value"),
        isSetterSingleRow: true,
        useCustomLayout: true,
        openDynamic: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_DYNAMIC_SELECT_SETTER",
        bindAttrName: ["chartType", "direction"],
        shown: (chartType: ChartType, direction: "x" | "y") => {
          if (!typeWithNoAxis(chartType) && direction === "y") return true
          return false
        },
      },
      {
        id: `${baseWidgetName}-data-value-labels`,
        labelName: i18n.t("editor.inspect.setter_label.value_labels"),
        isSetterSingleRow: true,
        useCustomLayout: true,
        openDynamic: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_DYNAMIC_SELECT_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => typeWithNoAxis(chartType),
      },
      {
        id: `${baseWidgetName}-data-group-by`,
        labelName: i18n.t("editor.inspect.setter_label.group_by"),
        isSetterSingleRow: true,
        useCustomLayout: true,
        openDynamic: true,
        attrName: "groupBy",
        setterType: "CHART_KEYS_DYNAMIC_SELECT_SETTER",
        allowClear: true,
        bindAttrName: ["chartType"],
        shown: (chartType: string) => !typeWithNoAxis(chartType),
      },
      {
        id: `${baseWidgetName}-data-isStack`,
        labelName: i18n.t(
          "editor.inspect.setter_label.chart.stack_grouped_data",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.chart.stack_grouped_data",
        ),
        attrName: "isStack",
        setterType: "SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["chartType", "groupBy"],
        shown: (chartType: string, groupBy: string) =>
          !typeWithNoAxis(chartType) && !!groupBy,
      },
      {
        id: `${baseWidgetName}-data-datasets`,
        labelName: i18n.t("editor.inspect.setter_label.datasets"),
        useCustomLayout: true,
        attrName: "datasets",
        setterType: "CHART_DATASETS_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => !typeWithNoAxis(chartType),
        childrenSetter: [
          {
            id: `${baseWidgetName}-datasets-name`,
            labelName: i18n.t("editor.inspect.setter_label.dataset.name"),
            isSetterSingleRow: true,
            attrName: "datasetName",
            setterType: "INPUT_SETTER",
          },
          {
            id: `${baseWidgetName}-datasets-value`,
            labelName: i18n.t("editor.inspect.setter_label.dataset.value"),
            isSetterSingleRow: true,
            useCustomLayout: true,
            openDynamic: true,
            attrName: "datasetValues",
            setterType: "CHART_KEYS_DYNAMIC_SELECT_SETTER",
          },
          {
            id: `${baseWidgetName}-aggregation-method`,
            labelName: i18n.t(
              "editor.inspect.setter_label.dataset.aggregation_method",
            ),
            isSetterSingleRow: true,
            attrName: "aggregationMethod",
            setterType: "SEARCH_SELECT_SETTER",
            options: aggregationMethodOptions,
          },
          {
            id: `${baseWidgetName}-chart-type`,
            labelName: i18n.t("editor.inspect.setter_label.chart_type"),
            isSetterSingleRow: true,
            attrName: "type",
            setterType: "SEARCH_SELECT_SETTER",
            options: datasetsTypeOption,
          },
          {
            id: `${baseWidgetName}-color`,
            labelName: i18n.t("editor.inspect.setter_label.color"),
            isSetterSingleRow: true,
            attrName: "color",
            setterType: "CHART_COLOR_SELECT_SETTER",
          },
        ],
      },
      {
        id: `${baseWidgetName}-data-datasets-bar`,
        labelName: i18n.t("editor.inspect.setter_label.datasets"),
        useCustomLayout: true,
        attrName: "datasets",
        setterType: "CHART_DATASETS_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType === "pie",
        childrenSetter: [
          {
            id: `${baseWidgetName}-datasets-name`,
            labelName: i18n.t("editor.inspect.setter_label.dataset.name"),
            isSetterSingleRow: true,
            attrName: "datasetName",
            setterType: "INPUT_SETTER",
          },
          {
            id: `${baseWidgetName}-datasets-value`,
            labelName: i18n.t("editor.inspect.setter_label.dataset.value"),
            isSetterSingleRow: true,
            attrName: "datasetValues",
            setterType: "CHART_KEYS_SELECT_SETTER",
          },
          {
            id: `${baseWidgetName}-aggregation-method`,
            labelName: i18n.t(
              "editor.inspect.setter_label.dataset.aggregation_method",
            ),
            isSetterSingleRow: true,
            attrName: "aggregationMethod",
            setterType: "SEARCH_SELECT_SETTER",
            options: aggregationMethodOptions,
          },
          {
            id: `${baseWidgetName}-color`,
            labelName: i18n.t("editor.inspect.setter_label.color"),
            isSetterSingleRow: true,
            attrName: "color",
            setterType: "CHART_COLOR_SELECT_SETTER",
          },
        ],
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
        id: `${baseWidgetName}-label-legend_position`,
        labelName: i18n.t("editor.inspect.setter_label.chart.legend_position"),
        labelDesc: i18n.t("editor.inspect.setter_tips.chart.legend_position"),
        attrName: "legendPosition",
        setterType: "RADIO_GROUP_SETTER",
        bindAttrName: ["labelHidden"],
        isSetterSingleRow: true,
        shown: (labelHidden: boolean) => !labelHidden,
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "left",
          },
          {
            label: <VerticalStartIcon />,
            value: "top",
          },
          {
            label: <VerticalEndIcon />,
            value: "bottom",
          },
          {
            label: <HorizontalEndIcon />,
            value: "right",
          },
          {
            label: <ReduceIcon />,
            value: "hidden",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-title`,
        labelName: i18n.t("editor.inspect.setter_label.chart_title"),
        attrName: "chartTitle",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-layout-x-axis`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_name"),
        attrName: "xAxisName",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => !typeWithNoAxis(chartType),
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      // x type name or horizontal x type name
      {
        id: `${baseWidgetName}-layout-x-type`,
        labelName: i18n.t("editor.inspect.setter_label.chart.x-axis_type"),
        labelDesc: i18n.t("editor.inspect.setter_tips.chart.x-axis_type"),
        attrName: "xType",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["chartType", "direction"],
        shown: (chartType: ChartType, direction: "x" | "y") => {
          if (typeWithNoAxis(chartType)) return false
          return direction === "x"
        },
        setterType: "SEARCH_SELECT_SETTER",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.chart.x-axis_type.Default",
            ),
            value: "default",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_option.chart.x-axis_type.Date",
            ),
            value: "time",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-x-type-horizontal`,
        labelName: i18n.t("editor.inspect.setter_label.chart.y-axis_type"),
        labelDesc: i18n.t("editor.inspect.setter_tips.chart.y-axis_type"),
        attrName: "xType",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["chartType", "direction"],
        shown: (chartType: ChartType, direction: "x" | "y") => {
          if (typeWithNoAxis(chartType)) return false
          return direction === "y"
        },
        setterType: "SEARCH_SELECT_SETTER",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.chart.x-axis_type.Default",
            ),
            value: "default",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_option.chart.x-axis_type.Date",
            ),
            value: "time",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-Format`,
        labelName: i18n.t("editor.inspect.setter_label.chart.format"),
        labelDesc: i18n.t("editor.inspect.setter_tips.chart.format"),
        attrName: "dateFormat",
        bindAttrName: ["xType", "chartType"],
        shown: (xType: string, chartType: string) => {
          if (typeWithNoAxis(chartType)) return false
          return xType === "time"
        },
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-layout-y-axis`,
        labelName: i18n.t("editor.inspect.setter_label.y_axis_name"),
        attrName: "yAxisName",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => !typeWithNoAxis(chartType),
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
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
  {
    id: `${baseWidgetName}-styles`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-styles-border`,
        setterType: "BORDER_SETTER",
        useCustomLayout: true,
        attrName: "border",
      },
      {
        id: `${baseWidgetName}-styles-color`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "border",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-background`,
            labelName: i18n.t("editor.inspect.setter_label.background"),
            attrName: "backgroundColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
            defaultValue: "#ffffffff",
          },
          {
            id: `${baseWidgetName}-style-grid-line-color`,
            labelName: i18n.t("editor.inspect.setter_label.chart.grid_line"),
            labelDesc: i18n.t("editor.inspect.setter_tips.chart.grid_line"),
            attrName: "gridLineColor",
            setterType: "COLOR_PICKER_SETTER",
            useCustomLayout: true,
          },
        ],
      },
      {
        id: `${baseWidgetName}-styles-style`,
        setterType: "STYLE_CONTAINER_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.style"),
        attrName: "style",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-radius`,
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            attrName: "radius",
            setterType: "MEASURE_CHECK_INPUT_SETTER",
            useCustomLayout: true,
            icon: <RadioIcon />,
            defaultValue: "4px",
          },
          {
            id: `${baseWidgetName}-style-shadow`,
            labelName: i18n.t("editor.inspect.setter_label.shadow.shadow"),
            attrName: "shadow",
            setterType: "SHADOW_SELECT_SETTER",
            useCustomLayout: true,
            defaultValue: "none",
          },
        ],
      },
    ],
  },
]
