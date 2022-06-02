import { FC, useEffect, useRef, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { PageNavBar } from "./components/PageNavBar"
import { DataWorkspace } from "./components/DataWorkspace"
import { ActionEditor } from "./components/ActionEditor"
import {
  editorContainerStyle,
  navbarStyle,
  middlePanelStyle,
  centerPanelStyle,
  contentStyle,
  applyLeftPanelStyle,
  applyBottomPanelStyle,
  applyRightPanelStyle,
} from "./style"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { Connection, Room } from "@/api/ws/ws"

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
  const [room, setRoom] = useState<Room>()
  const { showLeftPanel, showBottomPanel, showRightPanel } = config

  const switchPanelState = (state: PanelState) => {
    const newConfig = config
    newConfig[state] = !newConfig[state]
    setConfig({ ...newConfig })
  }

  useEffect(() => {
    Connection.enterRoom(
      "app",
      (loading) => {},
      (errorState) => {},
      (room) => {
        setRoom(room)
      },
    )
    return () => {
      if (room !== undefined) {
        Connection.leaveRoom(room.roomId)
      }
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={editorContainerStyle}>
        <PageNavBar css={navbarStyle} switchPanelState={switchPanelState} />
        <div css={contentStyle}>
          <DataWorkspace css={applyLeftPanelStyle(showLeftPanel)} />
          <div css={middlePanelStyle}>
            <div css={centerPanelStyle} />
            <ActionEditor css={applyBottomPanelStyle(showBottomPanel)} />
          </div>
          <WidgetPickerEditor css={applyRightPanelStyle(showRightPanel)} />
        </div>
      </div>
    </DndProvider>
  )
}

Editor.displayName = "Editor"
