import MemberPage from "@illa-public/member-page"
import { FC } from "react"
import { MemberProps } from "@/page/Member/interface"
import { memberPageContainerStyle } from "./style"

export const Member: FC<MemberProps> = () => {
  return (
    <div css={memberPageContainerStyle}>
      <MemberPage />
    </div>
  )
}

export default Member

Member.displayName = "Member"
