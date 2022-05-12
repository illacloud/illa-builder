import { ReactNode } from "react"

export interface SizeProps {
  w?: number | string
  h?: number | string
}

export type ComponentModel = {
  id: string
  name: string
  icon?: string | ReactNode // url
  type?: "" //组件类型
  defaults?: {
    version: 1
    rows: number
    columns: number
    // 其他一些默认的属性
  }
}
