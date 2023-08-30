import { FC, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { Connection, fixedWsURL } from "@/api/ws"
import {
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { configActions } from "@/redux/config/configSlice"
import { fetchDashboardWsURL } from "@/services/public"
import { containerStyle } from "./style"

export const IllaApp: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const abortController = new AbortController()
    fetchDashboardWsURL(abortController.signal)
      .then((res) => {
        Connection.enterDashboardRoom(fixedWsURL(res.data.wsURL))
      })
      .catch(() => {})
    return () => {
      abortController.abort()
      Connection.leaveRoom("dashboard", "")
      dispatch(
        configActions.updateWSStatusReducer({
          context: ILLA_WEBSOCKET_CONTEXT.DASHBOARD,
          wsStatus: ILLA_WEBSOCKET_STATUS.CLOSED,
        }),
      )
    }
  }, [dispatch])

  return (
    <div css={containerStyle}>
      <DashboardTitleBar />
      <Outlet />
    </div>
  )
}

export default IllaApp

IllaApp.displayName = "IllaApp"
