// import { DatePickerProps } from "@illa-design/react"
// import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
// import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
// import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
// import { BaseWidgetProps } from "@/widgetLibrary/interface"
//
// export interface WrappedDateTimeProps
//   extends Pick<
//     DatePickerProps,
//     "placeholder" | "disabled" | "readOnly" | "colorScheme"
//   > {
//   value?: string
//   format?: string
//   minuteStep?: number
//   tooltipText?: string
//   loading?: boolean
//   showClear?: DatePickerProps["allowClear"]
//   minDate?: string
//   maxDate?: string
//   displayName: string
//   getValidateMessage: (value?: unknown) => string
//   handleUpdateMultiExecutionResult: (
//     updateSlice: {
//       displayName: string
//       value: Record<string, any>
//     }[],
//   ) => void
//   handleOnChange?: () => void
// }
//
// export interface DateTimeWidgetProps
//   extends WrappedDateTimeProps,
//     BaseWidgetProps,
//     LabelProps,
//     TooltipWrapperProps,
//     Omit<ValidateMessageOldProps, "value"> {
//   validateMessage: string
// }
