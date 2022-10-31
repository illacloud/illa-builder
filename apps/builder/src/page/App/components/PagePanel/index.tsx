import { FC } from "react"
import { PagePanelWrapperStyle, PageScrollContainerWrapperStyle } from "./style"
import { PageFrame } from "./Modules/Frame"

export const PagePanel: FC = () => {
  return (
    <div css={PagePanelWrapperStyle}>
      <div css={PageScrollContainerWrapperStyle}>
        <PageFrame />
      </div>
    </div>
  )
}

PagePanel.displayName = "PagePanel"
