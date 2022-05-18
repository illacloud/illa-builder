import { FC } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { PageNavBar } from "./components/PageNavBar"
import { DataWorkspace } from "./components/DataWorkspace"
import { ActionEditor } from "./components/ActionEditor"
import {
  editorContainerStyle,
  leftPanelStyle,
  rightPanelStyle,
  mainPanelStyle,
  navbarStyle,
  middlePanelStyle,
  centerPanelStyle,
  bottomPanelStyle,
  contentStyle,
} from "./style"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { CanvasContainer } from "./components/CanvasContainer"

export const Editor: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div css={editorContainerStyle}>
        <DataWorkspace css={leftPanelStyle} />
        <div css={mainPanelStyle}>
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            <div css={middlePanelStyle}>
              <CanvasContainer css={centerPanelStyle} />
              <ActionEditor css={bottomPanelStyle} />
            </div>
            <WidgetPickerEditor css={rightPanelStyle} />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

Editor.displayName = "Editor"
