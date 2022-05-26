import { FC, useRef, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { PageNavBar } from "./components/PageNavBar"
import { DataWorkspace } from "./components/DataWorkspace"
import { ActionEditor } from "./components/ActionEditor"
import {
  editorContainerStyle,
  mainPanelStyle,
  navbarStyle,
  middlePanelStyle,
  centerPanelStyle,
  contentStyle,
  applyLeftPanelStyle,
  applyBottomPanelStyle, applyRightPanelStyle,
} from "./style"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { CanvasContainer } from "./components/CanvasContainer"

interface PanelConfigProps {
  showLeftPanel: boolean
  showRightPanel: boolean
  showBottomPanel: boolean
}

export type PanelState = keyof PanelConfigProps

export const Editor: FC = () => {
  const [config, setConfig] = useState({
    showLeftPanel: true,
    showRightPanel: true,
    showBottomPanel: true,
  })
  const {showLeftPanel, showBottomPanel, showRightPanel} = config

  const switchPanelState = (state: PanelState) => {
    config[state] = !config[state]
    setConfig({ ...config })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={editorContainerStyle}>
        <PageNavBar css={navbarStyle} switchPanelState={switchPanelState} />
        <div css={contentStyle}>
          <DataWorkspace css={applyLeftPanelStyle(showLeftPanel)} />
          <div css={mainPanelStyle}>
            <div css={middlePanelStyle}>
              <CanvasContainer css={centerPanelStyle} />
              <ActionEditor
                css={applyBottomPanelStyle(showBottomPanel)}
              />
            </div>
            <WidgetPickerEditor css={applyRightPanelStyle(showRightPanel)} />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

Editor.displayName = "Editor"
