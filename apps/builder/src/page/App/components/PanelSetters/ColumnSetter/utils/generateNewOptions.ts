import { v4 } from "uuid"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export const generateOptionItemId = () => `option-${v4()}`

export const generateNewOptionItem = (number: number): ColumnItemShape => ({
  header: `Custom Column ${number}`,
  accessorKey: generateOptionItemId(),
})
