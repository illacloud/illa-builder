import { DatasetConfig } from "@/widgetLibrary/Chart/interface"
import {
  DEFAULT_TOOLTIP,
  getDefaultColorScheme,
} from "@/widgetLibrary/Chart/utils"

export const formatDataAsObject = (arr: object[], key: string) => {
  const _dataMap: { [key: string]: any } = {}
  arr.forEach((obj: any) => {
    Object.keys(obj).forEach((attr) => {
      if (_dataMap[attr]) {
        _dataMap[attr].push(obj[attr])
      } else {
        _dataMap[attr] = [obj[attr]]
      }
    })
  })
  const groups = _dataMap.current ? _dataMap.current[key] : []
  return
}

export const generateDatasetValue = (count: number, max: number) => {
  const arr = []
  while (count > 0) {
    arr.push((Math.floor(Math.random() * 10) / 10) * max)
    count--
  }
  return arr
}

export const generateNewDatasetItem = (
  number: number,
  count: number,
  max: number,
): DatasetConfig => ({
  key: "dataset" + number,
  name: "dataset" + number,
  values: generateDatasetValue(count, max),
  lineColor: getDefaultColorScheme(number - 1),
  type: "line",
  toolTip: DEFAULT_TOOLTIP,
  _beAdd: true,
})
