// import { DatePickerProps } from "@illa-design/react"
// import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
// import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
// import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
// import { BaseWidgetProps } from "@/widgetLibrary/interface"
//
// export interface WrappedDateProps
//   extends Pick<
//     DatePickerProps,
//     "value" | "readOnly" | "disabled" | "placeholder" | "colorScheme"
//   > {
//   dateFormat?: string
//   loading?: boolean
//   showClear?: DatePickerProps["allowClear"]
//   minDate?: string
//   maxDate?: string
//   handleUpdateDsl: (value: any) => void
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
// export interface DateWidgetProps
//   extends WrappedDateProps,
//     BaseWidgetProps,
//     LabelProps,
//     TooltipWrapperProps,
//     Omit<ValidateMessageOldProps, "value"> {
//   validateMessage: string
// }
