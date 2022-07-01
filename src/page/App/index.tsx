import { FC, useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { PageNavBar } from "./components/PageNavBar"
import { DataWorkspace } from "./components/DataWorkspace"
import { ActionEditor } from "./components/ActionEditor"
import {
  applyBottomPanelStyle,
  applyLeftPanelStyle,
  applyRightPanelStyle,
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  middlePanelStyle,
  navbarStyle,
} from "./style"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { Connection, Room } from "@/api/ws/ws"
import { useSelector } from "react-redux"
import {
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { GlobalDataProvider } from "@/page/App/context/globalDataProvider"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { startAppListening } from "@/store"
import { Unsubscribe } from "@reduxjs/toolkit"
import { setupDependenciesListeners } from "@/redux/currentApp/executionTree/dependencies/dependenciesListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/execution/executionListener"

interface PanelConfigProps {
  showLeftPanel: boolean
  showRightPanel: boolean
  showBottomPanel: boolean
}

export type PanelState = keyof PanelConfigProps

export const Editor: FC = () => {
  const [room, setRoom] = useState<Room>()
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

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupDependenciesListeners(startAppListening),
      setupExecutionListeners(startAppListening),
      setupComponentsListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  const showLeftPanel = useSelector(isOpenLeftPanel)
  const showRightPanel = useSelector(isOpenRightPanel)
  const showBottomPanel = useSelector(isOpenBottomPanel)

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalDataProvider>
        <div css={editorContainerStyle}>
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            <DataWorkspace css={applyLeftPanelStyle(showLeftPanel)} />
            <div css={middlePanelStyle}>
              <CanvasPanel css={centerPanelStyle} />
              <ActionEditor css={applyBottomPanelStyle(showBottomPanel)} />
            </div>
            <WidgetPickerEditor css={applyRightPanelStyle(showRightPanel)} />
          </div>
        </div>
      </GlobalDataProvider>
    </DndProvider>
  )
}

Editor.displayName = "Editor"
