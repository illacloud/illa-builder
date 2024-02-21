export interface ValidateMessageNewProps {
  validateMessage: string
}

export interface ValidateMessageOldProps {
  pattern?: "Email" | "URL" | "Regex"
  regex?: string
  minLength?: number
  maxLength?: number
  required?: boolean
  customRule?: string
  hideValidationMessage?: boolean
}

export interface ValidateCheckProps {
  value?: unknown
  pattern?: "Email" | "URL" | "Regex"
  regex?: string
  minLength?: number
  maxLength?: number
  required?: boolean
  customRule?: string
  maxFiles?: number
  minFiles?: number
  maxSize?: number
  minSize?: number
  sizeType?: string
  atLeastNumber?: number
  upToNumber?: number
  minDuration?: number
  maxDuration?: number
}
