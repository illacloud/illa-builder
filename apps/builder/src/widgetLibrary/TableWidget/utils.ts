import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { dayjsPro, isNumber } from "@illa-design/system"

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