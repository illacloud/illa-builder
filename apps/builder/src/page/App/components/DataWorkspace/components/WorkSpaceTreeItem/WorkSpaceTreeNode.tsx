import { FC, memo } from "react"
import { isArray, isObject } from "@illa-design/react"
import { WorkSpaceTreeNodeProps } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/interface"
import {
  applySimpleItemContainerStyle,
  jsonNameStyle,
  jsonValueStyle,
} from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/style"
import { applyJsonValueColorStyle } from "@/page/App/components/DataWorkspace/style"
import { WorkSpaceTreeItem } from "."

export const renderJsonValue = (value: any) => {
  const type = typeof value
  switch (type) {
    case "string":
      return <label css={applyJsonValueColorStyle(type)}>{`"${value}"`}</label>
    default:
      return <label css={applyJsonValueColorStyle(type)}>{`${value}`}</label>
  }
}

export const WorkSpaceTreeNode: FC<WorkSpaceTreeNodeProps> = memo(
  (props: WorkSpaceTreeNodeProps) => {
    const { name, value, level = 0, parentKey } = props
    if (isObject(value) || isArray(value)) {
      return (
        <WorkSpaceTreeItem
          title={name}
          data={value}
          level={level + 1}
          parentKey={parentKey}
        />
      )
    } else {
      return (
        <div css={applySimpleItemContainerStyle(false, level + 1)}>
          <label css={jsonNameStyle}>{name}&nbsp;</label>
          <label css={jsonValueStyle}>{renderJsonValue(value)}</label>
        </div>
      )
    }
  },
)

WorkSpaceTreeNode.displayName = "WorkSpaceTreeNode"
