import { FC } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Collapse, CollapseItem } from "@illa-design/collapse"
import { PreIcon as ExpandIcon } from "@illa-design/icon"
import { Tree } from "@illa-design/tree"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { WorkSpaceItemProps } from "./interface"
import { itemTitleStyle } from "./style"

export const WorkSpaceItem: FC<WorkSpaceItemProps> = (props) => {
  const { title, dataList = [], selectedKeys, handleSelect } = props
  const expandedKeys = useSelector(getExpandedKeys)
  const dispatch = useDispatch()
  const handleExpand = (keys: string[]) => {
    dispatch(configActions.setExpandedKey(keys))
  }
  return (
    <Collapse
      mode="builder"
      expandIconPosition="right"
      expandIcon={<ExpandIcon />}
    >
      <CollapseItem
        name="title"
        header={<span css={itemTitleStyle}>{title}</span>}
      >
        <Tree
          defaultExpandedKeys={expandedKeys}
          defaultSelectedKeys={selectedKeys}
          treeData={dataList}
          onExpand={handleExpand}
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
