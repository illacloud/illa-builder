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
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { DashboardAppInitialState } from "@/redux/dashboard/apps/dashboardAppState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchPrivateAppInitData } from "@/services/apps"
import { fetchResources } from "@/services/resource"
import store from "@/store"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
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
  store.dispatch(componentsActions.updateComponentReducer(fixedComponents))
  const fixedActions = fixedActionToNewAction(data.actions)
  store.dispatch(actionActions.updateActionListReducer(fixedActions))

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

  // versionId = -1 represents the latest edited version of the app.
  // versionId = -2 represents the latest released version of the user.
  const versionId = mode === "production" ? "-2" : "0"

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

  const initApp = useCallback(
    async (
      controller: AbortController,
      resolve: (value: CurrentAppResp) => void,
      reject: (reason?: any) => void,
    ) => {
      try {
        const response = await fetchPrivateAppInitData(
          appId,
          versionId,
          controller.signal,
        )
        const resourceResponse = await fetchResources(controller.signal)
        dispatch(
          resourceActions.updateResourceListReducer(resourceResponse.data),
        )
        handleCurrentApp(response.data)
        resolve(response.data)
      } catch (e) {
        reject(e)
      }
    },
    [appId, dispatch, handleCurrentApp, versionId],
  )

  useEffect(() => {
    const controller = new AbortController()
    if (isOnline) {
      new Promise<CurrentAppResp>(async (resolve, reject) => {
        setErrorState(false)
        setLoadingState(true)
        await initApp(controller, resolve, reject)
        setLoadingState(false)
      })
    }

    return () => {
      controller.abort()
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [dispatch, initApp, isOnline])

  return { loadingState, errorState }
}
