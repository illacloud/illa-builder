import { Avatar } from "@illa-public/avatar"
import { isILLAAPiError } from "@illa-public/illa-net"
import { getILLABuilderURL } from "@illa-public/utils"
import { formatDate } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { Button, useMessage } from "@illa-design/react"
import { Signal } from "@/api/ws/ILLA_PROTO"
import {
  ModifyHistory,
  Snapshot,
  SnapshotTriggerMode,
} from "@/redux/currentAppHistory/currentAppHistoryState"
import { recoverSnapShot, recoverSnapShotWS } from "@/services/history"
import SaveIcon from "./assets/save.svg?react"
import {
  applyDotStyle,
  applyTimeStyle,
  avatarStyle,
  badgeDotStyle,
  contentStyle,
  descStyle,
  editorInfoStyle,
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
  onChangeCurrentID: (snapshotID: string) => void
}

const getKeyFromBroadcast = (type: string) => {
  const typeList = type.split("/")
  const reduxAction = typeList[1] || ""
  // Basic rules
  if (reduxAction.startsWith("add")) {
    return "editor.history.operation.Added"
  } else if (reduxAction.startsWith("delete")) {
    return "editor.history.operation.Deleted"
  } else if (reduxAction.startsWith("update")) {
    return "editor.history.operation.Updated"
  } else if (reduxAction.startsWith("reset")) {
    return "editor.history.operation.Reseted"
  }
}

export const SnapShotItem: FC<SnapShotListProps> = (props) => {
  const message = useMessage()
  const { teamIdentifier } = useParams()
  const { t } = useTranslation()
  const { snapshot, selected, last, onChangeCurrentID } = props
  const [loading, setLoading] = useState(false)

  const getDescFromBroadcast = useCallback(
    (type: string, payload: any, operationTargetName: string) => {
      const typeList = type.split("/")
      const reduxAction = typeList[1] || ""
      // Supplementary rules
      if (reduxAction === "setGlobalStateReducer") {
        if (payload?.oldKey) {
          return t("editor.history.operation.Updated", {
            operationTargetName: "globalData",
          })
        }
        return t("editor.history.operation.Added", {
          operationTargetName: "globalData",
        })
      }
      return t("editor.history.operation.Added", {
        operationTargetName,
      })
    },
    [t],
  )

  const getOperationDesc = useCallback(
    (history: ModifyHistory) => {
      const {
        operation,
        operationTargetName,
        operationBroadcastType,
        operationBroadcastPayload,
        operationTargetModifiedAt,
      } = history

      switch (operation) {
        case Signal.UPDATE_STATE:
          const operationKey = getKeyFromBroadcast(operationBroadcastType)
          if (operationKey) {
            return t(operationKey, { operationTargetName })
          } else {
            return getDescFromBroadcast(
              operationBroadcastType,
              operationBroadcastPayload,
              operationTargetName,
            )
          }
        case Signal.CREATE_STATE:
          return t("editor.history.operation.Created", { operationTargetName })
        case Signal.DELETE_STATE:
          return t("editor.history.operation.Deleted", { operationTargetName })
        case Signal.MOVE_STATE:
          return t("editor.history.operation.Moved", { operationTargetName })
        case Signal.RECOVER_APP_SNAPSHOT:
          return t("editor.history.operation.Restored", {
            versionName: formatDate(operationTargetModifiedAt),
          })
      }
    },
    [t, getDescFromBroadcast],
  )

  const handleRecoverSnapShot = useCallback(async () => {
    setLoading(true)
    try {
      await recoverSnapShot(snapshot.appID, snapshot.snapshotID)
      await recoverSnapShotWS(snapshot.appID)
      message.success({ content: t("editor.history.message.suc.restore") })
      window.location.href = `${getILLABuilderURL(
        window.customDomain,
      )}/${teamIdentifier}/app/${snapshot.appID}`
    } catch (error) {
      if (isILLAAPiError(error)) {
        message.error({ content: t("editor.history.message.fail.restore") })
      } else {
        message.error({ content: t("network_error") })
      }
    } finally {
      setLoading(false)
    }
  }, [snapshot.appID, snapshot.snapshotID, teamIdentifier, message, t])

  const handleClickItem = useCallback(() => {
    onChangeCurrentID(snapshot.snapshotID)
  }, [onChangeCurrentID, snapshot.snapshotID])

  return (
    <div css={timelineStyle}>
      <div css={leftWrapperStyle}>
        <div css={badgeDotStyle}>
          <div css={applyDotStyle(selected)} />
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
                <div css={manualStyle}>
                  <SaveIcon />
                  {t("editor.history.history_list.manual")}
                </div>
              )}
            </div>
            {snapshot.modifyHistory.length > 0 && (
              <div css={contentStyle}>
                {snapshot.modifyHistory.map((modify) => {
                  const desc = getOperationDesc(modify)
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
              </div>
            )}
            {selected && (
              <Button
                colorScheme="blackAlpha"
                loading={loading}
                onClick={handleRecoverSnapShot}
              >
                {t("editor.history.restore")}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

SnapShotItem.displayName = "SnapShotItem"
