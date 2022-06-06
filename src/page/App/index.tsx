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
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { useSelector } from "react-redux"
import {
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/currentApp/config/configSelector"

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

  const showLeftPanel = useSelector(isOpenLeftPanel)
  const showRightPanel = useSelector(isOpenRightPanel)
  const showBottomPanel = useSelector(isOpenBottomPanel)

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  )
}

Editor.displayName = "Editor"
