import { FC } from "react"
import { SettingNavBar } from "@/page/Setting/navBar"
import { SettingTabNavBar } from "@/page/Setting/tabPanel"

export const Setting: FC = () => {
  return (
    <div>
      <SettingNavBar />
      <SettingTabNavBar />
    </div>
  )
}

export default Setting
