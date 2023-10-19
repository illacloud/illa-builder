import { MemberInfo } from "@illa-public/user-data"
import { HTMLAttributes } from "react"

export interface MemberProps extends HTMLAttributes<HTMLDivElement> {}

export interface MemberListLoaderData {
  memberList: Promise<MemberInfo[]>
}
