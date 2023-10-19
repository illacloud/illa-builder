import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { getCurrentUserID } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import SettingLayout from "./layout/pc"

export const Setting: FC = () => {
  const isLogin = useSelector(getCurrentUserID)

  return isLogin ? (
    <LayoutAutoChange
      desktopPage={
        <SettingLayout>
          <Outlet />
        </SettingLayout>
      }
      mobilePage={<Outlet />}
    />
  ) : (
    <Navigate to="/login" replace={true} />
  )
}

Setting.displayName = "Setting"

export default Setting
