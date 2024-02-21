import { MenuProps } from "@illa-design/react"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedMenuProps extends MenuProps {
  menuLogo?: string
  menuTitle?: string
  onClickMenuLogo: () => void
}

export interface MenuWidgetProps
  extends Omit<WrappedMenuProps, "handleOnClickMenuItem" | "w" | "h">,
    BaseWidgetProps {
  menuLogo?: string
  menuTitle?: string
  optionConfigureMode?: "dynamic" | "static"
  mappedOption?: {
    labels: string[]
    values: any[]
    icons: string[]
    disables: boolean[]
    hidden: boolean[]
    groupLabels: string[]
  }
  onClickMenuLogo: () => void
}
