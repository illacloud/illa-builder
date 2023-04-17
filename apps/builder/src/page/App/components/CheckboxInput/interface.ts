import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface CheckboxInputProps {
  onCheckboxChange: (value: boolean) => void
  onValueChange: (value: string) => void
  checkboxTitle: string
  checkboxValue: boolean
  inputTitle: string
  inputValue: string
  showInputEditor?: boolean
  inputPlaceholder?: string
  inputTips?: string
  hasExpectedType?: boolean
  expectedType?: VALIDATION_TYPES
}
