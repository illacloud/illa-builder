import { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { containerStyle } from "./style"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { Connection, Room } from "@/api/ws/ws"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { useDispatch } from "react-redux"
import { DashboardResource } from "@/redux/dashboard/resources/dashboardResourceState"
import { dashboardResourceActions } from "@/redux/dashboard/resources/dashboardResourceSlice"

export const IllaApp: FC = () => {
  const [room, setRoom] = useState<Room>()
  const dispatch = useDispatch()
  useEffect(() => {
    const controller = new AbortController()
    Api.request<DashboardApp[]>(
      {
        url: "/dashboard/apps",
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(
          dashboardAppActions.updateDashboardAppListReducer(response.data),
        )
      },
      (response) => {},
      (error) => {},
    )
    Api.request<DashboardResource[]>(
      {
        url: "/dashboard/resources",
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(
          dashboardResourceActions.updateResourceListReducer(response.data),
        )
      },
      (response) => {},
      (error) => {},
    )
    Connection.enterRoom(
      "dashboard",
      (loading) => {},
      (errorState) => {},
      (room) => {
        setRoom(room)
      },
    )
    return () => {
      if (room !== undefined) {
        Connection.leaveRoom(room.roomId)
      }
      controller.abort()
    }
  }, [])
  return (
    <div css={containerStyle}>
      <DashboardTitleBar />
      <Outlet />
    </div>
  )
}

IllaApp.displayName = "IllaApp"
