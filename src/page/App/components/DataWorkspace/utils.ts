import { omit } from "@illa-design/system"
import { ActionListState } from "@/redux/currentApp/action/actionState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { DataItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceItem/interface"

export const actionListTransformer = (list: ActionListState) =>
  list.map((item) => {
    return {
      displayName: item.displayName,
      props: omit(item, ["displayName"]),
    }
  })

export const componentListTransformer = (root: ComponentNode) => {
  const dataList: DataItem[] = []
  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift() as ComponentNode
    dataList.push({ displayName: node.displayName, props: node.props })
    if (node.childrenNode) {
      let temp = node.childrenNode
      Object.keys(temp).forEach((key) => {
        queue.push(temp[key])
      })
    }
  }
  dataList.shift()
  return dataList
}
