import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  BarChartIcon,
  LineChartIcon,
  PieChartIcon,
  ScatterPlotIcon,
} from "@illa-design/icon"
import {
  chartTypeIconCss,
  chartTypeStringCss,
} from "@/page/App/components/PanelSetters/ChartSetter/style"
import {
  CHART_DATASET_AGGREGATION_METHOD,
  CHART_TYPE,
} from "@/widgetLibrary/Chart/interface"

const typeOptions = [
  {
    label: (
      <span>
        <BarChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.bar")}
        </span>
      </span>
    ),
    value: CHART_TYPE.BAR,
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
    value: CHART_TYPE.LINE,
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
    value: CHART_TYPE.SCATTERPLOT,
  },
  {
    label: (
      <div>
        <PieChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.pie")}
        </span>
      </div>
    ),
    value: CHART_TYPE.PIE,
  },
]

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
    value: CHART_TYPE.BAR,
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
    value: CHART_TYPE.LINE,
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
    value: CHART_TYPE.SCATTERPLOT,
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
        setterType: "CHART_DATASOURCE_SELECT_SETTER",
      },
      {
        id: `${baseWidgetName}-data-chart-type`,
        labelName: i18n.t("editor.inspect.setter_label.chart_type"),
        attrName: "chartType",
        setterType: "BASE_SELECT_SETTER",
        options: typeOptions,
      },
      {
        id: `${baseWidgetName}-data-x-asis`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_value"),
        useCustomLayout: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_SELECT_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType !== "pie",
      },
      {
        id: `${baseWidgetName}-data-value-labels`,
        labelName: i18n.t("editor.inspect.setter_label.value_labels"),
        useCustomLayout: true,
        attrName: "xAxis",
        setterType: "CHART_KEYS_SELECT_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType === "pie",
      },
      {
        id: `${baseWidgetName}-data-group-by`,
        labelName: i18n.t("editor.inspect.setter_label.group_by"),
        useCustomLayout: true,
        attrName: "groupBy",
        setterType: "CHART_KEYS_SELECT_SETTER",
      },
      {
        id: `${baseWidgetName}-data-datasets`,
        labelName: i18n.t("editor.inspect.setter_label.datasets"),
        useCustomLayout: true,
        attrName: "datasets",
        setterType: "CHART_DATASETS_SETTER",
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
            useCustomLayout: true,
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
            setterType: "BASE_SELECT_SETTER",
          },
        ],
      },
    ],
  },
]
