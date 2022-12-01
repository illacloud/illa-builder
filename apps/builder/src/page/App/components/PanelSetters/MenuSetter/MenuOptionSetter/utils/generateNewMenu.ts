import { v4 } from "uuid"
import { MenuList } from "@/widgetLibrary/MenuWidget/interface"
import { ColumnItemShape } from "@/widgetLibrary/TableWidget/interface"

export const generateMenuItemId = () => `menu-${v4()}`
export const generateSubMenuItemId = () => `subMenu-${v4()}`

export const generateNewMenuItem = (number: number): MenuList => {
  const id = generateMenuItemId()
  return {
    id,
    title: `Menu ${number}`,
  }
}

export const generateNewSubMenuItem = (number: number): MenuList => {
  const id = generateSubMenuItemId()
  return {
    id,
    title: `subMenu ${number}`,
  }
}
