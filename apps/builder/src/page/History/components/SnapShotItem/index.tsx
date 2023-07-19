import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Tag, useMessage } from "@illa-design/react"
import { Signal } from "@/api/ws/ILLA_PROTO"
import { Avatar } from "@/illa-public-component/Avatar"
import { currentAppHistoryActions } from "@/redux/currentAppHistory/currentAppHistorySlice"
import {
  ModifyHistory,
  Snapshot,
  SnapshotTriggerMode,
} from "@/redux/currentAppHistory/currentAppHistoryState"
import { recoverSnapShot, recoverSnapShotWS } from "@/services/history"
import { formatDate } from "@/utils/dayjs"
import { isILLAAPiError } from "@/utils/typeHelper"
import { ReactComponent as SaveIcon } from "./assets/save.svg"
import {
  applyTimeStyle,
  avatarStyle,
  badgeDotStyle,
  contentStyle,
  descStyle,
  editorInfoStyle,
  ellipse49Style,
  itemHeaderStyle,
  leftWrapperStyle,
  lineStyle,
  manualStyle,
  modifyContentStyle,
  nameStyle,
  textStyle,
  timelineStyle,
} from "./style"

interface SnapShotListProps {
  snapshot: Snapshot
  selected?: boolean
  last: boolean
}
export const SnapShotItem: FC<SnapShotListProps> = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()
  const { t } = useTranslation()
  const { snapshot, selected, last } = props
  const [loading, setLoading] = useState(false)

  const getOperationDesc = (history: ModifyHistory) => {
    const { operation, operationTargetName } = history

    switch (operation) {
      case Signal.MOVE_STATE:
        return t("editor.history.operation.Moved", { operationTargetName })
      case Signal.DELETE_STATE:
        return t("editor.history.operation.Deleted", { operationTargetName })
      case Signal.CREATE_STATE:
        return t("editor.history.operation.Created", { operationTargetName })
      case Signal.UPDATE_STATE:
        return t("editor.history.operation.Updated", { operationTargetName })
    }
  }

  const handleClickItem = useCallback(() => {
    dispatch(
      currentAppHistoryActions.updateCurrentSnapshotIDReducer(
        snapshot.snapshotID,
      ),
    )
  }, [dispatch, snapshot.snapshotID])

  const handleRecoverSnapShot = useCallback(async () => {
    setLoading(true)
    try {
      await recoverSnapShot(snapshot.appID, snapshot.snapshotID)
      await recoverSnapShotWS(snapshot.appID)
      message.success({ content: t("editor.history.message.suc.restore") })
      navigate(`/${teamIdentifier}/app/${snapshot.appID}`)
    } catch (error) {
      if (isILLAAPiError(error)) {
        message.error({ content: t("editor.history.message.fail.restore") })
      } else {
        message.error({ content: t("network_error") })
      }
    } finally {
      setLoading(false)
    }
  }, [
    snapshot.appID,
    snapshot.snapshotID,
    teamIdentifier,
    message,
    navigate,
    t,
  ])

  return (
    <div css={timelineStyle}>
      <div css={leftWrapperStyle}>
        <div css={badgeDotStyle}>
          <div css={ellipse49Style} />
        </div>
        {!last && <div css={lineStyle} />}
      </div>
      <div css={textStyle}>
        {snapshot.targetVersion === 0 ? (
          <div css={applyTimeStyle(selected)} onClick={handleClickItem}>
            {t("editor.history.history_list.current")}
          </div>
        ) : (
          <>
            <div css={itemHeaderStyle}>
              <div css={applyTimeStyle(selected)} onClick={handleClickItem}>
                {formatDate(snapshot.createdAt)}
              </div>
              {snapshot.snapshotTriggerMode === SnapshotTriggerMode.MANUAL && (
                <Tag>
                  <div css={manualStyle}>
                    <SaveIcon />
                    {t("editor.history.history_list.manual")}
                  </div>
                </Tag>
              )}
            </div>
            <div css={contentStyle}>
              {snapshot.modifyHistory.slice(-2).map((modify) => {
                const desc = getOperationDesc(modify)
                if (!desc) return null
                return (
                  <div key={modify.modifiedAt} css={modifyContentStyle}>
                    <div css={editorInfoStyle}>
                      <Avatar
                        key={modify.modifiedBy.userID}
                        css={avatarStyle}
                        avatarUrl={modify.modifiedBy.avatar}
                        name={modify.modifiedBy.nickname}
                        id={modify.modifiedBy.userID}
                      />
                      <div css={nameStyle}>{modify.modifiedBy.nickname}</div>
                    </div>
                    <div css={descStyle}>{desc}</div>
                  </div>
                )
              })}
              {selected && (
                <Button
                  colorScheme="blackAlpha"
                  loading={loading}
                  onClick={handleRecoverSnapShot}
                >
                  {"Restore this version"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

SnapShotItem.displayName = "SnapShotItem"
