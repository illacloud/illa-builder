import { CellContext } from "@tanstack/table-core"
import { isBoolean } from "lodash"
import {
  dayjsPro,
  isFunction,
  isNumber,
  isObject,
  isString,
  Rate,
} from "@illa-design/react"
import {
  ColumnItemShape,
  defaultColumnItem,
} from "@/widgetLibrary/TableWidget/interface"
import {
  RenderTableButton,
  RenderTableImage,
  RenderTableLink,
} from "@/widgetLibrary/TableWidget/renderTableCell"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"

const getOldOrder = (cur: number, oldOrders?: Array<number>) => {
  return oldOrders?.[cur] ?? -1
}

export const tansDataFromOld = (
  data: Record<any, any>[],
  oldKeyMap: Record<string, ColumnItemShape>,
  oldKeyOrder: string[],
): ColumnItemShape[] => {
  const reOrderColumns: ColumnItemShape[] = []
  if (data?.length) {
    const newKeys = Object.keys(data[0])
    const filteredOldKeys = oldKeyOrder.filter((key) => {
      return newKeys.includes(key) || oldKeyMap[key].custom
    })
    const finalKeys = filteredOldKeys.concat(
      newKeys.filter((key) => {
        return !filteredOldKeys.includes(key)
      }),
    )
    finalKeys.forEach((key, index) => {
      const oldItem = oldKeyMap[key]
      if (oldItem) {
        reOrderColumns.push({
          ...oldItem,
          columnIndex: index,
        })
      } else {
        reOrderColumns.push({
          ...defaultColumnItem,
          id: key,
          header: key,
          accessorKey: key,
          columnIndex: index,
        })
      }
    })
  }
  return reOrderColumns
}

export const tansTableDataToColumns = (
  data: Record<any, any>[],
  oldOrders?: Array<number>,
): ColumnItemShape[] => {
  const columns: ColumnItemShape[] = []
  let cur = 0
  if (data && data.length > 0) {
    Object.keys(data[0]).forEach((key, index) => {
      let columnIndex = index
      if (index === getOldOrder(cur, oldOrders)) {
        columnIndex += 1
        cur += 1
      }
      columns.push({
        ...defaultColumnItem,
        id: key,
        header: key,
        accessorKey: key,
        columnIndex,
      } as ColumnItemShape)
    })
  }
  return columns
}

export const transTableColumnEvent = (events: any[], columnLength: number) => {
  let res: Record<string, any> = {}
  for (let i = 0; i < columnLength; i++) {
    res[i] = []
    events.forEach((event) => {
      const rowEvent: Record<string, any> = { ...event }
      if (event?.fromCurrentRow) {
        const keys = Object.keys(event?.fromCurrentRow)
        keys.forEach((key) => {
          // Determine whether the current key is taken from currentRow, if so, treat it as an array.
          if (event?.fromCurrentRow?.[key]) {
            rowEvent[key] = event?.[key]?.[i]
          } else {
            rowEvent[key] = event?.[key]
          }
        })
      }
      res[i].push(rowEvent)
    })
  }
  return res
}

export const getConfigFromColumnShapeData = <K extends keyof ColumnItemShape>(
  itemKey: K,
  data: ColumnItemShape,
  rowIndex: number,
  fromCurrentRow?: Record<K, boolean>,
): ColumnItemShape[K] => {
  const value = data[itemKey]
  if (fromCurrentRow?.[itemKey] && Array.isArray(value)) {
    return value[rowIndex]
  }
  return value
}

const getPropertyValue = (
  props: CellContext<any, any>,
  mappedValue: unknown,
  fromCurrentRow?: Record<string, boolean>,
) => {
  const value = props.getValue()
  const index = props.row.index

  if (mappedValue !== undefined && mappedValue !== null) {
    if (fromCurrentRow?.["mappedValue"] && Array.isArray(mappedValue)) {
      return mappedValue[index] ?? "-"
    }
    return mappedValue
  }

  return value ?? "-"
}

const getStringPropertyValue = (
  props: CellContext<any, any>,
  mappedValue?: unknown,
  fromCurrentRow?: Record<string, boolean>,
) => {
  const value = props.getValue()
  const index = props.row.index

  if (mappedValue) {
    if (fromCurrentRow?.["mappedValue"] && Array.isArray(mappedValue)) {
      return `${mappedValue[index] ?? "-"}`
    }
    return `${mappedValue}`
  }
  if (isObject(value)) {
    return `${JSON.stringify(value)}`
  }
  if (isFunction(value)) {
    return "-"
  }
  return `${value ?? "-"}`
}

const isImageUrl = (str: unknown) => {
  if (!isString(str)) return false
  return (
    str.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g) !== null
  )
}

const isValidUrl = (str: unknown) => {
  if (!isString(str)) return false
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i",
  )
  return pattern.test(str)
}

export const getCellForType = (
  data: ColumnItemShape,
  eventPath: string,
  handleOnClickMenuItem?: (path: string) => void,
) => {
  const {
    type = "text",
    decimalPlaces = 0,
    format = "YYYY-MM-DD",
    mappedValue,
    fromCurrentRow,
    iconName,
  } = data

  switch (type) {
    case "text":
      return (props: CellContext<any, any>) => {
        return getStringPropertyValue(props, mappedValue, fromCurrentRow)
      }
    case "link":
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableLink({
          cell: props,
          value,
        })
      }
    case "image":
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableImage({
          cell: props,
          value,
          data,
        })
      }
    case "boolean":
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        return isBoolean(value) ? value.toString() : "-"
      }
    case "number":
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
      }
    case "percent":
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        return isNumber(formatVal)
          ? `${(formatVal * 100).toFixed(decimalPlaces)}%`
          : "-"
      }
    case "date":
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = dayjsPro(value).format(format)
        return formatVal ? formatVal : "-"
      }
    case "icon":
      return (props: CellContext<any, any>) => {
        const Icon = getIcon(iconName)
        return Icon ? <Icon /> : "-"
      }
    case "rating":
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        const maxCount = 5

        return <Rate
          count={maxCount}
          readonly
          value={Number(value) || 0}
        />
      }
    case "button":
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)

        return RenderTableButton({
          cell: props,
          value,
          data,
          eventPath,
          handleOnClickMenuItem,
        })
      }
    default:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        if (isBoolean(value)) {
          return value.toString()
        } else if (isNumber(value)) {
          return value.toFixed(decimalPlaces)
        } else if (!isNaN(Number(value))) {
          return Number(value).toFixed(decimalPlaces)
        } else if (dayjsPro(value).isValid()) {
          return dayjsPro(value).format(format)
        } else if (isImageUrl(value)) {
          const stringValue = getStringPropertyValue(
            props,
            mappedValue,
            fromCurrentRow,
          )
          return RenderTableImage({
            cell: props,
            value: stringValue,
            data,
          })
        } else if (isValidUrl(value)) {
          const value = getStringPropertyValue(
            props,
            mappedValue,
            fromCurrentRow,
          )
          return RenderTableLink({
            cell: props,
            value,
          })
        } else {
          return getStringPropertyValue(props, mappedValue, fromCurrentRow)
        }
      }
  }
}
