export interface BaseDataItemProps {
  level: number
  title: string
  type?: string
  canExpand?: boolean
  canFocused?: boolean
  haveMoreAction?: boolean
  value: Record<string, unknown>
  isSelected?: boolean
  onClick?: (displayName: string) => void
  dataType: "globalData" | "action" | "widget"
}
