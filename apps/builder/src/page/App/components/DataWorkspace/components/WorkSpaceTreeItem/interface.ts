import { MouseEvent } from "react"

export interface WorkSpaceTreeItemProps {
  title: string
  data: Record<string, any>
  isSelected?: boolean
  level: number
  parentKey: string
  isChild?: boolean
  handleSelect?: (
    selectedKeys: string[],
    event: MouseEvent<HTMLDivElement>,
  ) => void
}

export interface WorkSpaceTreeNodeProps {
  name: string
  value: Record<string, unknown>
  itemKey: string
  parentKey: string
  level?: number
}
