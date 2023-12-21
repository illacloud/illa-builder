import {
  BottomList,
  MobileCloudDashboardLayout,
} from "@illa-public/cloud-dashboard-layout"
import { getCurrentUserID } from "@illa-public/user-data"
import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { DashBoardDynamicMenu } from "@/page/workspace/components/DynamicMenu"
import { WorkspaceLayoutProps } from "../interface"

export const MobileDashBoardLayout: FC<WorkspaceLayoutProps> = ({
  onOpenChangeLogModal,
}) => {
  const isLogin = useSelector(getCurrentUserID)
  const [drawerVisible, setDrawerVisible] = useState(false)

  const handleClickMenuItem = (key: string) => {
    setDrawerVisible(false)
    if (key === "change-log") {
      onOpenChangeLogModal()
    }
  }

  return (
    <MobileCloudDashboardLayout
      setDrawerVisible={setDrawerVisible}
      drawerVisible={drawerVisible}
      bottomComponent={
        <BottomList onClickMenuItemCallback={handleClickMenuItem} />
      }
      dynamicMenu={
        <div>
          <DashBoardDynamicMenu
            onClickMenuItemCallback={() => {
              setDrawerVisible(false)
            }}
          />
        </div>
      }
    >
      {isLogin && <Outlet />}
    </MobileCloudDashboardLayout>
  )
}
