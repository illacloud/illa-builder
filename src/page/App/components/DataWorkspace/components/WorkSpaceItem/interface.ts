export interface DataItem {
  displayName: string
  props: { [key: string]: any } | null
}

export interface WorkSpaceItemProps {
  title: string
  dataList?: DataItem[]
}
