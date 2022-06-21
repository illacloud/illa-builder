import { FC } from "react"
import { Collapse, CollapseItem } from "@illa-design/collapse"
import { PreIcon as ExpandIcon } from "@illa-design/icon"

import { WorkSpaceItemProps } from "./interface"
import { applyWSItemTitleStyle } from "./style"

export const WorkSpaceItem: FC<WorkSpaceItemProps> = (props) => {
  return (
    <Collapse
      mode="builder-pro"
      expandIconPosition="right"
      expandIcon={<ExpandIcon />}
    >
      <CollapseItem
        name="title"
        header={<span css={applyWSItemTitleStyle}>TEMPORARY STATE (1)</span>}
      >
        <Collapse mode="builder">
          <CollapseItem name="1-1" header="current_user">
            <div>email "wuxiaosong@illasoft.com"</div>
            <div>email "wuxiaosong@illasoft.com"</div>
            <div>email "wuxiaosong@illasoft.com"</div>
          </CollapseItem>
        </Collapse>
      </CollapseItem>
    </Collapse>
  )
}

WorkSpaceItem.displayName = "WorkSpaceItem"
