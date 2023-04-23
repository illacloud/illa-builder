import { SerializedStyles } from "@emotion/react"
import { ReactNode } from "react"

export interface SimpleTabsItem {
  title: string
  key: string
  element?: ReactNode
}

export interface SimpleTabsProps {
  items: SimpleTabsItem[]
  activeKey: string
  handleClickChangeTab: (activeKey: string) => void
  containerStyle?: SerializedStyles
}
