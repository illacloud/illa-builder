import { HTMLAttributes } from "react"

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  userId?: string | number
  nickname?: string
  avatar?: string
  // component or app
  showType?: string
  type?: string
  showTooltips?: boolean
}
