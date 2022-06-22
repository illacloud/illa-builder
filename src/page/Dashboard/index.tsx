import { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { containerStyle } from "./style"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { Connection, Room } from "@/api/ws/ws"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { useDispatch } from "react-redux"
import { Resource } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"

export const IllaApp: FC = () => {
  const [room, setRoom] = useState<Room>()
  const dispatch = useDispatch()
  useEffect(() => {
    const controller = new AbortController()
    Api.request<DashboardApp[]>(
      {
        url: "/api/v1/apps",
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

    Api.request<Resource[]>(
      {
        url: "/api/v1/resources",
        method: "GET",
        signal: controller.signal,
      },
      (response) => {
        dispatch(resourceActions.addResourceListReducer(response.data))
      },
      () => {
        // TODO: handle error
      },
      () => {},
      () => {
        // TODO: handle loading
      },
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
