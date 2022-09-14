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
        id: `${baseWidgetName}-basic-chart-type`,
        labelName: i18n.t("editor.inspect.setter_label.chart_type"),
        attrName: "chartType",
        setterType: "CHART_TYPE_SELECT_SETTER",
      },
    ],
  },
]
