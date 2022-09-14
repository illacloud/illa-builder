import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

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
        setterType: "CHART_TYPE_SELECT_SETTER",
      },
      {
        id: `${baseWidgetName}-data-x-asis`,
        labelName: i18n.t("editor.inspect.setter_label.x_axis_value"),
        useCustomLayout: true,
        attrName: "xAxis",
        setterType: "CHART_X_ASIS_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType !== "pie",
      },
      {
        id: `${baseWidgetName}-data-value-labels`,
        labelName: i18n.t("editor.inspect.setter_label.value_labels"),
        useCustomLayout: true,
        attrName: "xAxis",
        setterType: "CHART_X_ASIS_SETTER",
        bindAttrName: ["chartType"],
        shown: (chartType: string) => chartType === "pie",
      },
      {
        id: `${baseWidgetName}-data-group-by`,
        labelName: i18n.t("editor.inspect.setter_label.group_by"),
        useCustomLayout: true,
        attrName: "groupBy",
        setterType: "CHART_GROUP_BY_SETTER",
      },
      {
        id: `${baseWidgetName}-data-test`,
        labelName: i18n.t("editor.inspect.setter_label.group_by"),
        useCustomLayout: true,
        attrName: "groupBy",
        setterType: "TEST_TEST_TEST_ITEM",
      },
    ],
  },
]
