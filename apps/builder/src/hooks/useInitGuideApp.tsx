import { getCurrentTeamInfo } from "@illa-public/user-data"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { initGuideApp } from "@/config/guide"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { updateCurrentAppInfo } from "@/hooks/useInitApp"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { getIsOnline } from "@/redux/config/configSelector"
import { IllaMode } from "@/redux/config/configState"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { DashboardAppInitialState } from "@/redux/currentApp/appInfo/appInfoState"
import { guideActions } from "@/redux/guide/guideSlice"
import { GuideInitialState } from "@/redux/guide/guideState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchResources } from "@/services/resource"

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
      new Promise<CurrentAppResp>(async (resolve) => {
        setErrorState(false)
        setLoadingState(true)
        fetchResources(controller.signal).then((response) => {
          dispatch(resourceActions.updateResourceListReducer(response.data))
          initGuideApp()
            .then((data) => {
              handleCurrentApp(data)
              resolve(data)
            })
            .finally(() => {
              dispatch(guideActions.updateGuideStatusReducer(true))
              setLoadingState(false)
            })
        })
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
