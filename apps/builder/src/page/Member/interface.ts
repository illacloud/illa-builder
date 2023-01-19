import { HTMLAttributes } from "react"
import {
  USER_ROLE,
  USER_STATUS,
} from "@/illa-public-component/UserRoleUtils/interface"

export interface MemberProps extends HTMLAttributes<HTMLDivElement> {}

export interface MemberInfo {
  uid: string
  nickname: string
  avatar: string
  email: string
  userID: string
  teamMemberID: string
  userRole: USER_ROLE
  userStatus: USER_STATUS
  isSubscribed: boolean
  language: string
  createdAt: string
  updatedAt: string
  permission: Record<string, any> // Reserved Field
}

export interface InviteByEmailRes {
  name?: string
  email: string
  userID: string
  teamMemberID: string
  userRole: USER_ROLE
  userAvatar?: string
  emailStatus: USER_STATUS
}

export interface BuilderCardInfo {
  appNum: number
  actionNum: number
  lastModifiedAt: string
  resourceNum: number
}
