import {
  BottomList,
  MobileCloudDashboardLayout,
} from "@illa-public/cloud-dashboard-layout"
import { getCurrentUserID } from "@illa-public/user-data"
import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { DashBoardDynamicMenu } from "@/page/workspace/components/DynamicMenu"

export const MobileDashBoardLayout: FC = () => {
  const isLogin = useSelector(getCurrentUserID)
  const [drawerVisible, setDrawerVisible] = useState(false)

  return (
    <MobileCloudDashboardLayout
      setDrawerVisible={setDrawerVisible}
      drawerVisible={drawerVisible}
      bottomComponent={
        <BottomList
          onClickMenuItemCallback={() => {
            setDrawerVisible(false)
          }}
        />
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
