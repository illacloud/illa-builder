export interface WorkSpaceTreeItemProps {
  title: string
  data: Record<string, any>
  level: number
  parentKey: string
  isChild?: boolean
}

export interface WorkSpaceTreeNodeProps {
  name: string
  value: unknown
  itemKey: string
  parentKey: string
  level?: number
}
