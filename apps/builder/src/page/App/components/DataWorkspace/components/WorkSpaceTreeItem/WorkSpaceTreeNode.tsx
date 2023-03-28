import { css } from "@emotion/react"
import { FC, memo } from "react"
import { isArray, isObject } from "@illa-design/react"
import { ReactComponent as OpenWindowIcon } from "@/assets/public/openWindow.svg"
import { WorkSpaceTreeNodeProps } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem/interface"
import {
  applyItemContainerStyle,
  editIconHotSpotStyle,
  jsonItemStyle,
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
    const { name, value, level = 0, canEdit = false } = props
    if (isObject(value) || isArray(value)) {
      return (
        <WorkSpaceTreeItem
          title={name}
          data={value}
          level={level + 1}
          canEdit={canEdit}
        />
      )
    } else {
      return (
        <div css={css(applyItemContainerStyle(false, level), jsonItemStyle)}>
          <label css={jsonNameStyle}>{name}&nbsp;</label>
          <label css={jsonValueStyle}>
            {renderJsonValue(value)}
            {canEdit && level === 0 && (
              <span css={editIconHotSpotStyle}>
                <OpenWindowIcon />
              </span>
            )}
          </label>
        </div>
      )
    }
  },
)

WorkSpaceTreeNode.displayName = "WorkSpaceTreeNode"
