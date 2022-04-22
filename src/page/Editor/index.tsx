import { FC } from "react"
import { PageNavBar } from "./components/PageNavBar"
import { CanvasContainer } from "./components/CanvasContainer"
import { DataWorkspace } from "./components/DataWorkspace"
import { QueryEditor } from "./components/QueryEditor"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import {
  EditorBody,
  EditorCenterStyle,
  EditorContainer,
  EditorRightArea,
  LeftPanelStyle,
  RightPanelStyle,
} from "./style"

export const Editor: FC = () => {
  return (
    <div css={EditorContainer}>
      <DataWorkspace css={LeftPanelStyle} />
      <div css={EditorRightArea}>
        <PageNavBar css={{ height: "48px" }} />
        <div css={EditorBody}>
          <div css={EditorCenterStyle}>
            <CanvasContainer />
            <QueryEditor />
          </div>
          <WidgetPickerEditor css={RightPanelStyle} />
        </div>
      </div>
    </div>
  )
}

Editor.displayName = "Editor"
