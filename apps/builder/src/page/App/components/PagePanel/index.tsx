import { FC } from "react"
import { PagePanelWrapperStyle, PageScrollContainerWrapperStyle } from "./style"
import { PageFrame } from "./Modules/Frame"
import { PageBasic } from "./Modules/Basic"
import { PanelHeader } from "./Components/PanelHeader/header"

export const PagePanel: FC = () => {
  return (
    <div css={PagePanelWrapperStyle}>
      <div css={PageScrollContainerWrapperStyle}>
        <PanelHeader />
        <PageFrame />
        <PageBasic />
      </div>
    </div>
  )
}

PagePanel.displayName = "PagePanel"
