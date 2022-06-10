import { HTMLAttributes } from "react"

export type contentItemType = {
  type: string
  disabled?: boolean
  value?: string
  selectOptions?: string[]
  defaultSelectValue?: string
}

export type paramDataType = {
  title?: string
  subTitle?: string
  content: contentItemType[]
}

export interface SettingCommonFormProps extends HTMLAttributes<HTMLDivElement> {
  paramData: paramDataType[]
}
