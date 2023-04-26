import { CellContext } from "@tanstack/table-core"
import { isBoolean } from "lodash"
import {
  Rate,
  dayjsPro,
  isFunction,
  isNumber,
  isObject,
  isString,
} from "@illa-design/react"
import { ILLAMarkdown } from "@/components/ILLAMarkdown"
import { isValidCurrencyCode } from "@/constants/currency"
import { getLocalLanguage } from "@/page/User/Register"
import { getIcon } from "@/widgetLibrary/IconWidget/utils"
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
    currencyCode = "XXX",
    showThousandsSeparator,
    tagColor = "auto",
    tagColorJs,
    tagColorMode = "select",
    buttonGroupContent,
    iconGroupContent,
  } = data

  const locale = getLocalLanguage()

  switch (type) {
    case Columns.Text:
      return (props: CellContext<any, any>) => {
        return getStringPropertyValue(props, mappedValue, fromCurrentRow)
      }
    case Columns.Link:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableLink({
          cell: props,
          value,
        })
      }
    case Columns.Tag:
      let color = (tagColorMode === "select" ? tagColor : tagColorJs) || "auto"
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return RenderTableTag({
          cell: props,
          value,
          color,
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
    case Columns.Boolean:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        return isBoolean(value) ? value.toString() : "-"
      }
    case Columns.Number:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        const numberFormat = new Intl.NumberFormat(locale, {
          style: "decimal",
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          useGrouping: showThousandsSeparator,
        })
        return isNumber(formatVal) ? numberFormat.format(formatVal) : "-"
      }
    case Columns.Percent:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        const numberFormat = new Intl.NumberFormat(locale, {
          style: "percent",
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          useGrouping: showThousandsSeparator,
        })

        return isNumber(formatVal) ? numberFormat.format(formatVal) : "-"
      }
    case Columns.Currency:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        const currencyFormatter = new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
          useGrouping: showThousandsSeparator,
          ...(isValidCurrencyCode(currencyCode)
            ? {
                style: "currency",
                currency: currencyCode,
              }
            : {
                style: "decimal",
              }),
        })

        return isNumber(formatVal) ? currencyFormatter.format(formatVal) : "-"
      }
    case Columns.Date:
    case Columns.Time:
    case Columns.DateTime:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        const formatVal = dayjsPro(value).format(format)
        return formatVal ? formatVal : "-"
      }
    case Columns.Markdown:
      return (props: CellContext<any, any>) => {
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)
        return value ? <ILLAMarkdown textString={value} /> : "-"
      }
    case Columns.Rating:
      return (props: CellContext<any, any>) => {
        const value = getPropertyValue(props, mappedValue, fromCurrentRow)
        const maxCount = 5

        return <Rate count={maxCount} readonly value={Number(value) || 0} />
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
        const value = getStringPropertyValue(props, mappedValue, fromCurrentRow)

        return RenderTableButtonGroup({
          cell: props,
          value: buttonGroupContent,
        })
      }
    case Columns.IconGroup:
      return (props: CellContext<any, any>) => {
        return RenderTableIconGroup({
          cell: props,
          value: iconGroupContent,
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
