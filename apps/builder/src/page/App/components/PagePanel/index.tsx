import { FC } from "react"
import { PagePanelWrapperStyle, PageScrollContainerWrapperStyle } from "./style"
import { PageFrame } from "./Modules/Frame"
import { PageBasic } from "./Modules/Basic"

export const PagePanel: FC = () => {
  return (
    <div css={PagePanelWrapperStyle}>
      <div css={PageScrollContainerWrapperStyle}>
        <PageFrame />
        <PageBasic />
      </div>
    </div>
  )
}

PagePanel.displayName = "PagePanel"
