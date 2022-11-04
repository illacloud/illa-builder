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

const i = [
  {
    title: "title",
    icon: "icon",
    hidden: true,
  },
]

export interface MenuWidgetProps extends WrappedMenuProps, BaseWidgetProps {}
