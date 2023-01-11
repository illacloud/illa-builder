import { FC } from "react"
import { AvatarProps } from "@/page/App/components/Avatar/interface"
import { applyUserAvatarStyle } from "@/page/App/components/Avatar/style"

export const Avatar: FC<AvatarProps> = (props) => {
  const { userId, nickname } = props
  const avatarBgColor = `${userId}`.padEnd(6, "0").substring(0, 6) || "654aec"
  const avatarText = nickname?.substring?.(0, 1).toUpperCase() || "U"
  return <span css={applyUserAvatarStyle(avatarBgColor)}>{avatarText}</span>
}
