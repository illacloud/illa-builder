import { FC } from "react"
import { Outlet } from "react-router-dom"
import { containerStyle } from "./style"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"

export const IllaApp: FC = () => {
  return (
    <div css={containerStyle}>
      <DashboardTitleBar />
      <Outlet />
    </div>
  )
}

IllaApp.displayName = "IllaApp"
