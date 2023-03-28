import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { BuilderApi } from "@/api/base"
import { initGuideApp } from "@/config/guide"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { updateCurrentAppInfo } from "@/hooks/useInitApp"
import { runAction } from "@/page/App/components/Actions/ActionPanel/utils/runAction"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { getIsOnline } from "@/redux/config/configSelector"
import { IllaMode } from "@/redux/config/configState"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { DashboardAppInitialState } from "@/redux/dashboard/apps/dashboardAppState"
import { guideActions } from "@/redux/guide/guideSlice"
import { GuideInitialState } from "@/redux/guide/guideState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, ResourceContent } from "@/redux/resource/resourceState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { canAutoRunActionWhenInit } from "@/utils/action/canAutoRunAction"

export const useInitGuideApp = (mode: IllaMode = "template-edit") => {
  const { appId = "" } = useParams()
  const dispatch = useDispatch()
  const isOnline = useSelector(getIsOnline)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { teamIdentifier } = useParams()

  const [loadingState, setLoadingState] = useState(true)
  const [errorState, setErrorState] = useState(false)

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
      new Promise<CurrentAppResp>(async (resolve, reject) => {
        setErrorState(false)
        setLoadingState(true)
        BuilderApi.teamRequest<Resource<ResourceContent>[]>(
          {
            url: "/resources",
            method: "GET",
            signal: controller.signal,
          },
          (response) => {
            dispatch(resourceActions.updateResourceListReducer(response.data))
            initGuideApp().then((data) => {
              handleCurrentApp(data)
              resolve(data)
            })
          },
        )
      })
        .then((value) => {
          const autoRunAction = value.actions.filter((action) => {
            return canAutoRunActionWhenInit(action)
          })
          autoRunAction.forEach((action) => {
            runAction(action)
          })
        })
        .finally(() => {
          dispatch(guideActions.updateGuideStatusReducer(true))
          setLoadingState(false)
        })
    }

    return () => {
      controller.abort()
      dispatch(guideActions.updateGuideInfoReducer(GuideInitialState))
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [appId, dispatch, isOnline, teamIdentifier, handleCurrentApp])

  return { loadingState, errorState }
}
