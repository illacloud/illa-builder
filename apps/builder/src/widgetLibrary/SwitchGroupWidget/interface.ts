import { SwitchProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import LabelProps from "@/widgetLibrary/PublicSector/Label/interface"
import { TooltipWrapperProps } from "@/widgetLibrary/PublicSector/TooltipWrapper/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export type Pluralize<T> = {
  [K in keyof T as `${string & K}s`]: T[K][]
}

export interface SwitchItem {
  label: string | number
  value: string | number
  caption?: string
  disabled?: boolean
}
export interface WrappedSwitchGroupProps
  extends Omit<ValidateMessageOldProps, "value">,
    Pick<SwitchProps, "colorScheme"> {
  options: SwitchItem[]
  value: (string | number)[]
  layoutPosition: "left" | "right"
  invalid?: boolean
  displayName: string
  handleOnChange: (status: boolean, val: string | number | undefined) => void
}
export interface SwitchGroupWidgetProps
  extends WrappedSwitchGroupProps,
    BaseWidgetProps,
    LabelProps,
    Omit<TooltipWrapperProps, "children"> {
  optionConfigureMode?: "dynamic" | "static"
  manualOptions?: {
    label: string
    value: string | number
    disabled?: boolean
    extra?: any
  }[]
  mappedOption?: {
    labels: string[]
    values: any[]
    disables: boolean[]
  }
  validateMessage: string
  dataSources: unknown[]
  atLeastNumber: number
  upToNumber: number
}
