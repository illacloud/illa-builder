import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateCurrentAppInfo } from "@/hooks/useInitApp"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { IllaMode } from "@/redux/config/configState"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { getCurrentAppSnapshotID } from "@/redux/currentAppHistory/currentAppHistorySelector"
import { currentAppHistoryActions } from "@/redux/currentAppHistory/currentAppHistorySlice"
import { DashboardAppInitialState } from "@/redux/dashboard/apps/dashboardAppState"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchSnapShot, fetchSnapShotList } from "@/services/history"

const INITIAL_PAGE = 1

export const useInitHistoryApp = (mode: IllaMode = "preview") => {
  const { appId } = useParams()
  const dispatch = useDispatch()
  const currentSnapshotID = useSelector(getCurrentAppSnapshotID)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { teamIdentifier } = useParams()

  const currentApp = useRef<CurrentAppResp>()

  const [loadingState, setLoadingState] = useState(true)
  const [errorState, setErrorState] = useState(false)

  const [contentLoading, setContentLoading] = useState(false)

  const { uid, teamID } = {
    uid: teamInfo?.uid ?? "",
    teamID: teamInfo?.id ?? "",
  }

  const handleCurrentApp = useCallback(
    (data: CurrentAppResp) => {
      appId && updateCurrentAppInfo(data, mode, appId, teamID, uid)
    },
    [mode, appId, teamID, uid],
  )

  useEffect(() => {
    const controller = new AbortController()
    if (currentSnapshotID && appId) {
      setContentLoading(true)
      fetchSnapShot(appId, currentSnapshotID, controller.signal)
        .then((res) => {
          handleCurrentApp(res.data)
          if (!currentApp.current) {
            currentApp.current = res.data
          }
        })
        .finally(() => {
          setContentLoading(false)
        })
    }
    return () => {
      controller.abort()
      currentApp.current && handleCurrentApp(currentApp.current)
    }
  }, [appId, currentSnapshotID, handleCurrentApp])

  useEffect(() => {
    const controller = new AbortController()
    if (appId) {
      new Promise(async (resolve, reject) => {
        setErrorState(false)
        setLoadingState(true)
        fetchSnapShotList({
          page: INITIAL_PAGE,
          appID: appId,
          signal: controller.signal,
        })
          .then((response) => {
            const { data } = response
            const currentSnapshotID = data.snapshotList[0].snapshotID
            dispatch(
              currentAppHistoryActions.initCurrentAppHistoryReducer({
                ...data,
                hasMore: data.totalPages !== INITIAL_PAGE,
                currentPage: INITIAL_PAGE,
                currentSnapshotID,
              }),
            )
            resolve(data)
          })
          .catch(() => {
            reject()
          })
      })
        .catch(() => {
          setErrorState(true)
        })
        .finally(() => {
          setLoadingState(false)
        })
    }

    return () => {
      controller.abort()
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [appId, dispatch, teamIdentifier, handleCurrentApp])

  return { loadingState, errorState, contentLoading }
}
