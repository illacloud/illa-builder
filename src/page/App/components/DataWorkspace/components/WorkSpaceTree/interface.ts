export interface WorkSpaceTreeProps {
  title: string
  dataList?: Record<string, any>[]
  selectedKeys?: string[]
  handleSelect?: (selectedKeys: string[]) => void
}
