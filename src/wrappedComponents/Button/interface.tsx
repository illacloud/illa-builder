import { ButtonColorScheme } from "@illa-design/button/src"

export type alignmentType = "start" | "center" | "end" | "fullWidth"

export interface WrappedButtonProps {
  variant?: "fill" | "outline"
  text?: string
  leftIcon?: string
  rightIcon?: string
  disabled?: boolean
  submit?: boolean
  submitTargetId?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  borderRadius?: string
  loading?: boolean
  alignment?: alignmentType
  tooltipText?: string
  colorScheme?: ButtonColorScheme
}
