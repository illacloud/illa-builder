import { FC, useCallback } from "react"
import { Button } from "@illa-design/react"
import { Snapshot } from "@/redux/currentAppHistory/currentAppHistoryState"
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

  const handleClickItem = useCallback(() => {
    onClickItem(snapshot.snapshotID)
  }, [onClickItem, snapshot.snapshotID])

  return (
    <div css={timelineStyle}>
      <div css={leftWrapperStyle}>
        <div css={badgeDotStyle}>
          <div css={ellipse49Style} />
        </div>
        {!last && <div css={lineStyle} />}
      </div>
      <div css={textStyle}>
        <div css={applyTimeStyle(selected)} onClick={handleClickItem}>
          {snapshot.createdAt}
        </div>
        <div css={contentStyle}>
          {snapshot.modifyHistory.map((modify) => {
            return (
              <div key={modify.modifiedBy} css={modifyContentStyle}>
                <div css={editorInfoStyle}>
                  <img css={avatarStyle} src={"avatar1"} alt="" />
                  <div css={nameStyle}>{modify.modifiedBy}</div>
                </div>
                <div css={descStyle}>
                  {"Edited pkpaicSFM25KW1DZDqzxSRAds Data Source"}
                </div>
              </div>
            )
          })}
          {selected && (
            <Button colorScheme="blackAlpha">{"Restore this version"}</Button>
          )}
        </div>
      </div>
    </div>
  )
}

SnapShotItem.displayName = "SnapShotItem"
