import { FC } from "react"
import { Button } from "@illa-design/react"
import {
  badgeDotStyle,
  ellipse49Style,
  leftWrapperStyle,
  textStyle,
  timelineStyle,
} from "@/page/History/components/SnapShotItem/style"

export const ActionArea: FC = () => {
  return (
    <div css={timelineStyle}>
      <div css={leftWrapperStyle}>
        <div css={badgeDotStyle}>
          <div css={ellipse49Style} />
        </div>
      </div>
      <div css={textStyle}>
        <Button>More</Button>
      </div>
    </div>
  )
}

ActionArea.displayName = "ActionArea"
