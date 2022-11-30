import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { dayjsPro, isNumber, Link, Button } from "@illa-design/react"
import { CellContext } from "@tanstack/table-core"
import { FC } from "react"

export const tansTableDataToColumns = (
  data: Record<any, any>[],
): ColumnItemShape[] => {
  const columns: ColumnItemShape[] = []
  if (data && data.length > 0) {
    Object.keys(data[0]).forEach((key) => {
      columns.push({
        id: key,
        header: key,
        accessorKey: key,
        enableSorting: true,
        type: "text",
        visible: true,
        format: "YYYY-MM-DD",
      })
    })
  }
  return columns
}

const RenderTableLink: FC<{
  cell: CellContext<any, any>
  mappedValue?: string
}> = (props) => {
  const { cell, mappedValue } = props
  const cellValue = mappedValue ? mappedValue : cell.getValue()

  return cellValue ? (
    <Link href={cellValue} target="_blank">{`${cellValue}`}</Link>
  ) : (
    <span>{"-"}</span>
  )
}

const RenderTableButton: FC<{
  cell: CellContext<any, any>
  eventPath: string
  mappedValue?: string
  handleOnClickMenuItem?: (path: string) => void
}> = (props) => {
  const { cell, mappedValue, eventPath, handleOnClickMenuItem } = props

  const clickEvent = () => {
    handleOnClickMenuItem?.(eventPath)
  }

  return (
    <Button w={"100%"} onClick={clickEvent}>{`${
      mappedValue ? mappedValue : cell.getValue() ?? "-"
    }`}</Button>
  )
}

const getValue = (
  props: CellContext<any, any>,
  mappedValue?: string,
  fromCurrentRow?: boolean,
) => {
  const value = props.getValue()
  const index = props.row.index
  if (mappedValue) {
    if (fromCurrentRow && Array.isArray(mappedValue)) {
      return `${mappedValue[index] ?? "-"}`
    }
    return `${mappedValue}`
  }
  return value ?? "-"
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
      return (props: CellContext<any, any>) => `${props.getValue() ?? "-"}`
    case "text":
      return (props: CellContext<any, any>) => {
        return getValue(props, mappedValue, fromCurrentRow)
      }
    case "link":
      return (props: CellContext<any, any>) => {
        const value = getValue(props, mappedValue, fromCurrentRow)
        return RenderTableLink({
          cell: props,
          mappedValue: value,
        })
      }
    case "number":
      return (props: CellContext<any, any>) => {
        const value = getValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
      }
    case "percent":
      return (props: CellContext<any, any>) => {
        const value = getValue(props, mappedValue, fromCurrentRow)
        const formatVal = Number(value)
        return isNumber(formatVal)
          ? `${(formatVal * 100).toFixed(decimalPlaces)}%`
          : "-"
      }
    case "date":
      return (props: CellContext<any, any>) => {
        const value = getValue(props, mappedValue, fromCurrentRow)
        const formatVal = dayjsPro(value).format(format)
        return formatVal ? formatVal : "-"
      }
    case "button":
      return (props: CellContext<any, any>) => {
        const value = getValue(props, mappedValue, fromCurrentRow)
        return RenderTableButton({
          cell: props,
          mappedValue: value,
          eventPath,
          handleOnClickMenuItem,
        })
      }
  }
}
