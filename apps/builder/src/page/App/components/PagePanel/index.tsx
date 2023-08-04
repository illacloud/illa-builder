import { FC } from "react"
import { FocusManager } from "@/utils/focusManager"
import { PageBasic } from "./Modules/Basic"
import { PageFrame } from "./Modules/Frame"
import { PagePanelWrapperStyle, PageScrollContainerWrapperStyle } from "./style"

const PagePanel: FC = () => {
  return (
    <div
      css={PagePanelWrapperStyle}
      onClick={() => {
        FocusManager.switchFocus("page_config")
      }}
    >
      <div css={PageScrollContainerWrapperStyle}>
        <PageFrame />
        <PageBasic />
      </div>
    </div>
  )
}

PagePanel.displayName = "PagePanel"
export default PagePanel
