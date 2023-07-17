import { FC, useCallback, useState } from "react"
import { Button } from "@illa-design/react"
import { Avatar } from "@/illa-public-component/Avatar"
import { Snapshot } from "@/redux/currentAppHistory/currentAppHistoryState"
import { recoverSnapShot } from "@/services/history"
import {
  applyTimeStyle,
  avatarStyle,
  badgeDotStyle,
  contentStyle,
  descStyle,
  editorInfoStyle,
  ellipse49Style,
  leftWrapperStyle,
  lineStyle,
  modifyContentStyle,
  nameStyle,
  textStyle,
  timelineStyle,
} from "./style"

interface SnapShotListProps {
  snapshot: Snapshot
  selected?: boolean
  last: boolean
  onClickItem: (snapshotID: string) => void
}
export const SnapShotItem: FC<SnapShotListProps> = (props) => {
  const { snapshot, selected, last, onClickItem } = props
  const [loading, setLoading] = useState(false)

  const handleClickItem = useCallback(() => {
    onClickItem(snapshot.snapshotID)
  }, [onClickItem, snapshot.snapshotID])

  const handleRecoverSnapShot = useCallback(async () => {
    setLoading(true)
    try {
      await recoverSnapShot(snapshot.appRefID, snapshot.snapshotID)
    } catch (e) {
      console.log("recoverSnapShot error", e)
    } finally {
      setLoading(false)
    }
  }, [snapshot.appRefID, snapshot.snapshotID])

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
            {"current version"}
          </div>
        ) : (
          <>
            <div css={applyTimeStyle(selected)} onClick={handleClickItem}>
              {snapshot.createdAt}
            </div>
            <div css={contentStyle}>
              {snapshot.modifyHistory.map((modify) => {
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
                    <div css={descStyle}>
                      {"Edited pkpaicSFM25KW1DZDqzxSRAds Data Source"}
                    </div>
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
