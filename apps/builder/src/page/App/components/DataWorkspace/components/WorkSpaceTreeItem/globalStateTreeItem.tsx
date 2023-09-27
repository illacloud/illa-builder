import { FC, memo } from "react"
import { isArray, isObject } from "@illa-design/react"
import { MAX_LEN_WITH_SNIPPETS } from "@/components/CodeEditor"
import { WorkSpaceTreeNodeProps } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/interface"
import {
  applySimpleItemContainerStyle,
  jsonNameStyle,
  jsonValueStyle,
} from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/style"
import { applyJsonValueColorStyle } from "@/page/App/components/DataWorkspace/style"
import { GlobalStateTreeNode } from "./globalStateTreeNode"

export const renderJsonValue = (value: unknown, canEdit: boolean) => {
  const type = typeof value
  switch (type) {
    case "string":
      return (
        <label css={applyJsonValueColorStyle(type)}>{`"${
          (value as string).length > 1024
            ? (value as string).slice(0, MAX_LEN_WITH_SNIPPETS) + "..."
            : value
        }"`}</label>
      )
    default:
      return (
        <label
          css={applyJsonValueColorStyle(type, canEdit)}
        >{`${value}`}</label>
      )
  }
}

export const GlobalStateTreeItem: FC<WorkSpaceTreeNodeProps> = memo(
  (props: WorkSpaceTreeNodeProps) => {
    const { name, value, level = 0, parentKey } = props

    if (isObject(value) || isArray(value)) {
      return (
        <GlobalStateTreeNode
          title={name}
          data={value}
          level={level + 1}
          parentKey={parentKey}
          isChild
        />
      )
    } else {
      return (
        <div css={applySimpleItemContainerStyle(false, level + 1)}>
          <label css={jsonNameStyle}>{name}</label>
          <label css={jsonValueStyle}>
            {renderJsonValue(value, level === 0)}
          </label>
        </div>
      )
    }
  },
)

GlobalStateTreeItem.displayName = "GlobalStateTreeItem"
