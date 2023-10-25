import {
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid-premium"
import dayjs from "dayjs"
import {
  get,
  isArray,
  isBoolean,
  isDate,
  isNumber,
  isObject,
  isString,
} from "lodash"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import {
  Button,
  ButtonGroup,
  Image,
  Link,
  Paragraph,
  Rate,
  SingleDatePicker,
  Space,
  Tag,
  TimePicker,
} from "@illa-design/react"
import { GroupButton } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnButtonGroupSetter/interface"
import {
  ColumnConfig,
  ColumnType,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter/interface"
import {
  CurrencyCode,
  getHashCode,
  getPreColor,
  isValidLocale,
} from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/utils"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"

export function getColumnFromType(column: ColumnConfig): ColumnConfig {
  const commonValueGetter = (params: GridValueGetterParams) => {
    const index = params.api.getAllRowIds().findIndex((id) => id === params.id)
    if (index !== -1) {
      const mappedValue = get(params.colDef, "mappedValue")
      if (isArray(mappedValue)) {
        return mappedValue[index]
      } else {
        return params.value
      }
    } else {
      return params.value
    }
  }

  const commonDateValueGetter = (params: GridValueGetterParams) => {
    const index = params.api.getAllRowIds().findIndex((id) => id === params.id)
    if (index !== -1) {
      const mappedValue = get(params.colDef, "mappedValue")
      if (isArray(mappedValue)) {
        return dayjs(mappedValue[index], get(params.colDef, "format")).toDate()
      } else {
        return dayjs(params.value, get(params.colDef, "format")).toDate()
      }
    } else {
      return dayjs(params.value, get(params.colDef, "format")).toDate()
    }
  }

  switch (column.columnType) {
    case "button":
      return {
        ...column,
        type: "string",
        renderCell: (params: GridRenderCellParams) => {
          const disabled = isBoolean(get(params.colDef, "disabled"))
            ? get(params.colDef, "disabled")
            : false
          const colorScheme = get(params.colDef, "colorScheme") ?? "blue"
          const renderValue = isObject(params.value)
            ? JSON.stringify(params.value)
            : params.value
          return (
            <Button fullWidth disabled={disabled} colorScheme={colorScheme}>
              {renderValue}
            </Button>
          )
        },
        valueGetter: commonValueGetter,
      }
    case "buttongroup":
      return {
        ...column,
        type: "string",
        renderCell: (params: GridRenderCellParams) => {
          const buttonGroup: GroupButton[] =
            get(params.colDef, "buttonGroup") ?? []
          return (
            <ButtonGroup spacing="8px">
              {buttonGroup.map((button) => {
                let label = button.mappedValue
                const index = params.api
                  .getAllRowIds()
                  .findIndex((id) => id === params.id)
                if (isArray(label) && index !== -1) {
                  label = label[index]
                }
                if (isObject(label)) {
                  label = JSON.stringify(label)
                }
                const disabled = isBoolean(get(button, "disabled"))
                  ? get(button, "disabled")
                  : false
                return (
                  <Button
                    key={button.id}
                    colorScheme={button.colorScheme}
                    disabled={disabled}
                  >
                    {label}
                  </Button>
                )
              })}
            </ButtonGroup>
          )
        },
        valueGetter: commonValueGetter,
      }
    case "rating":
      return {
        ...column,
        type: "number",
        renderCell: (params: GridRenderCellParams) => {
          const maxCount = isNumber(get(params.colDef, "maxCount"))
            ? get(params.colDef, "maxCount")
            : 5
          const num = isNumber(params.value) ? params.value : 0
          return <Rate count={maxCount} allowHalf readonly value={num} />
        },
        valueGetter: commonValueGetter,
      }
    case "percent":
      return {
        ...column,
        type: "number",
        renderCell: (params: GridRenderCellParams) => {
          const decimalPlaces = get(params.colDef, "decimalPlaces")
          const locale = isValidLocale(get(params.colDef, "locale") ?? "en-US")
            ? get(params.colDef, "locale")
            : "en-US"
          const showThousandsSeparator = get(
            params.colDef,
            "showThousandsSeparator",
          )
          if (isNumber(decimalPlaces)) {
            return showThousandsSeparator
              ? `${Number(
                  Number(params.value * 100).toFixed(decimalPlaces),
                ).toLocaleString(locale)}%`
              : `${Number(params.value * 100).toFixed(decimalPlaces)}%`
          } else {
            return showThousandsSeparator
              ? `${Number(params.value * 100).toLocaleString(locale)}%`
              : `${params.value * 100}%`
          }
        },
        valueGetter: commonValueGetter,
      }
    case "html":
    case "markdown":
      return {
        ...column,
        type: "string",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                [
                  rehypeSanitize,
                  {
                    allowedTags: HTMLTags,
                  },
                ],
              ]}
              components={{
                a: ({ href, children }) => (
                  <Link href={href} target="_blank" colorScheme="blue">
                    {children}
                  </Link>
                ),
                p: ({ children }) => <Paragraph>{children}</Paragraph>,
              }}
            >
              {isObject(params.value)
                ? JSON.stringify(params.value)
                : params.value}
            </ReactMarkdown>
          )
        },
        valueGetter: commonValueGetter,
      }
    case "currency":
      return {
        ...column,
        type: "number",
        renderCell: (params: GridRenderCellParams) => {
          const decimalPlaces = get(params.colDef, "decimalPlaces")
          const locale = isValidLocale(get(params.colDef, "locale") ?? "en-US")
            ? get(params.colDef, "locale")
            : "en-US"
          const currencyCode = get(params.colDef, "currencyCode") ?? "USD"
          const showThousandsSeparator = get(
            params.colDef,
            "showThousandsSeparator",
          )
          if (isNumber(decimalPlaces)) {
            return showThousandsSeparator
              ? `${CurrencyCode[currencyCode] ?? "USD"}${Number(
                  Number(params.value).toFixed(decimalPlaces),
                ).toLocaleString(locale)}`
              : `${CurrencyCode[currencyCode ?? "USD"]}${Number(
                  params.value,
                ).toFixed(decimalPlaces)}`
          } else {
            return showThousandsSeparator
              ? `${CurrencyCode[currencyCode ?? "USD"]}${Number(
                  params.value,
                ).toLocaleString(locale)}`
              : `${CurrencyCode[currencyCode ?? "USD"]}${params.value}`
          }
        },
        valueGetter: commonValueGetter,
      }
    case "tag":
      return {
        ...column,
        type: "string",
        renderCell: (params: GridRenderCellParams) => {
          const tagColor = get(params.colDef, "tagColor")
          const tagLabelArray = isArray(params.value)
            ? params.value
            : [params.value]
          const tagColorMap = isObject(tagColor) ? tagColor : {}
          return (
            <Space>
              {tagLabelArray.map((label, index) => {
                const l = isObject(label) ? JSON.stringify(label) : label
                const c = get(tagColorMap, l) ?? getPreColor(getHashCode(l))
                return (
                  <Tag key={`${l}:${index}`} colorScheme={c}>
                    {l}
                  </Tag>
                )
              })}
            </Space>
          )
        },
        valueGetter: commonValueGetter,
      }
    case "image":
      return {
        ...column,
        type: "string",
        renderCell: (params: GridRenderCellParams) => {
          const objectFit = get(params.colDef, "objectFit")
          return <Image src={params.value} objectFit={objectFit} />
        },
        valueGetter: (params: GridValueGetterParams) => {
          return get(params.colDef, "mappedValue") ?? params.value
        },
      }
    case "number":
      return {
        ...column,
        type: "number",
        renderCell: (params: GridRenderCellParams) => {
          const decimalPlaces = get(params.colDef, "decimalPlaces")
          const locale = isValidLocale(get(params.colDef, "locale") ?? "en-US")
            ? get(params.colDef, "locale")
            : "en-US"
          const showThousandsSeparator = get(
            params.colDef,
            "showThousandsSeparator",
          )
          if (isNumber(decimalPlaces)) {
            return showThousandsSeparator
              ? Number(
                  Number(params.value).toFixed(decimalPlaces),
                ).toLocaleString(locale)
              : Number(params.value).toFixed(decimalPlaces)
          } else {
            return showThousandsSeparator
              ? Number(params.value).toLocaleString(locale)
              : params.value
          }
        },
        valueGetter: commonValueGetter,
      }
    case "boolean":
      return {
        ...column,
        type: "boolean",
        valueGetter: (params: GridValueGetterParams) => {
          return get(params.colDef, "mappedValue") ?? params.value
        },
      }
    case "date":
      return {
        ...column,
        type: "date",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <SingleDatePicker
              colorScheme="techPurple"
              editable={false}
              allowClear={false}
              value={params.value}
            />
          )
        },
        valueGetter: commonDateValueGetter,
      }
    case "datetime":
      return {
        ...column,
        type: "datetime",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <TimePicker
              colorScheme="techPurple"
              editable={false}
              allowClear={false}
              value={params.value}
            />
          )
        },
        valueGetter: commonDateValueGetter,
      }
    case "link":
      return {
        ...column,
        type: "string",
        renderCell: (params: GridRenderCellParams) => {
          return (
            <Link href={params.value} target="_blank">
              {params.value}
            </Link>
          )
        },
        valueGetter: commonValueGetter,
      }
    case "text":
    default:
      return {
        ...column,
        type: "string",
        valueGetter: commonValueGetter,
      }
  }
}

