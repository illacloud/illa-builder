import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC } from "react"
import { MobileDashBoardLayout } from "./layout/mobile"
import { PCDashBoardLayout } from "./layout/pc/"

const Workspace: FC = () => {
  return (
    <LayoutAutoChange
      desktopPage={<PCDashBoardLayout />}
      mobilePage={<MobileDashBoardLayout />}
    />
  )
}

Workspace.displayName = "Workspace"

export default Workspace
