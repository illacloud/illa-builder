import { v4 } from "uuid"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"
import { MenuList } from "@/widgetLibrary/MenuWidget/interface"

export const generateColumnItemId = () => `column-${v4()}`

export const generateNewColumnItem = (number: number): MenuList => {
  const id = generateColumnItemId()
  return {
    title: `Column ${number}`,
    id,
  }
}
