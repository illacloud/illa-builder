import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { Navigate } from "react-router-dom"
import SettingMobileLayout from "@/page/setting/layout/mobile"
import MobileEntrance from "./mobileEntrance"

const SettingLanding: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<Navigate to="/setting/account" replace />}
      mobilePage={
        <SettingMobileLayout withoutPadding>
          <MobileEntrance />
        </SettingMobileLayout>
      }
    />
  )
}

export default SettingLanding
