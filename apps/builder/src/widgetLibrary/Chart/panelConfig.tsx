import { ReactComponent as BarChartIcon } from "@/assets/chart/bar-chart.svg"
import { ReactComponent as LineChartIcon } from "@/assets/chart/line-chart.svg"
import { ReactComponent as ScatterPlotIcon } from "@/assets/chart/scatter-plot.svg"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import {
  chartTypeIconCss,
  chartTypeStringCss,
} from "@/page/App/components/PanelSetters/ChartSetter/style"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { CHART_DATASET_AGGREGATION_METHOD } from "@/widgetLibrary/Chart/interface"

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
        id: `${baseWidgetName}-data-x-asis`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_value"),
        isSetterSingleRow: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_SELECT_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType !== "pie",
      },
      {
        id: `${baseWidgetName}-data-value-labels`,
        labelName: i18n.t("editor.inspect.setter_label.value_labels"),
        isSetterSingleRow: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_SELECT_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType === "pie",
      },
      {
        id: `${baseWidgetName}-data-group-by`,
        labelName: i18n.t("editor.inspect.setter_label.group_by"),
        isSetterSingleRow: true,
        attrName: "groupBy",
        setterType: "CHART_KEYS_SELECT_SETTER",
        allowClear: true,
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType !== "pie",
      },
      {
        id: `${baseWidgetName}-data-datasets`,
        labelName: i18n.t("editor.inspect.setter_label.datasets"),
        useCustomLayout: true,
        attrName: "datasets",
        setterType: "CHART_DATASETS_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType !== "pie",
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
            setterType: "BASE_SELECT_SETTER",
            options: aggregationMethodOptions,
          },
          {
            id: `${baseWidgetName}-chart-type`,
            labelName: i18n.t("editor.inspect.setter_label.chart_type"),
            isSetterSingleRow: true,
            attrName: "type",
            setterType: "BASE_SELECT_SETTER",
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
            setterType: "BASE_SELECT_SETTER",
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
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-layout-y-axis`,
        labelName: i18n.t("editor.inspect.setter_label.y_axis_name"),
        attrName: "yAxisName",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  // {
  //   id: `${baseWidgetName}-interaction`,
  //   groupName: i18n.t("editor.inspect.setter_group.adornments"),
  //   children: [
  //     {
  //       id: `${baseWidgetName}-adornments-tooltip`,
  //       labelName: i18n.t("editor.inspect.setter_label.tooltip"),
  //       labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
  //       attrName: "tooltipText",
  //       expectedType: VALIDATION_TYPES.STRING,
  //       setterType: "INPUT_SETTER",
  //     },
  //   ],
  // },
]
