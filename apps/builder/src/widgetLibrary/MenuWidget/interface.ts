import { HTMLAttributes } from "react"
import { MenuProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuProps {
  handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
  handleOnClickMenuItem: (path: string) => void
}

export interface MenuWidgetProps extends WrappedMenuProps, BaseWidgetProps {}
