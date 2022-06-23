import { ReactNode } from "react"
import { TreeDataType } from "@illa-design/tree-common"

/*export interface DataItem {
  title: string | ReactNode
  children: { [key: string]: any } | null
}*/

export interface WorkSpaceItemProps {
  title: string
  dataList?: TreeDataType[]
}
