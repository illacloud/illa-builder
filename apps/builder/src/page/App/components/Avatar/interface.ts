import { HTMLAttributes } from "react"

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  userID?: string
  nickname?: string
  avatar?: string
  // component or app
  showType?: string
  type?: string
  showTooltips?: boolean
}
