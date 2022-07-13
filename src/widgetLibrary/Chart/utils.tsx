import { COLOR_SCHEME, DataObject, DatasetConfig } from "./interface"
import { ChartType } from "chart.js"
import { values } from "lodash"

export const DEFAULT_TOOLTIP = "%{fullData.name} %{x}: %{y}"

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
  let datasetsIndex = 0
  Object.keys(obj).forEach((attr) => {
    if (obj && typeof obj[attr] == "number") {
      _dataSet.push({
        key: attr,
        values: _dataMap[attr],
        name: attr,
        lineColor: getDefaultColorScheme(datasetsIndex),
        aggregationMethod: "NONE",
        hidden: false,
        toolTip: DEFAULT_TOOLTIP,
        type: "line",
      })
      datasetsIndex++
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

export const getDefaultColorScheme = (index: number) => {
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export const wrapData = (
  data?: DataObject[],
  xAxisValues?: string,
  datasets?: DatasetConfig[],
  type: ChartType = "line",
  groupby: boolean = false,
) => {
  const toolTipMap = new Map()
  let p = data
  const _addDataset = datasets?.filter((item) => item._beAdd)
  if (!groupby && _addDataset) {
    _addDataset.forEach((set) => {
      p =
        p?.map((item, index) => {
          return { ...item, [set.key ?? ""]: set.values?.[index] }
        }) ?? []
    })
  }

  console.log("wrapData", data, p, _addDataset)
  const wrappedDatasets = datasets
    ?.filter((set) => {
      return set.hidden !== true
    })
    .map((set, index) => {
      toolTipMap.set(set.name ?? "", set.toolTip ?? "")
      const _color = getDefaultColorScheme(index)
      return {
        type: (set.type ?? type) as any,
        label: set.name,
        data: p?.filter((value) => set.key && value[set.key]),
        value: set.values,
        borderColor: set.lineColor ?? _color,
        backgroundColor: set.lineColor ?? _color,
        strokeColor: set.lineColor ?? _color,
        parsing: {
          yAxisKey: set.key,
          xAxisKey: xAxisValues,
        },
      }
    })

  return { datasets: [...(wrappedDatasets ?? [])], tooltips: toolTipMap }
}

export const wrapDataWithGroupBy = (
  data?: DataObject[],
  xAxisValues?: string,
  datasets?: DatasetConfig[],
  type?: ChartType,
  groupBy?: string,
  groups?: string[],
) => {
  if (!data) return
  const _group = Array.from(new Set(groups))
  let p = data
  const _addDataset = datasets?.filter((item) => item._beAdd)
  if (_addDataset) {
    _addDataset.forEach((set) => {
      p =
        data?.map((item, index) => {
          return { ...item, [set.key ?? ""]: set.values?.[index] }
        }) ?? []
    })
  }
  const _data: DataObject[] = []
  const _datasets: DatasetConfig[] = []
  const datasetKeys = datasets?.map((value) => value.key)
  _group?.forEach((group, index) => {
    const datasetsWithGroup = datasets?.map((set) => {
      return {
        key: group + set.key,
        name: `${set.name}-${group}`,
        type: set.type ?? type,
        lineColor: getDefaultColorScheme(index),
        toolTip: set.toolTip,
      }
    })
    if (datasetsWithGroup) _datasets.push(...datasetsWithGroup)
    p?.forEach((obj) => {
      datasetKeys?.map((key) => {
        if (groupBy && obj[groupBy] === group) {
          _data.push({ ...obj, [group + key]: key ? obj[key] : null })
        } else {
          _data.push({ ...obj })
        }
      })
    })
  })

  return wrapData(_data, xAxisValues, _datasets, type, true)
}

// todo@aoao no Aggregation method in chartJS
export function aggregationDatasets(
  data?: DataObject[],
  type: string = "None",
) {
  switch (type) {
    case "None":
      return data
  }
}

export const wrapPieDataset = (datasets?: DatasetConfig[]) => {
  if (!datasets || datasets.length === 0) return {}
  let tmp: (number | null)[] = []
  datasets.forEach((set) => {
    tmp = mergeArr(tmp, set.values)
  })
  const res = {
    label: datasets[0].name ?? "",
    data: tmp ?? [],
    backgroundColor: tmp?.map((_, index) => getDefaultColorScheme(index)) ?? [],
    borderColor: tmp?.map((_, index) => getDefaultColorScheme(index)) ?? [],
    hoverOffset: 4,
  }
  const tooltipMap = new Map<string, string>()
  tooltipMap.set(datasets[0].name ?? "", datasets[0].toolTip ?? "")
  return { datasets: [res], tooltips: tooltipMap }
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
