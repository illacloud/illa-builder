import { FC } from "react"
import { PageNavBar } from "./components/PageNavBar"
import { CanvasContainer } from "./components/CanvasContainer"
import { DataWorkspace } from "./components/DataWorkspace"
import { QueryEditor } from "./components/QueryEditor"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import {
  applyEditorBody,
  applyEditorCenterStyle,
  applyEditorContainer,
  applyEditorRightArea,
  applyLeftPanelStyle,
  applyRightPanelStyle,
} from "./style"

export const Editor: FC = () => {
  return (
    <div css={applyEditorContainer}>
      <PageNavBar />
      <div css={applyEditorRightArea}>
        <DataWorkspace css={applyLeftPanelStyle} />
        <div css={applyEditorBody}>
          <div css={applyEditorCenterStyle}>
            <CanvasContainer />
            <QueryEditor />
          </div>
          <WidgetPickerEditor css={applyRightPanelStyle} />
        </div>
      </div>
    </div>
  )
}

Editor.displayName = "Editor"
