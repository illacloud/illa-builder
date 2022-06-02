<<<<<<< Updated upstream
import { ButtonColorScheme } from "@illa-design/button/src"
=======
import { ButtonColorScheme } from "@illa-design/button"
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
  shape?: "square" | "round"
>>>>>>> Stashed changes
  colorScheme?: ButtonColorScheme
}
