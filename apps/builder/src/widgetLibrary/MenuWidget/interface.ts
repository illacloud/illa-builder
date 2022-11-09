import { MenuProps } from "@illa-design/menu"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"

export interface WrappedMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuProps {
  menuList?: MenuList[]
  emptyState?: string
  pageSize?: number
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
  handleOnSortingChange?: () => void
  handleOnPaginationChange?: () => void
  handleOnColumnFiltersChange?: () => void
}

export interface SubMenu {
  id: string
  title: string
  icon?: string
  hidden?: boolean
  disabled?: boolean
}

export interface MenuList extends SubMenu {
  subMenu?: SubMenu[]
}

export interface MenuWidgetProps extends WrappedMenuProps, BaseWidgetProps {}
