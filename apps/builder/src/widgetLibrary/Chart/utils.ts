import { get, max, mean, min, sum } from "lodash"
import { CHART_DATASET_AGGREGATION_METHOD } from "@/widgetLibrary/Chart/interface"

export const formatDataWithSum = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
) => {
  const data: number[] = []
  Object.keys(originData).forEach((x) => {
    let values: number[] = []
    const v = originData[x]
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
) => {
  const data: number[] = []

  Object.keys(originData).forEach((x) => {
    let values: number[] = []
    const v = originData[x]
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
) => {
  const data: number[] = []

  Object.keys(originData).forEach((x) => {
    let values: number[] = []
    const v = originData[x]
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
) => {
  const data: number[] = []

  Object.keys(originData).forEach((x) => {
    let values: number[] = []
    const v = originData[x]
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
) => {
  const data: number[] = []

  Object.keys(originData).forEach((x) => {
    let values: number[] = []
    const v = originData[x]
    v.forEach((vk) => {
      values.push(Number(get(vk, datasetValues, 0)))
    })
    const len = values.length
    let position
    if (len % 2) {
      position = (len + 1) / 2
    } else {
      position = (len || 0) / 2
    }
    data.push(values[position] || 0)
  })
  return data
}

export const formatDataWithCount = (
  originData: Record<string, unknown[]>,
  datasetValues: string,
) => {
  const data: number[] = []
  Object.keys(originData).forEach((x) => {
    const v = originData[x]
    data.push(v?.length || 0)
  })
  return data
}

export const formatData = (
  formatDataSources: Record<string, unknown[]>,
  datasetValues: string,
  aggregationMethod: CHART_DATASET_AGGREGATION_METHOD,
) => {
  switch (aggregationMethod) {
    case CHART_DATASET_AGGREGATION_METHOD.SUM: {
      return formatDataWithSum(formatDataSources, datasetValues)
    }
    case CHART_DATASET_AGGREGATION_METHOD.AVERAGE: {
      return formatDataWithAverage(formatDataSources, datasetValues)
    }
    case CHART_DATASET_AGGREGATION_METHOD.COUNT: {
      return formatDataWithCount(formatDataSources, datasetValues)
    }
    case CHART_DATASET_AGGREGATION_METHOD.MAX: {
      return formatDataWithMax(formatDataSources, datasetValues)
    }
    case CHART_DATASET_AGGREGATION_METHOD.MEDIAN: {
      return formatDataWithMedian(formatDataSources, datasetValues)
    }
    case CHART_DATASET_AGGREGATION_METHOD.MIN: {
      return formatDataWithMin(formatDataSources, datasetValues)
    }
    default: {
      return []
    }
  }
}

export const rotateGroupByData = function (matrix: number[][]) {
  const result: number[][] = new Array(matrix[0]?.length || 0)
    .fill(0)
    .map(() => {
      return new Array(matrix.length).fill(0)
    })

  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[i].length; ++j) {
      result[j][i] = matrix[i][j]
    }
  }
  return result
}
