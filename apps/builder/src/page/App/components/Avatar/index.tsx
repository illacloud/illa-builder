import { HTTP_REQUEST_PUBLIC_BASE_URL } from "@illa-public/illa-net/constant"
import { getColorByString } from "@illa-public/utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { Popover } from "@illa-design/react"
import { AvatarProps } from "@/page/App/components/Avatar/interface"
import {
  applyUserAvatarStyle,
  getAvatarStyle,
} from "@/page/App/components/Avatar/style"

const getFirstChar = (str: string | undefined) => {
  if (!str) return "U"
  const trimStr = str.trim()
  const regex = /^./u
  const match = trimStr.match(regex)
  return match ? match[0].toUpperCase() : "U"
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { userID, nickname, avatar, showType, type, showTooltips, className } =
    props
  const avatarBgColor = getColorByString(userID || "")
  const avatarText = getFirstChar(nickname)
  const node = avatar ? (
    <img
      src={
        avatar
          ? isCloudVersion
            ? avatar
            : `${HTTP_REQUEST_PUBLIC_BASE_URL}${avatar}`
          : undefined
      }
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
