import { FC } from "react"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeGroupProps } from "./interface"
import { treeContainerStyle } from "./style"

export const WorkSpaceTreeGroup: FC<WorkSpaceTreeGroupProps> = (props) => {
  const { title, children } = props
  return (
    <PanelBar title={title} size="small" destroyChildrenWhenClose>
      <div css={treeContainerStyle}>{children}</div>
    </PanelBar>
  )
}
