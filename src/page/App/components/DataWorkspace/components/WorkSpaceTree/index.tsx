import { FC } from "react"
import { omit } from "@illa-design/system"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeProps } from "./interface"
import { applyTreeContainerStyle } from "./style"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"

const hiddenFields = ["displayName", "userId"]

export const WorkSpaceTree: FC<WorkSpaceTreeProps> = (props) => {
  const { title, dataList = [], selectedKeys, handleSelect } = props
  return (
    <PanelBar title={title}>
      <div css={applyTreeContainerStyle(dataList.length > 0)}>
        {dataList.map((data) => (
          <WorkSpaceTreeItem
            key={data.displayName}
            title={data.displayName}
            data={omit(data, hiddenFields)}
            handleSelect={handleSelect}
            isSelected={selectedKeys?.includes(data.displayName)}
          />
        ))}
      </div>
    </PanelBar>
  )
}

WorkSpaceTree.displayName = "WorkSpaceTree"
