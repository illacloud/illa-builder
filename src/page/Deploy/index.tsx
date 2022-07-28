import { FC, useEffect, useState } from "react"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { useParams } from "react-router-dom"
import { Api } from "@/api/base"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"
import { useDispatch } from "react-redux"
import { deployContainerStyle, deployLogoStyle } from "@/page/Deploy/style"
import { Loading } from "@illa-design/loading"
import { configActions } from "@/redux/config/configSlice"
import { ReactComponent as DeployLogo } from "@assets/deploy-powered-by.svg"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { Unsubscribe } from "@reduxjs/toolkit"
import { setupDependenciesListeners } from "@/redux/currentApp/executionTree/dependencies/dependenciesListener"
import { startAppListening } from "@/store"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/execution/executionListener"
import { setupComponentsListeners } from "@/redux/currentApp/editor/components/componentsListener"
import { setupConfigListener } from "@/redux/config/configListener"

export const Deploy: FC = () => {
  let { appId, versionId } = useParams()
  const dispatch = useDispatch()
  const [loadingState, setLoadingState] = useState(true)

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupDependenciesListeners(startAppListening),
      setupExecutionListeners(startAppListening),
      setupComponentsListeners(startAppListening),
      setupConfigListener(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    Api.request<CurrentAppResp>(
      {
        url: `/apps/${appId}/versions/${versionId}`,
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(configActions.updateIllaMode("production"))
        dispatch(appInfoActions.updateAppInfoReducer(response.data.appInfo))
        dispatch(
          componentsActions.updateComponentReducer(response.data.components),
        )
        dispatch(actionActions.updateActionListReducer(response.data.actions))
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
        dispatch(
          dependenciesActions.setDependenciesReducer(
            response.data.dependenciesState,
          ),
        )

        const autoRunAction = response.data.actions.filter((item) => {
          return item.triggerMode === "automate"
        })
        autoRunAction.forEach((item) => {
          runAction(item)
        })
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

  useEffect(() => {}, [])

  return (
    <div css={deployContainerStyle}>
      {loadingState && (
        <div>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      {!loadingState && <CanvasPanel />}
      <DeployLogo
        css={deployLogoStyle}
        onClick={() => {
          window.open("https://illacloud.com", "_blank")
        }}
      />
    </div>
  )
}

Deploy.displayName = "Deploy"
