import { FC } from "react"
import { Popover } from "@illa-design/react"
import { AvatarProps } from "@/page/App/components/Avatar/interface"
import {
  applyUserAvatarStyle,
  getAvatarStyle,
} from "@/page/App/components/Avatar/style"
import { getColorByString } from "@/utils/colorHelper"

const getFirstChar = (str: string | undefined) => {
  if (!str) return "U"
  const trimStr = str.trim()
  const regex = /^./u
  const match = trimStr.match(regex)
  return match ? match[0].toUpperCase() : "U"
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { userId, nickname, avatar, showType, type, showTooltips, className } =
    props
  const avatarBgColor = getColorByString(userId || "")
  const avatarText = getFirstChar(nickname)
  const node = avatar ? (
    <img
      src={avatar}
      css={getAvatarStyle(showType, type)}
      className={className}
    />
  ) : (
    <span
      css={applyUserAvatarStyle(avatarBgColor, showType, type)}
      className={className}
    >
      {avatarText}
    </span>
  )
  return (
    <Popover
      trigger="hover"
      content={nickname}
      disabled={!showTooltips}
      hasCloseIcon={false}
      position="top"
      colorScheme="grayBlue"
    >
      {node}
    </Popover>
  )
}
