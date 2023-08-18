import MemberPage from "@illa-public/member-page"
import { FC } from "react"
import { MemberProps } from "@/page/Member/interface"

export const Member: FC<MemberProps> = () => {
  return <MemberPage />
}

export default Member

Member.displayName = "Member"
