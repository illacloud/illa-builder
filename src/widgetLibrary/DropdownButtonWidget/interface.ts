import { DropdownProps } from "@illa-design/dropdown"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedDropdownButtonProps extends DropdownProps {
  handleUpdateDsl: (value: any) => void
}

export interface DropdownButtonWidgetProps
  extends WrappedDropdownButtonProps,
    BaseWidgetProps {}
