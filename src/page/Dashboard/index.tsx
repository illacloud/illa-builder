import { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Loading } from "@illa-design/loading"
import { CloseIcon } from "@illa-design/icon"
import { Button } from "@illa-design/button"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { Connection, Room } from "@/api/ws/ws"
import { Api } from "@/api/base"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { useDispatch } from "react-redux"
import { Resource } from "@/redux/resource/resourceState"
import { resourceActions } from "@/redux/resource/resourceSlice"
import {
  containerStyle,
  loadingStyle,
  errorBodyStyle,
  errorIconContentStyle,
  errorIconColorStyle,
  errorTitleStyle,
  errorDescriptionStyle,
} from "./style"

export const IllaApp: FC = () => {
  const { t } = useTranslation()

  const [pageState, setPageState] = useState<string>("loading")
  const [retryNum, setRetryNum] = useState<number>(0)

  const [room, setRoom] = useState<Room>()
  const dispatch = useDispatch()
  useEffect(() => {
    const controller = new AbortController()
    const appList = new Promise((resolve) => {
      Api.request<DashboardApp[]>(
        {
          url: "/apps",
          method: "GET",
          signal: controller.signal,
        },
        (response) => {
          dispatch(
            dashboardAppActions.updateDashboardAppListReducer(response.data),
          )
          resolve("success")
        },
        (failure) => {},
        (crash) => {},
        (loading) => {},
        (errorState) => {
          if (errorState) {
            resolve("error")
          }
        },
      )
    })

    const resourceList = new Promise((resolve) => {
      Api.request<Resource[]>(
        {
          url: "/resources",
          method: "GET",
          signal: controller.signal,
        },
        (response) => {
          dispatch(resourceActions.addResourceListReducer(response.data))
          resolve("success")
        },
        (failure) => {},
        (crash) => {},
        (loading) => {},
        (errorState) => {
          if (errorState) {
            resolve("error")
          }
        },
      )
    })

    Promise.all([appList, resourceList]).then((result) => {
      if (result.includes("error")) {
        setPageState("error")
      } else {
        setPageState("success")
      }
    })

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
  }, [retryNum])
  return (
    <div css={containerStyle}>
      <DashboardTitleBar />
      {pageState === "loading" && <Loading _css={loadingStyle} />}
      {pageState === "error" && (
        <div css={errorBodyStyle}>
          <div css={errorIconContentStyle}>
            <CloseIcon size="16px" _css={errorIconColorStyle} />
          </div>
          <div css={errorTitleStyle}>{t("dashboard.common.error_title")}</div>
          <div css={errorDescriptionStyle}>
            {t("dashboard.common.error_description")}
          </div>
          <Button
            colorScheme="techPurple"
            onClick={() => {
              setRetryNum(retryNum + 1)
            }}
          >
            {t("dashboard.common.error_button")}
          </Button>
        </div>
      )}
      {pageState === "success" && <Outlet />}
    </div>
  )
}

IllaApp.displayName = "IllaApp"
