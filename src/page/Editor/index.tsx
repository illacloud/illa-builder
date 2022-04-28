import { FC } from "react"
import { PageNavBar } from "./components/PageNavBar"
import { DataWorkspace } from "./components/DataWorkspace"
import { QueryEditor } from "./components/QueryEditor"
import {
  editorContainerStyle,
  leftPanelStyle,
  rightPanelStyle,
  mainPanelStyle,
  navbarStyle,
  middlePanelStyle,
  centerPanelStyle,
  bottomPanelStyle,
} from "./style"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { CanvasContainer } from "./components/CanvasContainer"

export const Editor: FC = () => {
  return (
    <div css={editorContainerStyle}>
      <PageNavBar css={navbarStyle} />
      <div css={mainPanelStyle}>
        <DataWorkspace css={leftPanelStyle} />
        <div css={middlePanelStyle}>
          <CanvasContainer css={centerPanelStyle} />
          <QueryEditor css={bottomPanelStyle} />
        </div>
        <WidgetPickerEditor css={rightPanelStyle} />
      </div>
    </div>
  )
}

Editor.displayName = "Editor"
