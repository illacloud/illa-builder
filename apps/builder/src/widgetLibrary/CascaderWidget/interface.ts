import { CascaderProps } from "@illa-design/react"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedCascaderWidgetProps
  extends Pick<
    CascaderProps<any>,
    | "options"
    | "value"
    | "placeholder"
    | "expandTrigger"
    | "allowClear"
    | "disabled"
    | "aria-readonly"
  > {
  displayName: string
  handleUpdateMultiExecutionResult: (
    updateSlice: {
      displayName: string
      value: Record<string, any>
    }[],
  ) => void
  handleOnChange?: () => void
  handleOnFocus?: () => void
  handleOnBlur?: () => void
  readOnly?: boolean
}

export interface CascaderWidgetProps
  extends WrappedCascaderWidgetProps,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {
  dataSource?: CascaderProps<any>["options"]
  dataSourceJS?: CascaderProps<any>["options"]
  dataSourceMode?: "dynamic" | "select"
}
