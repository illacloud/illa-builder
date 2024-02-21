import { CascaderProps } from "@illa-design/react"
import LabelProps from "@/widgetLibrary/PC/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PC/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedCascaderWidgetProps
  extends Pick<
    CascaderProps,
    | "options"
    | "value"
    | "placeholder"
    | "allowClear"
    | "disabled"
    | "aria-readonly"
  > {
  displayName: string
  expandTrigger: CascaderProps["trigger"]
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
  extends Omit<
      WrappedCascaderWidgetProps,
      "handleOnChange" | "handleOnFocus" | "handleOnBlur"
    >,
    BaseWidgetProps,
    LabelProps,
    TooltipWrapperProps {
  dataSource?: CascaderProps["options"]
  dataSourceJS?: CascaderProps["options"]
  dataSourceMode?: "dynamic" | "select"
}
