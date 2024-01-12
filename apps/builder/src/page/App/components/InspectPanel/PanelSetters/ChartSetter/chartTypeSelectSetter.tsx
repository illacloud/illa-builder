import { ChartType } from "chart.js"
import { get } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import BarChartIcon from "@/assets/chart/bar-chart.svg?react"
import DoughnutIcon from "@/assets/chart/doughnut-chart.svg?react"
import LineChartIcon from "@/assets/chart/line-chart.svg?react"
import PieChartIcon from "@/assets/chart/pie-chart.svg?react"
import RadarIcon from "@/assets/chart/radar-chart.svg?react"
import ScatterPlotIcon from "@/assets/chart/scatter-plot.svg?react"
import i18n from "@/i18n/config"
import { ChartDatasetShape } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter/interface"
import { CHART_PRESET_COLOR } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import {
  chartTypeIconCss,
  chartTypeStringCss,
  chatOptionContainerStyle,
} from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/style"
import BaseSelectSetter from "@/page/App/components/InspectPanel/PanelSetters/SelectSetter/baseSelect"
import {
  getComponentMap,
  searchComponentFromMap,
} from "@/redux/currentApp/components/componentsSelector"
import { RootState } from "@/store"
import { ChartTypeSelectSetterProps } from "./interface"

const typeOptions = [
  {
    label: (
      <div css={chatOptionContainerStyle}>
        <BarChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.bar")}
        </span>
      </div>
    ),
    value: "bar",
  },
  {
    label: (
      <div css={chatOptionContainerStyle}>
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
      <div css={chatOptionContainerStyle}>
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
      <div css={chatOptionContainerStyle}>
        <PieChartIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_content.chart_type.pie")}
        </span>
      </div>
    ),
    value: "pie",
  },
  {
    label: (
      <div css={chatOptionContainerStyle}>
        <DoughnutIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_option.chart.chart-type.Doughnut")}
        </span>
      </div>
    ),
    value: "doughnut",
  },
  {
    label: (
      <div css={chatOptionContainerStyle}>
        <RadarIcon css={chartTypeIconCss} />
        <span css={chartTypeStringCss}>
          {i18n.t("editor.inspect.setter_option.chart.chart-type.Radar")}
        </span>
      </div>
    ),
    value: "radar",
  },
]

const ChartTypeSelectSetter: FC<ChartTypeSelectSetterProps> = (props) => {
  const { widgetDisplayName, handleUpdateMultiAttrDSL } = props

  const insertValues = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const targetComponentNode = searchComponentFromMap(
        getComponentMap(rootState),
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
        return datasets.map((dataset) => {
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
      {...props}
      handleUpdateDsl={handleUpdateDsl}
      options={typeOptions}
    />
  )
}

ChartTypeSelectSetter.displayName = "ChartTypeSelectSetter"
export default ChartTypeSelectSetter
