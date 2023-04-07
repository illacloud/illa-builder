import { v4 } from "uuid"
import {
  ColumnItemShape,
  defaultColumnItem,
} from "@/widgetLibrary/TableWidget/interface"

export const generateColumnItemId = () => `column-${v4()}`

export const generateNewColumnItem = (number: number): ColumnItemShape => {
  const id = generateColumnItemId()
  return {
    ...defaultColumnItem,
    custom: true,
    header: `Column ${number}`,
    id,
    accessorKey: id,
    columnIndex: number - 1,
  } as ColumnItemShape
}
