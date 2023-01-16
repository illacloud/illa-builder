import { FC } from "react"
import { AvatarProps } from "@/page/App/components/Avatar/interface"
import {
  applyUserAvatarStyle,
  getAvatarStyle,
} from "@/page/App/components/Avatar/style"

export const Avatar: FC<AvatarProps> = (props) => {
  const { userId, nickname, avatar, showType, type } = props
  const avatarBgColor = `${userId}`.padEnd(6, "0").substring(0, 6) || "654aec"
  const avatarText = nickname?.substring?.(0, 1).toUpperCase() || "U"
  return avatar ? (
    <img src={avatar} css={getAvatarStyle(showType, type)} />
  ) : (
    <span css={applyUserAvatarStyle(avatarBgColor, showType, type)}>
      {avatarText}
    </span>
  )
}
