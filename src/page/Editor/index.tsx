import { FC } from "react"
import { PageNavBar } from "./components/PageNavBar"
import { CanvasContainer } from "./components/CanvasContainer"
import { DataWorkspace } from "./components/DataWorkspace"
import { QueryEditor } from "./components/QueryEditor"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { EditorBody, EditorContainer, LeftPanelStyle } from "./styles/style"

export const Editor: FC = () => {
  return (
    <div css={EditorContainer}>
      <DataWorkspace css={LeftPanelStyle} />
      <div>
        <PageNavBar />
        <div css={EditorBody}>
          <div>
            <CanvasContainer />
            <QueryEditor />
          </div>
          <WidgetPickerEditor />
        </div>
      </div>
    </div>
  )
}

Editor.displayName = "Editor"
