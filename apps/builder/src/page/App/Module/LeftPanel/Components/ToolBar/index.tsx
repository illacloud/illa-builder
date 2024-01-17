import { FC, memo } from "react"
import { useSelector } from "react-redux"
import { getIsILLAGuideMode } from "@/redux/config/configSelector"
import DebugButton from "../DebugButton"
import HistoryButton from "../HistoryButton"
import MoreActionButton from "../MoreActionButton"
import { ToolBarContainerStyle } from "./style"

const ToolBar: FC = () => {
  const isGuideMode = useSelector(getIsILLAGuideMode)

  return (
    <div css={ToolBarContainerStyle}>
      <DebugButton />
      {!isGuideMode && <HistoryButton />}
      {!isGuideMode && <MoreActionButton />}
    </div>
  )
}

export default memo(ToolBar)
