import { FC } from "react"
import { Outlet } from "react-router-dom"
import { applyContainer } from "./style"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"

export const IllaApp: FC = () => {
  return (
    <div css={applyContainer()}>
      <DashboardTitleBar />
      <Outlet />
    </div>
  )
}
