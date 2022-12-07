import { VALIDATION_TYPES } from "@/utils/validationFactory"

export interface ControlledInputProps {
  title: string
  value: string
  onChange: (value: string) => void
  expectedType?: VALIDATION_TYPES
  placeholder?: string
  tips?: string
}
