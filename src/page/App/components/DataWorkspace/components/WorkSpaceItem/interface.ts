import { TreeDataType } from "@illa-design/tree-common"

export interface WorkSpaceItemProps {
  title: string
  dataList?: TreeDataType[]
  selectedKeys?: string[]
  handleSelect?: (selectedKeys: string[]) => void
}
