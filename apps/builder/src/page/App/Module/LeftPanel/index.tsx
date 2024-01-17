import { FC, memo } from "react"
import { useSelector } from "react-redux"
import { isOpenLeftPanel } from "@/redux/config/configSelector"
import { DataWorkspace } from "../DataWorkspace"
import ToolBar from "./Components/ToolBar"
import { leftPanelContainerStyle } from "./style"

const LeftPanel: FC = () => {
  const showLeftPanel = useSelector(isOpenLeftPanel)

  return (
    <div css={leftPanelContainerStyle}>
      <ToolBar />
      {showLeftPanel && <DataWorkspace />}
    </div>
  )
}

export default memo(LeftPanel)
