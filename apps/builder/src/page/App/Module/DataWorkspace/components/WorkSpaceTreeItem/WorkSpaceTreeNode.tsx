import { toPath } from "lodash"
import { FC, memo } from "react"
import { CopyIcon, isArray, isObject } from "@illa-design/react"
import IconHotSpot from "@/components/IconHotSpot"
import { WorkSpaceTreeNodeProps } from "@/page/App/Module/DataWorkspace/components/WorkSpaceTreeItem/interface"
import {
  applyJsonValueColorStyle,
  applySimpleItemContainerStyle,
  jsonNameStyle,
  labelNameAndValueContainerStyle,
} from "@/page/App/Module/DataWorkspace/components/WorkSpaceTreeItem/style"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { convertPathToString } from "@/utils/executionTreeHelper/utils"
import { WorkSpaceTreeItem } from "."
import { renderJsonValue } from "./utils"

export const WorkSpaceTreeNode: FC<WorkSpaceTreeNodeProps> = memo(
  (props: WorkSpaceTreeNodeProps) => {
    const { name, value, level = 0, parentKey } = props

    const handleClickCopy = () => {
      copyToClipboard(
        `{{${convertPathToString(toPath(`${parentKey}.${name}`))}}}`,
      )
    }

    if (isObject(value) || isArray(value)) {
      return (
        <WorkSpaceTreeItem
          title={name}
          data={value}
          level={level}
          parentKey={parentKey}
          isChild={level + 1 > 0}
        />
      )
    } else {
      return (
        <div css={applySimpleItemContainerStyle(false, level + 1)}>
          <div css={labelNameAndValueContainerStyle}>
            <label css={jsonNameStyle}>
              {level < 1 ? `{{${parentKey}.${name}}}` : name}&nbsp;
            </label>
            <label css={applyJsonValueColorStyle(typeof value)}>
              {renderJsonValue(value)}
            </label>
          </div>
          <IconHotSpot onClick={handleClickCopy}>
            <CopyIcon />
          </IconHotSpot>
        </div>
      )
    }
  },
)

WorkSpaceTreeNode.displayName = "WorkSpaceTreeNode"
