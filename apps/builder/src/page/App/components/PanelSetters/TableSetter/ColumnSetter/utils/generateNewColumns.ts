import { v4 } from "uuid"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export const generateColumnItemId = () => `column-${v4()}`

export const generateNewColumnItem = (number: number): ColumnItemShape => {
  const id = generateColumnItemId()
  return {
    header: `Column ${number}`,
    id,
    accessorKey: id,
    enableSorting: true,
    type: "text",
    visible: true,
    custom: true,
    format: "YYYY-MM-DD",
    columnIndex: number - 1,
  } as ColumnItemShape
}
