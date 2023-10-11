import { isObject } from "lodash"

export function dealRawData2ArrayData(rawData: unknown): object[] {
  if (rawData === undefined) {
    return []
  }
  if (Array.isArray(rawData)) {
    if (rawData.length === 0) {
      return []
    } else {
      if (isObject(rawData[0])) {
        return rawData
      } else {
        return rawData.map((item) => {
          return {
            field: item,
          }
        })
      }
    }
  } else {
    if (isObject(rawData)) {
      return [rawData]
    } else {
      return [
        {
          field: rawData,
        },
      ]
    }
  }
}
