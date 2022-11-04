import { MenuProps } from "@illa-design/menu"
import { BaseWidgetProps } from "@/widgetLibrary/interface"
import { HTMLAttributes } from "react"

export interface WrappedMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuProps {
  emptyState?: string
  pageSize?: number
  defaultSortKey?: string
  defaultSortOrder?: "ascend" | "descend"
  handleOnSortingChange?: () => void
  handleOnPaginationChange?: () => void
  handleOnColumnFiltersChange?: () => void
}

interface MenuOption {}

const menuOption = [
  {
    title: "title",
    icon: "icon",
    hidden: true,
    disabled: true,
  },
]

export interface MenuWidgetProps extends WrappedMenuProps, BaseWidgetProps {}
