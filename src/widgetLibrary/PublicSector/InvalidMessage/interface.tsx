export interface ValidateMessageProps {
  value?: string
  pattern?: "Email" | "URL" | "Regex"
  regex?: string
  minLength?: number
  maxLength?: number
  required?: boolean
  customRule?: string
  hideValidationMessage?: boolean
}

export type ValidateCheckProps = Pick<
  ValidateMessageProps,
  "value" | "maxLength" | "minLength" | "required" | "pattern" | "regex"
>
