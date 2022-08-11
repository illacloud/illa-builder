import { useEffect, useState } from "react"
import { Api } from "@/api/base"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { configActions } from "@/redux/config/configSlice"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { dragShadowActions } from "@/redux/currentApp/editor/dragShadow/dragShadowSlice"
import { dottedLineSquareActions } from "@/redux/currentApp/editor/dottedLineSquare/dottedLineSquareSlice"
import { displayNameActions } from "@/redux/currentApp/displayName/displayNameSlice"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { IllaMode } from "@/redux/config/configState"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"

export const useInitBuilderApp = (model: IllaMode) => {
  // editor default version id == 0
  let { appId, versionId = 0 } = useParams()
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
      response => {
        dispatch(configActions.updateIllaMode(model))
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
        dispatch(executionActions.startExecutionReducer())
        const autoRunAction = response.data.actions.filter(item => {
          return item.triggerMode === "automate"
        })
        autoRunAction.forEach(item => {
          runAction(item)
        })

        if (model === "edit" && response.data.actions.length > 0) {
          dispatch(configActions.changeSelectedAction(response.data.actions[0]))
        }
      },
      e => {},
      e => {},
      loading => {
        setLoadingState(loading)
      },
    )
    return () => {
      controller.abort()
    }
  }, [])

  return loadingState
}
