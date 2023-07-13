import { StepsProps } from "@illa-design/react"
import { ValidateMessageOldProps } from "@/widgetLibrary/PublicSector/InvalidMessage/interface"
import { BaseWidgetProps } from "@/widgetLibrary/interface"

export interface WrappedStepsProps
  extends Omit<ValidateMessageOldProps, "value">,
    Pick<StepsProps, "direction" | "items" | "current"> {
  handleUpdateDsl: (value: any) => void
  getValidateMessage: (value?: unknown) => string
  linkContainer: boolean
  linkWidgetDisplayName?: string
  viewList?: any[]
  currentKey?: any
  current?: number
  currentIndex?: number
  defaultStep?: string
  disabled?: boolean
  handleStepsChange?: (current: number) => void
}

export interface StepsWidgetProps extends WrappedStepsProps, BaseWidgetProps {
  optionConfigureMode: "dynamic" | "static"
  manualOptions?: StepsOptionsType[]
  mappedOption?: StepsMappedOptionType
}

export interface StepsMappedOptionType {
  labels: string[]
  values: any[]
  hiddens: boolean[]
  captions: string[]
  tooltips: string[]
}
export interface StepsOptionsType {
  id: string
  key?: string
  label?: string
  value?: any
  caption?: string
  tooltip?: string
  hidden?: boolean
}
