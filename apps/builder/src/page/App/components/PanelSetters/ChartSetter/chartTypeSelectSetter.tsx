import { ChartType } from "chart.js"
import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReactComponent as BarChartIcon } from "@/assets/chart/bar-chart.svg"
import { ReactComponent as LineChartIcon } from "@/assets/chart/line-chart.svg"
import { ReactComponent as PieChartIcon } from "@/assets/chart/pie-chart.svg"
import { ReactComponent as ScatterPlotIcon } from "@/assets/chart/scatter-plot.svg"
import i18n from "@/i18n/config"
import { ChartDatasetShape } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { CHART_PRESET_COLOR } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import {
  chartTypeIconCss,
  chartTypeStringCss,
} from "@/page/App/components/PanelSetters/ChartSetter/style"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { ChartTypeSelectSetterProps } from "./interface"

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
  {
    label: (
      <div>
        <PieChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.pie")}
        </span>
      </div>
    ),
    value: "pie",
  },
]

export const ChartTypeSelectSetter: FC<ChartTypeSelectSetterProps> = (
  props,
) => {
  const {
    attrName,
    expectedType,
    widgetDisplayName,
    widgetType,
    widgetOrAction,
    handleUpdateMultiAttrDSL,
    value,
  } = props

  const insertValues = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const targetComponentNode = searchDsl(
        getCanvas(rootState),
        widgetDisplayName,
      )
      if (!targetComponentNode) return {}
      return targetComponentNode.props || {}
    },
  )

  const datasets: ChartDatasetShape[] = useMemo(() => {
    return get(insertValues, "datasets", [])
  }, [insertValues])

  const isCanGroupBy = useMemo(() => {
    return !!get(insertValues, "groupBy", "")
  }, [insertValues])

  const generateNewDatasets = useCallback(
    (chartType: ChartType) => {
      if (!datasets.length) return []
      if (!isCanGroupBy && chartType !== "pie") {
        return datasets.map((dataset, index) => {
          return {
            ...dataset,
            type: chartType,
            color: CHART_PRESET_COLOR[index % CHART_PRESET_COLOR.length],
          }
        })
      } else {
        return datasets.map((dataset, index) => {
          return {
            ...dataset,
            type: chartType,
            color: "illa-preset",
          }
        })
      }
    },
    [datasets, isCanGroupBy],
  )

  const handleUpdateDsl = useCallback(
    (attrName: string, value: any) => {
      const newDatasets = generateNewDatasets(value)
      handleUpdateMultiAttrDSL?.({
        datasets: newDatasets,
        [attrName]: value,
      })
    },
    [generateNewDatasets, handleUpdateMultiAttrDSL],
  )

  return (
    <BaseSelectSetter
      attrName={attrName}
      handleUpdateDsl={handleUpdateDsl}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetType={widgetType}
      widgetOrAction={widgetOrAction}
      options={typeOptions}
      value={value}
    />
  )
}
