import { MouseEvent } from "react"

export interface WorkSpaceTreeProps {
  title: string
  dataList?: Record<string, any>[]
  selectedKeys?: string[]
  handleSelect?: (selectedKeys: string[], e: MouseEvent<HTMLDivElement>) => void
  onIllaFocus?: () => void
}
