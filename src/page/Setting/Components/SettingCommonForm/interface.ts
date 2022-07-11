import { ChangeEvent } from "react"

export type contentItemType = {
  type: string
  disabled?: boolean
  loading?: boolean
  value?: string
  selectOptions?: string[]
  defaultSelectValue?: string
  showError?: boolean
  errorMsg?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onPasswordChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export type paramDataType = {
  title?: string
  subTitle?: string
  content: contentItemType[]
}

export interface SettingCommonFormProps {
  paramData: paramDataType[]
  onSubmit: () => void
}
