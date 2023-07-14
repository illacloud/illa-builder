import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useDestroyApp } from "@/hooks/useDestoryExecutionTree"
import { updateCurrentAppInfo } from "@/hooks/useInitApp"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { IllaMode } from "@/redux/config/configState"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { DashboardAppInitialState } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { getSnapShot, getSnapShotList } from "@/services/history"

export const useInitHistoryApp = (mode: IllaMode = "history") => {
  const { appId, snapshotID } = useParams()
  const dispatch = useDispatch()
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
      appId && updateCurrentAppInfo(data, mode, appId, teamID, uid)
    },
    [mode, appId, teamID, uid],
  )

  useEffect(() => {
    const controller = new AbortController()
    if (appId) {
      new Promise<CurrentAppResp>(async (resolve) => {
        setErrorState(false)
        setLoadingState(true)
        getSnapShotList({
          page: 0,
          appID: appId,
          signal: controller.signal,
        }).then((response) => {
          const { data } = response
          const currentSnapshotID =
            snapshotID || data.snapshotList[0].snapshotID
          getSnapShot(appId, currentSnapshotID)
            .then((res) => {
              handleCurrentApp(res.data)
              resolve(res.data)
            })
            .finally(() => {
              setLoadingState(false)
            })
        })
      })
    }

    return () => {
      controller.abort()
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [appId, dispatch, teamIdentifier, handleCurrentApp])

  return { loadingState, errorState }
}
