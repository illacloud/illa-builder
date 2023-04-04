import { FC } from "react"
import { Popover } from "@illa-design/react"
import { AvatarProps } from "@/page/App/components/Avatar/interface"
import {
  applyUserAvatarStyle,
  getAvatarStyle,
} from "@/page/App/components/Avatar/style"
import { getColorByString } from "@/utils/colorHelper"

export const Avatar: FC<AvatarProps> = (props) => {
  const { userId, nickname, avatar, showType, type, showTooltips, className } =
    props
  const avatarBgColor = getColorByString(userId || "")
  const avatarText = nickname?.substring?.(0, 1).toUpperCase() || "U"
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
