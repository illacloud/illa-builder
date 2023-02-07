import { HTMLAttributes } from "react"
import { MenuProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuProps {}

export interface MenuWidgetProps extends WrappedMenuProps, BaseWidgetProps {
  handleOnClickMenuItem?: (path: string) => void
}