export function getSafeColumn(column: ColumnConfig): ColumnConfig {
  const newColum = { ...column }

  if (!isString(newColum.headerName)) {
    newColum.headerName = JSON.stringify(newColum.headerName)
  }

  if (!isNumber(newColum.width)) {
    newColum.width = 150
  }
  if (!isString(newColum.description)) {
    newColum.description = ""
  }
  if (!isBoolean(newColum.sortable)) {
    newColum.sortable = true
  }
  if (!isBoolean(newColum.pinnable)) {
    newColum.pinnable = true
  }
  if (!isBoolean(newColum.filterable)) {
    newColum.filterable = true
  }
  if (!isBoolean(newColum.hideable)) {
    newColum.hideable = true
  }
  if (!isBoolean(newColum.aggregable)) {
    newColum.aggregable = true
  }
  if (!isBoolean(newColum.groupable)) {
    newColum.groupable = true
  }
  if (!isBoolean(newColum.resizable)) {
    newColum.resizable = true
  }
  if (!isBoolean(newColum.disableReorder)) {
    newColum.disableReorder = false
  }
  return newColum
}

export function getColumnTypeFromValue(value: unknown): ColumnType {
  if (isNumber(value)) {
    return "number"
  } else if (isBoolean(value)) {
    return "boolean"
  } else if (isDate(value)) {
    return "date"
  } else if (isArray(value)) {
    return "tag"
  } else {
    return "text"
  }
}
