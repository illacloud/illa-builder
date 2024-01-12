import { convertPathToString } from "@illa-public/dynamic-string"
import { CellContext } from "@tanstack/table-core"
import { isBoolean } from "lodash-es"
import {
  dayjsPro,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
} from "@illa-design/react"
import { isValidCurrencyCode } from "@/constants/currency"
import i18n from "@/i18n/config"
import {
  ColumnItemShape,
  Columns,
  defaultColumnItem,
} from "@/widgetLibrary/TableWidget/interface"
import {
  RenderTableButton,
  RenderTableButtonGroup,
  RenderTableIconGroup,
  RenderTableImage,
  RenderTableLink,
  RenderTableMarkdown,
  RenderTableRating,
  RenderTableStringCell,
  RenderTableTag,
} from "@/widgetLibrary/TableWidget/renderTableCell"

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
    if (isObject(data[0])) {
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
    if (isObject(data[0])) {
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
  }
  return columns
}

export const transTableColumnEvent = (events: any[], columnLength: number) => {
  let res: Record<string, any> = {}
  for (let i = 0; i < columnLength; i++) {
    res[i] = []
    events.forEach((event) => {
      const rowEvent: Record<string, any> = { ...event }
      if (event?.fromCurrentRow && isObject(event?.fromCurrentRow)) {
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

export const getMappedValue = (
  rowIndex: number,
  mappedValue: unknown,
  fromCurrentRow?: Record<string, boolean>,
  mappedValuePrefix: string = "mappedValue",
  defaultValue: unknown = "-",
) => {
  if (mappedValue != null && mappedValue !== "") {
    if (
      fromCurrentRow?.[`${mappedValuePrefix}`] &&
      Array.isArray(mappedValue)
    ) {
      return mappedValue[rowIndex] ?? defaultValue
    }
    return mappedValue ?? defaultValue
  }
  return defaultValue
}

export const getMappedValueFromCellContext = (
  props: CellContext<unknown, unknown>,
  mappedValue: unknown,
  fromCurrentRow?: Record<string, boolean>,
  mappedValuePrefix: string = "mappedValue",
  defaultValue: string = "-",
) => {
  const rowIndex = props.row.index

  return getMappedValue(
    rowIndex,
    mappedValue,
    fromCurrentRow,
    mappedValuePrefix,
    defaultValue,
  )
}

export const getPropertyValue = (
  props: CellContext<unknown, unknown>,
  mappedValue: unknown,
  fromCurrentRow?: Record<string, boolean>,
  mappedValuePrefix: string = "mappedValue",
) => {
  const value = props.getValue()
  const index = props.row.index

  if (mappedValue != null && mappedValue !== "") {
    if (
      fromCurrentRow?.[`${mappedValuePrefix}`] &&
      Array.isArray(mappedValue)
    ) {
      return mappedValue[index] ?? "-"
    }
    return mappedValue ?? "-"
  }

  return value ?? "-"
}

export const getStringPropertyValue = (
  props: CellContext<unknown, unknown>,
  mappedValue?: unknown,
  fromCurrentRow?: Record<string, boolean>,
  mappedValuePrefix: string = "mappedValue",
) => {
  const value = props.getValue()
  const index = props.row.index

  if (mappedValue) {
    if (
      fromCurrentRow?.[`${mappedValuePrefix}`] &&
      Array.isArray(mappedValue)
    ) {
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
    /^(((ht|f)tps?):\/\/)?(([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})\/?/,
  )
  return pattern.test(str)
}

export const getCellForType = (
  data: ColumnItemShape,
  eventPath: string,
  handleOnClickMenuItem: (path: string, index?: number) => void,
  columnIndex: number,
) => {
  const {
    type = "text",
    decimalPlaces = 0,
    format = "YYYY-MM-DD",
    mappedValue,
    fromCurrentRow,
    currencyCode = "XXX",
    showThousandsSeparator,
    tagLabel,
    tagColor = "auto",
    buttonGroupContent,
    iconGroupContent,
    alignment,
    backgroundColor,
  } = data

  const locale = i18n.language
  const columnEventPath = convertPathToString(["columns", `${columnIndex}`])

  switch (type) {
    case Columns.Text:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const bgColor = getMappedValueFromCellContext(
          props,
          backgroundColor,
          fromCurrentRow,
          "backgroundColor",
        )
        return RenderTableStringCell({ value, alignment, bgColor })
      }
    case Columns.Boolean:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        const currentVal = isBoolean(value) ? value.toString() : "-"
        return RenderTableStringCell({ value: currentVal, alignment })
      }
    case Columns.Number:
    case Columns.Percent:
    case Columns.Currency:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        const style = type === Columns.Number ? "decimal" : type
        const numberFormatOptions: Intl.NumberFormatOptions = {
          style,
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          useGrouping: !!showThousandsSeparator,
        }
        if (type === Columns.Currency) {
          numberFormatOptions.currency = isValidCurrencyCode(currencyCode)
            ? currencyCode
            : "XXX"
        }

        const numberFormat = new Intl.NumberFormat(locale, numberFormatOptions)
        const currentVal = isNumber(formatVal)
          ? numberFormat.format(formatVal)
          : "-"
        return RenderTableStringCell({ value: currentVal, alignment })
      }
    case Columns.Date:
    case Columns.Time:
    case Columns.DateTime:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const currentVal = dayjsPro(value).format(format)
        return RenderTableStringCell({ value: currentVal, alignment })
      }
    case Columns.Link:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableLink({
          cell: props,
          value,
          alignment,
        })
      }
    case Columns.Tag:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(
          props,
          tagLabel,
          fromCurrentRow,
          "tagLabel",
        )
        const color = getMappedValueFromCellContext(
          props,
          tagColor,
          fromCurrentRow,
          "tagColor",
          "auto",
        )
        return RenderTableTag({
          cell: props,
          value: isArray(value) ? value : [`${value}`],
          color,
          alignment,
        })
      }
    case Columns.Image:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableImage({
          cell: props,
          value,
          data,
        })
      }
    case Columns.Markdown:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableMarkdown({ value, alignment })
      }
    case Columns.Rating:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableRating({ value, alignment })
      }
    case Columns.Button:
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
    case Columns.ButtonGroup:
      return (props: CellContext<any, any>) => {
        const rowIndex = props.row.index
        const value = buttonGroupContent?.map((content) => {
          const { cellValue, fromCurrentRow } = content
          return {
            ...content,
            cellValue: `${getMappedValue(
              rowIndex,
              cellValue,
              fromCurrentRow,
              "cellValue",
            )}`,
          }
        })

        return RenderTableButtonGroup({
          cell: props,
          value,
          alignment,
          eventPath: columnEventPath,
          handleOnClick: handleOnClickMenuItem,
        })
      }
    case Columns.IconGroup:
      return (props: CellContext<any, any>) => {
        return RenderTableIconGroup({
          cell: props,
          alignment,
          value: iconGroupContent,
          eventPath: columnEventPath,
          handleOnClick: handleOnClickMenuItem,
        })
      }
    default:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        const stringValue = getStringPropertyValue(
          props,
          mappedValue,
          fromCurrentRow,
        )
        if (isBoolean(value)) {
          return RenderTableStringCell({ value: value.toString(), alignment })
        } else if (isNumber(value)) {
          return RenderTableStringCell({
            value: value.toFixed(decimalPlaces),
            alignment,
          })
        } else if (!isNaN(Number(value))) {
          return RenderTableStringCell({
            value: Number(value).toFixed(decimalPlaces),
            alignment,
          })
        } else if (isImageUrl(value)) {
          return RenderTableImage({
            cell: props,
            value: stringValue,
            data,
          })
        } else if (isValidUrl(value)) {
          return RenderTableLink({
            cell: props,
            value: stringValue,
            alignment,
          })
        } else {
          return RenderTableStringCell({
            value: stringValue,
            alignment,
          })
        }
      }
  }
}
