import { CellContext } from "@tanstack/table-core"
import { isBoolean } from "lodash"
import { FC } from "react"
import {
  Button,
  Image,
  ImageProps,
  Link,
  dayjsPro,
  isFunction,
  isNumber,
  isObject,
} from "@illa-design/react"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import {
  ColumnItemShape,
  defaultColumnItem,
} from "@/widgetLibrary/TableWidget/interface"

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

const RenderTableLink: FC<{
  cell: CellContext<any, any>
  value?: string
}> = (props) => {
  const { cell, value } = props
  const cellValue = value ?? cell.getValue()

  return cellValue ? (
    <Link href={cellValue} target="_blank">{`${cellValue}`}</Link>
  ) : (
    <span>{"-"}</span>
  )
}

const RenderTableImage: FC<{
  cell: CellContext<any, any>
  value?: string
  objectFit?: ImageProps["objectFit"]
}> = (props) => {
  const { cell, value, objectFit } = props

  return <Image src={value} objectFit={objectFit} draggable={false} />
}

const RenderTableButton: FC<{
  cell: CellContext<any, any>
  value?: string
  disabled?: boolean
  colorScheme?: string
  eventPath: string
  handleOnClickMenuItem?: (path: string) => void
}> = (props) => {
  const {
    disabled,
    value,
    colorScheme,
    cell,
    eventPath,
    handleOnClickMenuItem,
  } = props
  const paths = [eventPath, `${cell.row.index}`]
  const clickEvent = () => {
    handleOnClickMenuItem?.(convertPathToString(paths))
  }

  return (
    <Button
      w={"100%"}
      disabled={disabled}
      colorScheme={colorScheme}
      onClick={clickEvent}
    >{`${value ?? "-"}`}</Button>
  )
}

const getConfigFromColumnShapeData = <K extends keyof ColumnItemShape>(
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

const getCurrentValue = (
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

const getValueAndToString = (
  props: CellContext<any, any>,
  mappedValue?: unknown,
  fromCurrentRow?: Record<string, boolean>,
) => {
  const value = props.getValue()
  const index = props.row.index
  console.log(mappedValue, "CellContext mappedValue")
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
  } = data

  switch (type) {
    default:
      return (props: CellContext<any, any>) => {
        const value = props.getValue()
        if (isObject(value)) {
          return `${JSON.stringify(value)}`
        }
        return `${value ?? "-"}`
      }
    case "text":
      return (props: CellContext<any, any>) => {
        return getValueAndToString(props, mappedValue, fromCurrentRow)
      }
    case "link":
      return (props: CellContext<any, any>) => {
        const value = getValueAndToString(props, mappedValue, fromCurrentRow)
        return RenderTableLink({
          cell: props,
          value,
        })
      }
    case "image":
      return (props: CellContext<any, any>) => {
        const rowIndex = props.row.index
        const value = getValueAndToString(props, mappedValue, fromCurrentRow)
        const objectFit = getConfigFromColumnShapeData(
          "objectFit",
          data,
          rowIndex,
          fromCurrentRow,
        )
        return RenderTableImage({
          cell: props,
          value,
          objectFit,
        })
      }
    case "boolean":
      return (props: CellContext<any, any>) => {
        const value = getCurrentValue(props, mappedValue, fromCurrentRow)
        if (isBoolean(value)) {
          return value.toString()
        }
        return "-"
      }
    case "number":
      return (props: CellContext<any, any>) => {
        const value = getValueAndToString(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
      }
    case "percent":
      return (props: CellContext<any, any>) => {
        const value = getValueAndToString(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        return isNumber(formatVal)
          ? `${(formatVal * 100).toFixed(decimalPlaces)}%`
          : "-"
      }
    case "date":
      return (props: CellContext<any, any>) => {
        const value = getValueAndToString(props, mappedValue, fromCurrentRow)
        const formatVal = dayjsPro(value).format(format)
        return formatVal ? formatVal : "-"
      }
    case "button":
      return (props: CellContext<any, any>) => {
        const rowIndex = props.row.index
        const value = getValueAndToString(props, mappedValue, fromCurrentRow)
        const disabled = getConfigFromColumnShapeData(
          "disabled",
          data,
          rowIndex,
          fromCurrentRow,
        )
        const colorScheme = getConfigFromColumnShapeData(
          "colorScheme",
          data,
          rowIndex,
          fromCurrentRow,
        )

        return RenderTableButton({
          cell: props,
          value,
          disabled,
          colorScheme,
          eventPath,
          handleOnClickMenuItem,
        })
      }
  }
}
