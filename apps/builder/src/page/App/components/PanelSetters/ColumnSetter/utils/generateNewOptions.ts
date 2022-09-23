import { v4 } from "uuid"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export const generateOptionItemId = () => `column-${v4()}`

export const generateNewOptionItem = (number: number): ColumnItemShape => ({
  header: `Custom Column ${number}`,
  accessorKey: `Custom Column ${number}`,
  enableSorting: true,
  type: "text",
  visible: true,
  format: "YYYY-MM-DD",
})
