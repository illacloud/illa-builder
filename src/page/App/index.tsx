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
  loadingStyle,
  middlePanelStyle,
  navbarStyle,
} from "./style"
import { WidgetPickerEditor } from "./components/WidgetPickerEditor"
import { Connection, Room } from "@/api/ws/ws"
import { useDispatch, useSelector } from "react-redux"
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
import { Api } from "@/api/base"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"
import { useParams } from "react-router-dom"
import { updateComponentReducer } from "@/redux/currentApp/editor/components/componentsReducer"

interface PanelConfigProps {
  showLeftPanel: boolean
  showRightPanel: boolean
  showBottomPanel: boolean
}

export type PanelState = keyof PanelConfigProps

export const Editor: FC = () => {
  const [room, setRoom] = useState<Room>()

  const dispatch = useDispatch()

  let { appId, versionId } = useParams()

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

  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    Api.request<CurrentAppResp>(
      {
        url: `/apps/${appId}/versions/${versionId}`,
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(
          componentsActions.updateComponentReducer(response.data.components),
        )
        dispatch(actionActions.updateActionListReducer(response.data.actions))
        dispatch(
          dependenciesActions.setDependenciesReducer(
            response.data.dependenciesState,
          ),
        )
        dispatch(
          executionActions.setExecutionReducer(response.data.executionState),
        )
        dispatch(
          dragShadowActions.updateDragShadowReducer(
            response.data.dragShadowState,
          ),
        )
        dispatch(
          dottedLineSquareActions.updateDottedLineSquareReducer(
            response.data.dottedLineSquareState,
          ),
        )
        dispatch(
          displayNameActions.updateDisplayNameReducer(
            response.data.displayNameState,
          ),
        )
      },
      (e) => {},
      (e) => {},
      (loading) => {
        setLoadingState(loading)
      },
    )
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalDataProvider>
        <div css={editorContainerStyle}>
          {loadingState && <div css={loadingStyle} />}
          {!loadingState && (
            <>
              <PageNavBar css={navbarStyle} />
              <div css={contentStyle}>
                <DataWorkspace css={applyLeftPanelStyle(showLeftPanel)} />
                <div css={middlePanelStyle}>
                  <CanvasPanel css={centerPanelStyle} />
                  <ActionEditor css={applyBottomPanelStyle(showBottomPanel)} />
                </div>
                <WidgetPickerEditor
                  css={applyRightPanelStyle(showRightPanel)}
                />
              </div>
            </>
          )}
        </div>
      </GlobalDataProvider>
    </DndProvider>
  )
}

Editor.displayName = "Editor"
