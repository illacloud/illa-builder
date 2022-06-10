import { ReactNode } from "react"
import LabelProps from "@/wrappedComponents/Label/interface"
import { RadioColorScheme } from "@illa-design/radio"

export interface WrappedRadioGroupProps<T> extends LabelProps {
  value?: T
  defaultValue?: T
  disabled?: boolean
  options: (
    | string
    | number
    | {
        label: ReactNode
        value: any
        disabled?: boolean
      }
  )[]
  direction?: "vertical" | "horizontal"
  tooltipText?: string
  checkedBackgroundColor?: RadioColorScheme
  handleUpdateDsl: (value: Record<string, any>) => void
}
