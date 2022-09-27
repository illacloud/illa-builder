import { v4 } from "uuid"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { CellContext } from "@tanstack/table-core"

export const generateColumnItemId = () => `column-${v4()}`

export const generateNewColumnItem = (number: number): ColumnItemShape => ({
  header: `Custom Column ${number}`,
  accessorKey: generateColumnItemId(),
  enableSorting: true,
  type: "text",
  visible: true,
  format: "YYYY-MM-DD",
})
