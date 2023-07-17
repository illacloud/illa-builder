import { useCallback, useEffect, useState } from "react"
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

const INITIAL_PAGE = 0

const initialSnapshot = [
  {
    snapshotID: "ILA00012",
    teamID: "ILAex4p1C7YJ",
    appRefID: "ILAex4p1C7U3",
    targetVersion: 0, // 0 代表当前正在编辑的版本, 是不能恢复到这个版本的.
    snapshotTriggerMode: 1, // 1, automatic, 2, manual
    modifyHistory: [
      {
        operation: 1, // 详见 [App Operaion List](#app-operaion-list)
        operationTarget: 2, // 详见 [App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "input1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
      {
        operation: 2, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 4, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "table1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:19.486328",
      },
    ],
    createdAt: "2023-03-03 15:54:17.486328",
  },
  {
    snapshotID: "ILA00013",
    teamID: "ILAex4p1C7YJ",
    appRefID: "ILAex4p1C7U3",
    targetVersion: 192, // 非 0 版本即为 App 的内部历史快照内部版本, 是内部使用的, 恢复快照需要传 snapshotID, 而不是这个字段.
    snapshotTriggerMode: 2, // 1, automatic, 2, manual
    modifyHistory: [
      {
        operation: 1, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 2, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "input1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:17.486328",
      },
      {
        operation: 2, // 详见 [ App Operaion List](#app-operaion-list)
        operationTarget: 4, // 详见 [ App Operaion Target List](#app-operaion-target-list)
        operationTargetName: "table1",
        modifiedBy: {
          userID: "1",
          nickname: "your_nickname",
          avatar: "https://cdn.illasoft.com/userID/avatar.png",
          email: "youremail@domain.com",
        },
        modifiedAt: "2023-03-03 15:54:18.486328",
      },
    ],
    createdAt: "2023-03-03 15:54:17.486328",
  },
]
export const useInitHistoryApp = (mode: IllaMode = "history") => {
  const { appId } = useParams()
  const dispatch = useDispatch()
  const currentSnapshotID = useSelector(getCurrentAppSnapshotID)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { teamIdentifier } = useParams()

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
        })
        .finally(() => {
          setContentLoading(false)
        })
    }
    return () => {
      controller.abort()
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
              currentAppHistoryActions.updateCurrentAppHistoryReducer({
                ...data,
                hasMore: data.totalPage - 1 !== INITIAL_PAGE,
                currentSnapshotID,
              }),
            )
            resolve(data)
          })
          .catch(() => {
            const data = {
              snapshotList: initialSnapshot,
              totalPage: 1,
            }
            const currentSnapshotID = data.snapshotList[0].snapshotID
            dispatch(
              currentAppHistoryActions.updateCurrentAppHistoryReducer({
                ...data,
                hasMore: data.totalPage - 1 !== INITIAL_PAGE,
                currentSnapshotID,
              }),
            )
            reject()
          })
      }).catch(() => {
        setErrorState(true)
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
