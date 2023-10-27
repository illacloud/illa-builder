export interface BaseDataItemProps {
  level: number
  title: string
  type?: string
  canExpand?: boolean
  haveMoreAction?: boolean
  value: Record<string, unknown>
  selectedDisplayNames?: string[]
  onClick?: (displayName: string, type: string) => void
  dataType: "globalData" | "action" | "widget"
}
