import { MenuProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedMenuProps extends MenuProps {}

export interface MenuWidgetProps
  extends Omit<WrappedMenuProps, "handleOnClickMenuItem" | "w" | "h">,
    BaseWidgetProps {}
