import { FC } from "react"
import { PanelBar } from "@/components/PanelBar"
import { applyTreeContainerStyle } from "@/page/App/components/DataWorkspace/components/WorkSpaceTree/style"
import { WorkSpaceTreeGroupProps } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeGroup/interface"

export const WorkSpaceTreeGroup: FC<WorkSpaceTreeGroupProps> = (props) => {
  const { title, children } = props
  return (
    <PanelBar title={title} size="small">
      <div css={applyTreeContainerStyle()}>{children}</div>
    </PanelBar>
  )
}
