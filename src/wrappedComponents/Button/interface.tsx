import { HTMLAttributes } from "react"

export interface WrappedButtonProps extends HTMLAttributes<HTMLDivElement> {
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
}
