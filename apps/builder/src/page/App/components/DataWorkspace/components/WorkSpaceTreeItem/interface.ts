export interface WorkSpaceTreeItemProps {
  title: string
  data: Record<string, any>
  isSelected?: boolean
  handleSelect?: (selectedKeys: string[]) => void
}

export interface WorkSpaceTreeNodeProps {
  name: string
  value: any
  itemKey: string
  level?: number
}
