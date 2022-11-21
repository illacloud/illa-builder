import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { dayjsPro, isNumber } from "@illa-design/system"
import { CellContext } from "@tanstack/table-core"
import { Link } from "@illa-design/link"
import { Button } from "@illa-design/button"
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

const renderTableLink = (props: CellContext<any, any>) => {
  const cellValue = props.getValue()
  return cellValue ? (
    <Link href={cellValue} target="_blank">{`${cellValue}`}</Link>
  ) : (
    "-"
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
  } = data

  switch (type) {
    default:
      return (props: CellContext<any, any>) => `${props.getValue() ?? "-"}`
    case "text":
      return (props: CellContext<any, any>) => {
        return `${mappedValue ? mappedValue : props.getValue() ?? "-"}`
      }
    case "link":
      return renderTableLink
    case "number":
      return (props: CellContext<any, any>) => {
        const formatVal = Number(mappedValue ? mappedValue : props?.getValue())
        return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
      }
    case "percent":
      return (props: CellContext<any, any>) => {
        const formatVal = Number(mappedValue ? mappedValue : props?.getValue())
        return isNumber(formatVal)
          ? `${(formatVal * 100).toFixed(decimalPlaces)}%`
          : "-"
      }
    case "date":
      return (props: CellContext<any, any>) => {
        const cellValue = mappedValue ? mappedValue : props?.getValue()
        const formatVal = dayjsPro(cellValue).format(format)
        return formatVal ? formatVal : "-"
      }
    case "button":
      return (props: CellContext<any, any>) => {
        return RenderTableButton({
          cell: props,
          mappedValue,
          eventPath,
          handleOnClickMenuItem,
        })
      }
  }
}
