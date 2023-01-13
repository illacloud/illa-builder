import { applyUserAvatarStyle } from "./style"

export const ListItem = ({
  avatar,
  userId,
  nickname,
  type,
}: {
  avatar: string
  userId?: string | number
  nickname?: string
  type?: string
}) => {
  const avatarBgColor = `${userId}`.padEnd(6, "0").substring(0, 6) || "654aec"
  const avatarText = nickname?.substring?.(0, 1).toUpperCase() || "U"
  return avatar ? (
    <img src={avatar} css={applyUserAvatarStyle(avatarBgColor, type)} />
  ) : (
    <span css={applyUserAvatarStyle(avatarBgColor, type)}>{avatarText}</span>
  )
}
