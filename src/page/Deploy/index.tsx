import { FC, useEffect, useState } from "react"
import { CanvasPanel } from "@/page/App/components/CanvasPanel"
import { useParams } from "react-router-dom"
import { Api } from "@/api/base"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { dependenciesActions } from "@/redux/currentApp/executionTree/dependencies/dependenciesSlice"
import { executionActions } from "@/redux/currentApp/executionTree/execution/executionSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"
import { useDispatch } from "react-redux"
import { deployContainerStyle, deployLogoStyle } from "@/page/Deploy/style"
import { Loading } from "@illa-design/loading"
import { configActions } from "@/redux/config/configSlice"
import { ReactComponent as DeployLogo } from "@assets/deploy-powered-by.svg"

export const Deploy: FC = () => {
  let { appId, versionId } = useParams()
  const dispatch = useDispatch()
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
        dispatch(configActions.updateIllaMode("production"))
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

  useEffect(() => {}, [])

  return (
    <div css={deployContainerStyle}>
      {loadingState && (
        <div>
          <Loading colorScheme="techPurple" />
        </div>
      )}
      {!loadingState && <CanvasPanel />}
      <DeployLogo css={deployLogoStyle} />
    </div>
  )
}

Deploy.displayName = "Deploy"
