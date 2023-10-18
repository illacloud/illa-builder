import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { Member } from "@/page/member"
import SettingMobileLayout from "@/page/setting/layout/mobile"

const TeamMembers: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<Member />}
      mobilePage={
        <SettingMobileLayout>
          <Member />
        </SettingMobileLayout>
      }
    />
  )
}

export default TeamMembers
