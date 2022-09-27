import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { dayjsPro, isNumber } from "@illa-design/system"
import { CellContext } from "@tanstack/table-core"

export const tansTableDataToColumns = (
  data: Record<any, any>[],
): ColumnItemShape[] => {
  const columns: ColumnItemShape[] = []
  if (data && data.length > 0) {
    Object.keys(data[0]).forEach((key) => {
      columns.push({
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

export const transDataForType = (data: ColumnItemShape) => {
  const {
    type = "text",
    decimalPlaces = 0,
    format = "YYYY-MM-DD",
    header,
  } = data
  const cellValue = header
  switch (type) {
    default:
      return cellValue
    case "text":
      return cellValue
    case "number":
      const formatVal = Number(cellValue)
      return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
    case "percent":
      const percentVal = Number(cellValue)
      return isNumber(percentVal)
        ? `${(percentVal * 100).toFixed(decimalPlaces)}%`
        : "-"
    case "date":
      const dayVal = dayjsPro(cellValue).format(format)
      return dayVal ? dayVal : "-"
  }
}

export const getCellForType = (data: ColumnItemShape) => {
  const {
    type = "text",
    decimalPlaces = 0,
    format = "YYYY-MM-DD",
    header,
  } = data

  switch (type) {
    default:
      return (props: CellContext<any, any>) => props.getValue()
    case "text":
      return (props: CellContext<any, any>) => props.getValue()
    case "number":
      return (props: CellContext<any, any>) => {
        const formatVal = Number(props?.getValue())
        return isNumber(formatVal) ? formatVal.toFixed(decimalPlaces) : "-"
      }
    case "percent":
      return (props: CellContext<any, any>) => {
        const formatVal = Number(props?.getValue())
        return isNumber(formatVal)
          ? `${(formatVal * 100).toFixed(decimalPlaces)}%`
          : "-"
      }
    case "date":
      return (props: CellContext<any, any>) => {
        const cellValue = props?.getValue()
        const formatVal = dayjsPro(cellValue).format(format)
        return formatVal ? formatVal : "-"
      }
  }
}
