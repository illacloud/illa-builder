import { FC, useRef, useState } from "react"
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
  applyLeftPanelStyle,
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
  const panelConfig = useRef({
    showLeftPanel: true,
    showRightPanel: true,
    showBottomPanel: true,
  })
  const [config, setConfig] = useState({
    showLeftPanel: true,
    showRightPanel: true,
    showBottomPanel: true,
  })

  const switchPanelState = (state: PanelState) => {
    console.log(state, "config")
    // const c = config
    panelConfig.current[state] = !panelConfig.current[state]
    config[state] = !config[state]
    // console.log(c, panelConfig, "config")
    setConfig({ ...config })
  }
  console.log(panelConfig.current, "app")

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={editorContainerStyle}>
        <PageNavBar css={navbarStyle} switchPanelState={switchPanelState} />
        <div css={contentStyle}>
          <DataWorkspace
            css={applyLeftPanelStyle(panelConfig.current.showLeftPanel)}
          />
          <div css={mainPanelStyle}>
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
