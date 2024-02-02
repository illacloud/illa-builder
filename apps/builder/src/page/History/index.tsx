import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import { canManage } from "@illa-public/user-role-utils"
import { ACTION_MANAGE, ATTRIBUTE_GROUP } from "@illa-public/user-role-utils"
import { Unsubscribe } from "@reduxjs/toolkit"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Loading, TriggerProvider, useMessage } from "@illa-design/react"
import { updateCurrentAppInfo } from "@/hooks/useInitApp"
import { CanvasPanel } from "@/page/App/Module/CanvasPanel"
import {
  centerPanelStyle,
  contentStyle,
  editorContainerStyle,
  loadingStyle,
  middlePanelStyle,
  rightPanelStyle,
} from "@/page/App/style"
import { HistoryNavBar } from "@/page/History/components/HistoryNavBar"
import { SnapShotList } from "@/page/History/components/SnapShotList"
import { setupConfigListeners } from "@/redux/config/configListener"
import { setupActionListeners } from "@/redux/currentApp/action/actionListener"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { DashboardAppInitialState } from "@/redux/currentApp/appInfo/appInfoState"
import { setupComponentsListeners } from "@/redux/currentApp/components/componentsListener"
import { setupExecutionListeners } from "@/redux/currentApp/executionTree/executionListener"
import { setupLayoutInfoListeners } from "@/redux/currentApp/layoutInfo/layoutInfoListener"
import { getCurrentAppSnapshotID } from "@/redux/currentAppHistory/currentAppHistorySelector"
import { currentAppHistoryActions } from "@/redux/currentAppHistory/currentAppHistorySlice"
import { fetchSnapShot } from "@/services/history"
import { startAppListening } from "@/store"

export const History: FC = () => {
  const dispatch = useDispatch()
  const message = useMessage()
  const { appId } = useParams()
  const { t } = useTranslation()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const currentSnapshotID = useSelector(getCurrentAppSnapshotID)
  const currentUserRole = teamInfo?.myRole
  const uid = teamInfo?.uid ?? ""
  const teamID = teamInfo?.id ?? ""

  const [contentLoading, setContentLoading] = useState(false)
  const preSnapshotID = useRef<string>()

  // check if user can manage the app
  if (currentUserRole) {
    const canEditApp = canManage(
      currentUserRole,
      ATTRIBUTE_GROUP.APP,
      getPlanUtils(teamInfo),
      ACTION_MANAGE.EDIT_APP,
    )
    if (!canEditApp) {
      throw new Error("You don't have permission to edit this app")
    }
  }

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupExecutionListeners(startAppListening),
      setupLayoutInfoListeners(startAppListening),
      setupComponentsListeners(startAppListening),
      setupActionListeners(startAppListening),
      setupConfigListeners(startAppListening),
    ]
    return () => subscriptions.forEach((unsubscribe) => unsubscribe())
  }, [])

  const onChangeCurrentID = useCallback(
    (snapshotID: string) => {
      preSnapshotID.current = currentSnapshotID
      dispatch(
        currentAppHistoryActions.updateCurrentSnapshotIDReducer(snapshotID),
      )
    },
    [currentSnapshotID, dispatch],
  )

  useEffect(() => {
    const controller = new AbortController()
    if (currentSnapshotID && appId) {
      setContentLoading(true)
      fetchSnapShot(appId, currentSnapshotID, controller.signal)
        .then((res) => {
          preSnapshotID.current = currentSnapshotID
          updateCurrentAppInfo(res.data, "preview", appId, teamID, uid)
        })
        .catch(() => {
          message.error({
            content: t("editor.history.message.fail.preview"),
          })
          preSnapshotID.current &&
            dispatch(
              currentAppHistoryActions.updateCurrentSnapshotIDReducer(
                preSnapshotID.current,
              ),
            )
        })
        .finally(() => {
          setContentLoading(false)
        })
    }
    return () => {
      controller.abort()
      dispatch(appInfoActions.updateAppInfoReducer(DashboardAppInitialState))
    }
  }, [t, dispatch, message, appId, currentSnapshotID, teamID, uid])

  return (
    <div css={editorContainerStyle}>
      <HistoryNavBar />
      <div css={contentStyle}>
        <div css={middlePanelStyle}>
          {contentLoading ? (
            <div css={loadingStyle}>
              <Loading colorScheme="techPurple" />
            </div>
          ) : (
            <TriggerProvider renderInBody zIndex={10}>
              <CanvasPanel css={centerPanelStyle} />
            </TriggerProvider>
          )}
        </div>
        <TriggerProvider renderInBody zIndex={10}>
          <SnapShotList
            onChangeCurrentID={onChangeCurrentID}
            css={rightPanelStyle}
          />
        </TriggerProvider>
      </div>
    </div>
  )
}

export default History

History.displayName = "History"
