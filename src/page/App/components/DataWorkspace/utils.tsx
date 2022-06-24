import { isArray, omit, isObject } from "@illa-design/system"
import { TreeDataType } from "@illa-design/tree-common"
import { ActionListState } from "@/redux/currentApp/action/actionState"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { BuilderInfo } from "@/redux/builderInfo/builderInfoState"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import {
  itemNameDescStyle,
  itemNameStyle,
  jsonItemStyle,
  jsonNameStyle,
  jsonValueStyle,
} from "./style"

export const actionListTransformer = (list: ActionListState) =>
  list.map((item) => {
    const childrenArray = dfsTransformer(
      omit(item, ["displayName"]),
      item.actionId,
    )
    return {
      title: (
        <>
          <span css={itemNameStyle}>{item.displayName}&nbsp;</span>
          <span css={itemNameDescStyle}>
            {`{}`}&nbsp;&nbsp;{childrenArray.length}key
          </span>
        </>
      ),
      children: childrenArray,
      key: item.actionId,
    }
  })

export const componentListTransformer = (root: ComponentNode) => {
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
          <span css={itemNameStyle}>{item.displayName}&nbsp;</span>
          <span css={itemNameDescStyle}>
            {`{}`}&nbsp;&nbsp;{childrenArray.length}key
          </span>
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
    Object.keys(props).forEach((key) => {
      if (isObject(props[key]) || isArray(props[key])) {
        const childrenArray = dfsTransformer(props[key], pre + key)
        dataList.push({
          title: (
            <>
              <span css={itemNameStyle}>{key}&nbsp;</span>
              <span css={itemNameDescStyle}>
                {isObject(props[key]) ? `{}` : `[]`}&nbsp;&nbsp;
                {childrenArray.length}key
              </span>
            </>
          ),
          key: pre + key,
          children: childrenArray,
        })
      } else {
        dataList.push({
          title: (
            <div css={jsonItemStyle}>
              <label css={jsonNameStyle}>
                <div>{key}&nbsp;</div>
              </label>
              <span css={jsonValueStyle}>
                {typeof props[key] === "string"
                  ? `"${props[key]}"`
                  : `${props[key]}`}
              </span>
            </div>
          ),
          key: pre + key,
        })
      }
      console.log("key?", pre + key)
    })
  return dataList
}
