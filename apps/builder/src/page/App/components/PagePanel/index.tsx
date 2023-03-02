import { FC } from "react"
import { Divider } from "@illa-design/react"
import { PanelHeader } from "./Components/PanelHeader/header"
import { PageBasic } from "./Modules/Basic"
import { PageFrame } from "./Modules/Frame"
import { PagePanelWrapperStyle, PageScrollContainerWrapperStyle } from "./style"

export const PagePanel: FC = () => {
  return (
    <div css={PagePanelWrapperStyle}>
      <PanelHeader />
      <Divider />
      <div css={PageScrollContainerWrapperStyle}>
        <PageFrame />
        <PageBasic />
      </div>
    </div>
  )
}

PagePanel.displayName = "PagePanel"
