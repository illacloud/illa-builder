import { ChartType } from "chart.js"
import { difference } from "lodash"
import { v4 } from "uuid"
import { CHART_COLOR_TYPE_CONFIG } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { CHART_DATASET_AGGREGATION_METHOD } from "@/widgetLibrary/Chart"

export let datasetNameSet = new Set<string>()

const generateDatasetName = () => {
  let i = 1
  let datasetName = `Dataset ${i}`
  while (datasetNameSet.has(datasetName)) {
    i++
    datasetName = `Dataset ${i}`
  }
  return datasetName
}

export const generateDatasetItem = (
  chartType: ChartType,
  isGroup: boolean,
  hasColor: string[],
  hasDatasetNames: string[],
) => {
  const presetColor = CHART_COLOR_TYPE_CONFIG["illa-preset"]
  let color: string | string[] =
    presetColor[hasColor.length % presetColor.length]
  if (isGroup || chartType === "pie") {
    color = "illa-preset"
  } else {
    if (hasColor.length <= presetColor.length) {
      const diff = difference(presetColor, hasColor)
      if (diff.length > 0) {
        color = diff[0]
      }
    } else {
      color = presetColor[hasColor.length % presetColor.length]
    }
  }

  datasetNameSet = new Set<string>(hasDatasetNames)

  const datasetName = generateDatasetName()

  return {
    id: v4(),
    datasetName: datasetName,
    datasetValues: "",
    aggregationMethod: CHART_DATASET_AGGREGATION_METHOD.SUM,
    type: chartType,
    color: color,
  }
}
