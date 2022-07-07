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
