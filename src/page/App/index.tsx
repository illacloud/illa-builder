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
import { Connection, Room } from "@/api/ws/ws"
import { useDispatch, useSelector } from "react-redux"
import {
  getIllaMode,
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import store, { startAppListening } from "@/store"
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
import hotkeys from "hotkeys-js"
import { Message } from "@illa-design/message"
import { useTranslation } from "react-i18next"
import { Modal } from "@illa-design/modal"

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

  const { t } = useTranslation()

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
    performance.setResourceTimingBufferSize(1000000)

    return () => {
      performance.clearResourceTimings()
    }

    hotkeys("command+s,ctrl+s,Backspace", function (event, handler) {
      switch (handler.key) {
        case "Backspace":
          event.preventDefault()
          const textList = store
            .getState()
            .config.selectedComponents.map((item) => {
              return item.displayName
            })
            .join(", ")
            .toString()
          Modal.confirm({
            title: t("editor.component.delete_title", {
              displayName: textList,
            }),
            content: t("editor.component.delete_content", {
              displayName: textList,
            }),
            cancelText: t("editor.component.cancel"),
            okText: t("editor.component.delete"),
            okButtonProps: {
              colorScheme: "techPurple",
            },
            closable: true,
            onOk: () => {
              dispatch(
                componentsActions.deleteComponentNodeReducer({
                  displayName: store
                    .getState()
                    .config.selectedComponents.map((item) => {
                      return item.displayName
                    }),
                }),
              )
            },
          })
          break
        case "command+s":
        case "ctrl+s":
          event.preventDefault()
          Message.success(t("dont_need_save"))
          break
      }
    })
    hotkeys(
      "*",
      {
        keydown: true,
        keyup: true,
      },
      function (keyboardEvent, hotkeysEvent) {
        if (hotkeys.ctrl || hotkeys.command) {
          keyboardEvent.preventDefault()
          if (keyboardEvent.type === "keydown") {
            dispatch(configActions.updateShowDot(true))
          } else if (keyboardEvent.type === "keyup") {
            dispatch(configActions.updateShowDot(false))
          }
        }
      },
    )
  }, [])

  return (
    <div css={editorContainerStyle}>
      {loadingState && (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      {!loadingState && (
        <>
          <PageNavBar css={navbarStyle} />
          <div css={contentStyle}>
            <DataWorkspace css={applyLeftPanelStyle(showLeftPanel)} />
            <div css={middlePanelStyle}>
              <CanvasPanel css={centerPanelStyle} />
              <ActionEditor css={applyBottomPanelStyle(showBottomPanel)} />
            </div>
            <WidgetPickerEditor css={applyRightPanelStyle(showRightPanel)} />
          </div>
        </>
      )}
    </div>
  )
}

Editor.displayName = "Editor"
