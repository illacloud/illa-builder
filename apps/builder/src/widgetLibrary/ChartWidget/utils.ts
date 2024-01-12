import { ChartType } from "chart.js"
import dayjs from "dayjs"
import { get, max, mean, min, sum } from "lodash-es"
import { CHART_DATASET_AGGREGATION_METHOD } from "@/widgetLibrary/ChartWidget/interface"

export const formatDataWithSum = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
  realXAxis: string[],
) => {
  const data: number[] = []
  realXAxis.forEach((x) => {
    let values: number[] = []
    const v = originData[x] ?? []
    v.forEach((vk) => {
      values.push(Number(get(vk, datasetValues, 0)))
    })
    data.push(sum(values))
  })
  return data
}

export const formatDataWithMax = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
  realXAxis: string[],
) => {
  const data: number[] = []

  realXAxis.forEach((x) => {
    let values: number[] = []
    const v = originData[x] ?? []
    v.forEach((vk) => {
      values.push(Number(get(vk, datasetValues, 0)))
    })
    data.push(max(values) || 0)
  })

  return data
}

export const formatDataWithMin = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
  realXAxis: string[],
) => {
  const data: number[] = []

  realXAxis.forEach((x) => {
    let values: number[] = []
    const v = originData[x] ?? []
    v.forEach((vk) => {
      values.push(Number(get(vk, datasetValues, 0)))
    })
    data.push(min(values) || 0)
  })

  return data
}

export const formatDataWithAverage = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
  realXAxis: string[],
) => {
  const data: number[] = []

  realXAxis.forEach((x) => {
    let values: number[] = []
    const v = originData[x] ?? []
    v.forEach((vk) => {
      values.push(Number(get(vk, datasetValues, 0)))
    })
    data.push(mean(values) || 0)
  })
  return data
}

export const formatDataWithMedian = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
  realXAxis: string[],
) => {
  const data: number[] = []

  realXAxis.forEach((x) => {
    let values: number[] = []
    const v = originData[x] ?? []
    v.forEach((vk) => {
      values.push(Number(get(vk, datasetValues, 0)))
    })
    values = values.sort((a, b) => a - b)

    const len = values.length
    if (len % 2) {
      data.push(values[Math.floor(len / 2)])
    } else {
      data.push((values[len / 2] + values[len / 2 - 1]) / 2)
    }
  })

  return data
}

export const formatDataWithCount = (
  originData: Record<string, unknown[]>,
  realXAxis: string[],
) => {
  const data: number[] = []

  realXAxis.forEach((x) => {
    const v = originData[x] ?? []
    data.push(v?.length || 0)
  })
  return data
}

export const formatData = (
  formatDataSources: Record<string, unknown[]>,
  datasetValues: string,
  aggregationMethod: CHART_DATASET_AGGREGATION_METHOD,
  realXAxis: string[] = [],
) => {
  switch (aggregationMethod) {
    case CHART_DATASET_AGGREGATION_METHOD.SUM: {
      return formatDataWithSum(formatDataSources, datasetValues, realXAxis)
    }
    case CHART_DATASET_AGGREGATION_METHOD.AVERAGE: {
      return formatDataWithAverage(formatDataSources, datasetValues, realXAxis)
    }
    case CHART_DATASET_AGGREGATION_METHOD.COUNT: {
      return formatDataWithCount(formatDataSources, realXAxis)
    }
    case CHART_DATASET_AGGREGATION_METHOD.MAX: {
      return formatDataWithMax(formatDataSources, datasetValues, realXAxis)
    }
    case CHART_DATASET_AGGREGATION_METHOD.MEDIAN: {
      return formatDataWithMedian(formatDataSources, datasetValues, realXAxis)
    }
    case CHART_DATASET_AGGREGATION_METHOD.MIN: {
      return formatDataWithMin(formatDataSources, datasetValues, realXAxis)
    }
    default: {
      return []
    }
  }
}

export const typeWithNoAxis = (type: ChartType | string) => {
  return type === "pie" || type === "doughnut" || type === "radar"
}

export const typeWithDiffColor = (type: ChartType) => {
  return type === "pie" || type === "doughnut"
}

export const mergeValueFromDynamic = (
  isDynamic: boolean,
  attrValue: string,
  attrValueDynamic: string,
) => {
  if (isDynamic) {
    return attrValueDynamic
  }
  return attrValue
}

export const getDateFormatLabel = (value: string, dateFormat?: string) => {
  try {
    return dayjs(value).format(dateFormat)
  } catch (e) {
    return value
  }
}
