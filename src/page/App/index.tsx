import { FC, useEffect, useState } from "react"
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
import { Connection } from "@/api/ws"
import { useDispatch, useSelector } from "react-redux"
import {
  getIllaMode,
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
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
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { Loading } from "@illa-design/loading"
import { configActions } from "@/redux/config/configSlice"
import { Shortcut } from "@/utils/shortcut"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"

interface PanelConfigProps {
  showLeftPanel: boolean
  showRightPanel: boolean
  showBottomPanel: boolean
}

export type PanelState = keyof PanelConfigProps

const INIT_PERFORMANCE_RESOURCE_TIMING_BUFFER_SIZE = 1000000

export const Editor: FC = () => {
  const dispatch = useDispatch()

  let { appId, versionId } = useParams()

  const currentUser = useSelector(getCurrentUser)

  useEffect(() => {
    Connection.enterRoom(
      "app",
      appId ?? "",
      (loading) => {},
      (errorState) => {},
      (room) => {},
    )
    return () => {
      Connection.leaveRoom("app", appId ?? "")
    }
  }, [currentUser])

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupDependenciesListeners(startAppListening),
      setupExecutionListeners(startAppListening),
      setupComponentsListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  const illaMode = useSelector(getIllaMode)
  const showLeftPanel = useSelector(isOpenLeftPanel) && illaMode == "edit"
  const showRightPanel = useSelector(isOpenRightPanel) && illaMode == "edit"
  const showBottomPanel = useSelector(isOpenBottomPanel) && illaMode == "edit"

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
        dispatch(configActions.updateIllaMode("edit"))
        dispatch(appInfoActions.updateAppInfoReducer(response.data.appInfo))
        dispatch(
          componentsActions.updateComponentReducer(response.data.components),
        )
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

  useEffect(() => {
    performance.setResourceTimingBufferSize(
      INIT_PERFORMANCE_RESOURCE_TIMING_BUFFER_SIZE,
    )

    return () => {
      performance.clearResourceTimings()
    }
  }, [])

  return (
    <div css={editorContainerStyle}>
      {loadingState && (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      {!loadingState && (
        <Shortcut>
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            <DataWorkspace css={applyLeftPanelStyle(showLeftPanel)} />
            <div css={middlePanelStyle}>
              <CanvasPanel css={centerPanelStyle} />
              <ActionEditor css={applyBottomPanelStyle(showBottomPanel)} />
            </div>
            <WidgetPickerEditor css={applyRightPanelStyle(showRightPanel)} />
          </div>
        </Shortcut>
      )}
    </div>
  )
}

Editor.displayName = "Editor"
