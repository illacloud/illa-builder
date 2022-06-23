import { isArray, omit, isObject } from "@illa-design/system"
import { TreeDataType } from "@illa-design/tree-common"
import { ActionListState } from "@/redux/currentApp/action/actionState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
// import { DataItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceItem/interface"

export const actionListTransformer = (list: ActionListState) =>
  list.map((item) => {
    return {
      displayName: item.displayName,
      props: omit(item, ["displayName"]),
    }
  })

export const componentListTransformer = (root: ComponentNode) => {
  let id = 1000
  const dataList: TreeDataType[] = []
  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift() as ComponentNode
    dataList.push({
      title: node.displayName,
      children: dfsTransformer(node.props),
      key: `${id++}`,
    })
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

export const dfsTransformer = (
  props: {
    [key: string]: any
  } | null,
) => {
  if (props === null) {
    return []
  }
  const dataList: TreeDataType[] = []
  props &&
    Object.keys(props).forEach((key) => {
      if (isObject(props[key]) || isArray(props[key])) {
        dataList.push({
          title: `${key}`,
          key: key,
          children: dfsTransformer(props[key]),
        })
      } else {
        dataList.push({ title: `${key} ${props[key]}`, key: key })
      }
    })
  return dataList
}
