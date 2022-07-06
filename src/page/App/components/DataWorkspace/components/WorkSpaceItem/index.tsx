import { FC } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Tree } from "@illa-design/tree"
import { getExpandedKeys } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { WorkSpaceItemProps } from "./interface"
import { applyTreeContainerStyle } from "./style"
import { PanelBar } from "@/page/App/components/InspectPanel/bar"

export const WorkSpaceItem: FC<WorkSpaceItemProps> = (props) => {
  const { title, dataList = [], selectedKeys, handleSelect } = props
  const expandedKeys = useSelector(getExpandedKeys)
  const dispatch = useDispatch()
  const handleExpand = (keys: string[]) => {
    dispatch(configActions.setExpandedKey(keys))
  }
  return (
    <PanelBar title={title} hasGhostEmpty={false}>
      <div css={applyTreeContainerStyle(dataList.length > 0)}>
        <Tree
          defaultExpandedKeys={expandedKeys}
          defaultSelectedKeys={selectedKeys}
          treeData={dataList}
          onExpand={handleExpand}
          onSelect={handleSelect}
          autoExpandParent={false}
          multiple={false}
          size="small"
          _mode="builder"
          blockNode
        />
      </div>
    </PanelBar>
  )
}

WorkSpaceItem.displayName = "WorkSpaceItem"
