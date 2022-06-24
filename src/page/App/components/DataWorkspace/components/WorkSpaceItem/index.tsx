import { FC } from "react"
import { Collapse, CollapseItem } from "@illa-design/collapse"
import { PreIcon as ExpandIcon } from "@illa-design/icon"
import { Tree } from "@illa-design/tree"
import { WorkSpaceItemProps } from "./interface"
import { itemTitleStyle } from "./style"

export const WorkSpaceItem: FC<WorkSpaceItemProps> = (props) => {
  const { title, dataList = [], handleSelect } = props
  return (
    <Collapse
      mode="builder-pro"
      expandIconPosition="right"
      destroyOnHide
      expandIcon={<ExpandIcon />}
    >
      <CollapseItem
        name="title"
        header={<span css={itemTitleStyle}>{title}</span>}
      >
        <Tree
          treeData={dataList}
          onSelect={handleSelect}
          autoExpandParent={false}
          multiple={false}
          blockNode
        />
      </CollapseItem>
    </Collapse>
  )
}

WorkSpaceItem.displayName = "WorkSpaceItem"
