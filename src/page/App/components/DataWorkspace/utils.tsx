import { isArray, omit, isObject } from "@illa-design/system"
import { TreeDataType } from "@illa-design/tree-common"
import { ActionListState } from "@/redux/currentApp/action/actionState"
import {
  applyJsonValueColorStyle,
  itemNameDescStyle,
  itemNameStyle,
  jsonItemStyle,
  jsonNameStyle,
  jsonValueStyle,
} from "./style"
import { ExecutionState } from "@/redux/currentApp/executionTree/execution/executionState"

export const actionListTransformer = (list: ActionListState) =>
  list.map((item) => {
    const childrenArray = dfsTransformer(
      omit(item, ["displayName"]),
      item.actionId,
    )
    return {
      title: (
        <>
          <label css={itemNameStyle}>{item.displayName}&nbsp;</label>
          <label css={itemNameDescStyle}>
            {`{ }`}&nbsp;&nbsp;{childrenArray.length}key
          </label>
        </>
      ),
      children: childrenArray,
      key: item.actionId,
    }
  })

// 取root作BFS，原本的转换算法，先保留
/*export const componentListTransformer = (root: ComponentNode) => {
  const dataList: TreeDataType[] = []
  const queue = [root]
  while (queue.length > 0) {
    const node = queue.shift() as ComponentNode
    const childrenArray = dfsTransformer(node.props, node.displayName)
    dataList.push({
      title: (
        <>
          <span css={itemNameStyle}>{node.displayName}&nbsp;</span>
          <span css={itemNameDescStyle}>
            {`{}`}&nbsp;&nbsp;{childrenArray.length}key
          </span>
        </>
      ),
      children: childrenArray,
      key: node.displayName,
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
}*/

export const widgetListTransformer = (execution: ExecutionState["result"]) => {
  const dataList: TreeDataType[] = []
  Object.keys(execution).forEach((key) => {
    const childrenArray = dfsTransformer(execution[key], key)
    dataList.push({
      title: (
        <>
          <label css={itemNameStyle}>{key}&nbsp;</label>
          <label css={itemNameDescStyle}>
            {`{ }`}&nbsp;&nbsp;{childrenArray.length}key
          </label>
        </>
      ),
      children: childrenArray,
      key: key,
    })
  })
  return dataList
}

export const globalInfoTransformer = (
  globalInfoList: {
    displayName: string
    treeId: string
    [key: string]: any
  }[],
) =>
  globalInfoList.map((item) => {
    const childrenArray = dfsTransformer(
      omit(item, ["displayName", "treeId"]),
      item.treeId,
    )
    return {
      title: (
        <>
          <label css={itemNameStyle}>{item.displayName}&nbsp;</label>
          <label css={itemNameDescStyle}>
            {`{`}&nbsp;{`}`}&nbsp;&nbsp;{childrenArray.length}key
          </label>
        </>
      ),
      children: childrenArray,
      key: item.treeId,
    }
  })

export const dfsTransformer = (
  props: {
    [key: string]: any
  } | null,
  pre: string,
) => {
  if (props === null) {
    return []
  }
  const dataList: TreeDataType[] = []
  props &&
    Object.keys(props)
      .filter((item) => !item.startsWith("$"))
      .forEach((key) => {
        if (isObject(props[key]) || isArray(props[key])) {
          const childrenArray = dfsTransformer(props[key], pre + key)
          dataList.push({
            title: (
              <>
                <label css={itemNameStyle}>{key}&nbsp;</label>
                <label css={itemNameDescStyle}>
                  {isObject(props[key]) ? `{ }` : `[ ]`}&nbsp;&nbsp;
                  {childrenArray.length}
                  {childrenArray.length > 1 ? "keys" : "key"}
                </label>
              </>
            ),
            key: pre + key,
            children: childrenArray,
            selectable: false,
          })
        } else {
          dataList.push({
            title: (
              <div css={jsonItemStyle}>
                <label css={jsonNameStyle}>{key}&nbsp;</label>
                <label css={jsonValueStyle}>
                  {renderJsonValue(props[key])}
                </label>
              </div>
            ),
            selectable: false,
            key: pre + key,
          })
        }
      })
  return dataList
}

export const renderJsonValue = (value: any) => {
  const type = typeof value
  switch (type) {
    case "string":
      return <label css={applyJsonValueColorStyle(type)}>{`"${value}"`}</label>
    default:
      return <label css={applyJsonValueColorStyle(type)}>{`${value}`}</label>
  }
}
