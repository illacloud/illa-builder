import { DatasetConfig } from "./interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { ChartDataset } from "chart.js"

const DEFAULT_TOOLTIP = "  %{x}: %{y}"

export const initData = (data?: object[]) => {
  if (!data || data.length === 0) return {}
  const allAttr: string[] = []
  const _dataSet: DatasetConfig[] = []
  const _dataMap: { [key: string]: any } = {}
  const obj: any = data[0]

  data.forEach((obj: any) => {
    Object.keys(obj).forEach((attr) => {
      if (_dataMap[attr]) {
        _dataMap[attr].push(obj[attr])
      } else {
        _dataMap[attr] = [obj[attr]]
      }
    })
  })
  Object.keys(obj).forEach((attr) => {
    if (obj && typeof obj[attr] == "number") {
      _dataSet.push({
        values: _dataMap[attr],
        name: attr,
        toolTip: attr + DEFAULT_TOOLTIP,
      })
    }
    allAttr.push(attr)
  })

  return {
    xAxis: allAttr,
    groupBy: allAttr,
    datasets: _dataSet,
    dataMap: _dataMap,
  }
}

const scheme = ["red", "purple", "orange", "yellow", "green", "blue", "cyan"]

export const getDefaultColorScheme = (index: number) => {
  return scheme[index % 7]
}

export const wrapDataset = (
  datasets?: DatasetConfig[],
  colorScheme?: string,
) => {
  const arr: ChartDataset[] = []
  const _map = new Map<string, string>()
  datasets?.map((set, index) => {
    const _colorScheme = colorScheme ?? getDefaultColorScheme(index)
    const _set = {
      label: set.name ?? "",
      data: set.values ?? [],
      backgroundColor:
        set.lineColor ?? globalColor(`--${illaPrefix}-${_colorScheme}-03`),
      borderColor:
        set.lineColor ?? globalColor(`--${illaPrefix}-${_colorScheme}-03`),
      yAxisID: "yAxis",
    }
    arr.push(_set)
    _map.set(set.name ?? "", set.toolTip ?? "")
  })
  return { datasets: arr as any, tooltips: _map }
}

export const wrapDatasetByGroup = (
  data?: object[],
  datasets?: DatasetConfig[],
  groups?: string[],
  groupBy?: string,
) => {
  if (!data) return {}
  const map: { [key: string]: DatasetConfig[] } = {}
  // const _groups = dataMap.current ? dataMap.current[groupBy] : []
  groups?.forEach((group: string) => {
    map[group] = []
    datasets?.map((set) => {
      const _value = set.values?.map((value, index) => {
        const obj = data[index]
        if (obj[groupBy as keyof typeof obj] === group) {
          return value
        }
        return null
      })
      map[group].push({
        values: _value ?? [],
        name: `${set.name} (${group})`,
        toolTip: set.toolTip,
      })
    })
  })
  const dataset: ChartDataset[] = []
  let _map = new Map<string, string>()
  let index = 0
  Object.values(map).forEach((value) => {
    const res = wrapDataset(value, getDefaultColorScheme(index++))
    dataset.push(...res.datasets)
    _map = new Map([..._map, ...res.tooltips])
  })
  return { datasets: dataset as any, tooltips: _map }
}

export const wrapPieDataset = (datasets?: DatasetConfig[]) => {
  if (!datasets || datasets.length === 0) return {}
  let tmp: (number | null)[] = []
  datasets.forEach((set) => {
    tmp = mergeArr(tmp, set.values)
  })
  const res: ChartDataset = {
    label: datasets[0].name ?? "",
    data: tmp ?? [],
    backgroundColor: tmp?.map((_, index) => getDefaultColorScheme(index)) ?? [],
    borderColor: tmp?.map((_, index) => getDefaultColorScheme(index)) ?? [],
    hoverOffset: 4,
  }
  const tooltipMap = new Map<string, string>()
  tooltipMap.set(datasets[0].name ?? "", datasets[0].toolTip ?? "")
  return { datasets: [res] as any, tooltips: tooltipMap }
}

export const mergeArr = (arr1?: any[], arr2?: any[]) => {
  if (!arr1 || arr1.length === 0) return arr2 ?? []
  if (!arr2) return arr1 ?? []
  return arr1.map((value, index) => (value ?? 0) + (arr2[index] ?? 0))
}

export const removeSubstitution = (
  str: string,
  map: { x: string; y: string; datasetLabel: string },
) => {
  return str
    .replace("%{x}", map.x)
    .replace("%{y}", map.y)
    .replace("%{fullData.name}", map.datasetLabel)
}
