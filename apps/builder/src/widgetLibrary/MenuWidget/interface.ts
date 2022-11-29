import { MenuProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"

export type MenuHorizontalAlign = "flex-start" | "center" | "flex-end"

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
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  handleOnClickMenuItem: (path: string) => void
}

export type MenuMode = "vertical" | "horizontal"

export interface MenuItemLabelProps {
  title?: string
  icon?: string
  mode?: MenuMode
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
