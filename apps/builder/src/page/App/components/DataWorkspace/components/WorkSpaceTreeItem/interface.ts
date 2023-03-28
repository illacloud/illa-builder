import { MouseEvent } from "react"

export interface WorkSpaceTreeItemProps {
  title: string
  data: Record<string, any>
  isSelected?: boolean
  canEdit?: boolean
  level: number
  handleSelect?: (
    selectedKeys: string[],
    event: MouseEvent<HTMLDivElement>,
  ) => void
}

export interface WorkSpaceTreeNodeProps {
  name: string
  value: any
  itemKey: string
  canEdit?: boolean
  level?: number
}
