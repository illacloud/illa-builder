import { FC } from "react"
import { Button } from "@illa-design/react"
import { Snapshot } from "@/redux/currentAppHistory/currentAppHistoryState"
import {
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
  timeStyle,
  timelineStyle,
} from "./style"

interface SnapShotListProps {
  snapshot: Snapshot
}
export const SnapShotItem: FC<SnapShotListProps> = (props) => {
  const { snapshot } = props

  return (
    <div css={timelineStyle}>
      <div css={leftWrapperStyle}>
        <div css={badgeDotStyle}>
          <div css={ellipse49Style} />
        </div>
        <div css={lineStyle} />
      </div>
      <div css={textStyle}>
        <div css={timeStyle}>{snapshot.createdAt}</div>
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
          <Button colorScheme="blackAlpha">{"Restore this version"}</Button>
        </div>
      </div>
    </div>
  )
}

SnapShotItem.displayName = "SnapShotItem"
