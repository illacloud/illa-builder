import { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { containerStyle } from "./style"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { Connection, Room } from "@/api/ws/ws"

export const IllaApp: FC = () => {
  const [room, setRoom] = useState<Room>()
  useEffect(() => {
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
