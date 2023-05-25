import { FC } from "react"
import {
  receivingAvatarStyle,
  receivingContainerStyle,
  receivingStyle,
} from "@/widgetLibrary/ChatWidget/style"

export const Receiving: FC<{
  leftMessageColor?: string
  showAvatar?: boolean
}> = (props) => {
  const { leftMessageColor = "grayBlue", showAvatar } = props
  return (
    <div css={receivingContainerStyle}>
      {showAvatar && <div css={receivingAvatarStyle} />}
      <div css={receivingStyle(leftMessageColor)} />
    </div>
  )
}
