import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { getIsOnline } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { IllaMode } from "@/redux/config/configState"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { DashboardAppInitialState } from "@/redux/currentApp/appInfo/appInfoState"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
// import { dashboardTeamAIAgentActions } from "@/redux/dashboard/teamAIAgents/dashboardTeamAIAgentSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchTeamAgent } from "@/services/agent"
import { fetchPrivateAppInitData } from "@/services/apps"
import { fetchResources } from "@/services/resource"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { aiAgentActions } from "../redux/aiAgent/dashboardTeamAIAgentSlice"
import { flatTreeToMap } from "../utils/componentNode/flatTree"
import { fixedActionToNewAction } from "./utils/fixedAction"
import { fixedComponentsToNewComponents } from "./utils/fixedComponents"

export const updateCurrentAppInfo = (
  data: CurrentAppResp,
  mode: IllaMode,
  appId: string,
  teamID: string,
  uid: string,
) => {
  store.dispatch(configActions.updateIllaMode(mode))
  store.dispatch(appInfoActions.updateAppInfoReducer(data.appInfo))
  const fixedComponents = fixedComponentsToNewComponents(data.components)
  store.dispatch(
    componentsActions.initComponentReducer(flatTreeToMap(fixedComponents)),
  )
  const fixedActions = fixedActionToNewAction(data.actions)
  store.dispatch(actionActions.initActionListReducer(fixedActions))

  DisplayNameGenerator.initApp(appId, teamID, uid)
  DisplayNameGenerator.updateDisplayNameList(data.components, fixedActions)
  store.dispatch(executionActions.startExecutionReducer())
  if (mode === "edit" && fixedActions.length > 0) {
    store.dispatch(configActions.changeSelectedAction(fixedActions[0]))
  }
}

export const useInitBuilderApp = (mode: IllaMode) => {
  const { appId = "" } = useParams()
  const dispatch = useDispatch()
  const isOnline = useSelector(getIsOnline)
  const teamInfo = useSelector(getCurrentTeamInfo)

  const [loadingState, setLoadingState] = useState(true)
  const [errorState, setErrorState] = useState(false)

  // version = -1 represents the latest edited version of the app.
  // version = -2 represents the latest released version of the user.
  const version = mode === "production" ? "-2" : "0"

  const { uid, teamID } = {
    uid: teamInfo?.uid ?? "",
    teamID: teamInfo?.id ?? "",
  }

  useDestroyApp()

  const handleCurrentApp = useCallback(
    (data: CurrentAppResp) => {
      updateCurrentAppInfo(data, mode, appId, teamID, uid)
    },
    [mode, appId, teamID, uid],
  )

  useEffect(() => {
    const controller = new AbortController()
    if (isOnline) {
      setErrorState(false)
      setLoadingState(true)
      if (isCloudVersion) {
        Promise.all([
          fetchPrivateAppInitData(appId, version, controller.signal),
          fetchResources(controller.signal),
          fetchTeamAgent(controller.signal),
        ])
          .then((res) => {
            dispatch(resourceActions.updateResourceListReducer(res[1].data))
            handleCurrentApp(res[0].data)
            dispatch(
              aiAgentActions.updateTeamAIAgentListReducer(
                res[2].data.aiAgentList,
              ),
            )
          })
          .catch(() => {
            setErrorState(true)
          })
          .finally(() => {
            setLoadingState(false)
          })
      } else {
        Promise.all([
          fetchPrivateAppInitData(appId, version, controller.signal),
          fetchResources(controller.signal),
        ])
          .then((res) => {
            dispatch(resourceActions.updateResourceListReducer(res[1].data))
            handleCurrentApp(res[0].data)
          })
          .catch(() => {
            setErrorState(true)
          })
          .finally(() => {
            setLoadingState(false)
          })
      }
    }

    return () => {
      controller.abort()
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [appId, dispatch, handleCurrentApp, isOnline, teamID, version])

  return { loadingState, errorState }
}
