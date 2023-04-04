import { FC, memo } from "react"
import { isArray, isObject } from "@illa-design/react"
import { WorkSpaceTreeNodeProps } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/interface"
import {
  applySimpleItemContainerStyle,
  jsonNameStyle,
  jsonValueStyle,
} from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/style"
import { WorkSpaceTreeItem } from "."
import { renderJsonValue } from "./globalStateTreeItem"

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
          isChild
        />
      )
    } else {
      return (
        <div css={applySimpleItemContainerStyle(false, level + 1)}>
          <label css={jsonNameStyle}>{name}&nbsp;</label>
          <label css={jsonValueStyle}>{renderJsonValue(value, false)}</label>
        </div>
      )
    }
  },
)

WorkSpaceTreeNode.displayName = "WorkSpaceTreeNode"
