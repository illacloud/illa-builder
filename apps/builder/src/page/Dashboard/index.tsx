import { Dispatch } from "@reduxjs/toolkit"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { Button, CloseIcon, Loading } from "@illa-design/react"
import { Connection } from "@/api/ws"
import {
  ILLA_WEBSOCKET_CONTEXT,
  ILLA_WEBSOCKET_STATUS,
} from "@/api/ws/interface"
import { DashboardTitleBar } from "@/page/Dashboard/components/DashboardTitleBar"
import { configActions } from "@/redux/config/configSlice"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { fetchAppList } from "@/services/apps"
import { fetchResources } from "@/services/resource"
import {
  containerStyle,
  errorBodyStyle,
  errorDescriptionStyle,
  errorIconColorStyle,
  errorIconContentStyle,
  errorTitleStyle,
  loadingStyle,
} from "./style"

function requestData(
  dispatch: Dispatch,
  controller: AbortController,
  onError: () => void,
  onSuccess: () => void,
  onLoading: () => void,
) {
  onLoading()
  const appList = new Promise((resolve) => {
    fetchAppList(controller.signal).then(
      (response) => {
        dispatch(
          dashboardAppActions.updateDashboardAppListReducer(response.data),
        )
        resolve("success")
      },
      () => {
        resolve("error")
      },
    )
  })

  const resourceList = new Promise((resolve) => {
    fetchResources(controller.signal).then(
      (response) => {
        dispatch(resourceActions.updateResourceListReducer(response.data))
        resolve("success")
      },
      () => {
        resolve("error")
      },
    )
  })
  Promise.all([appList, resourceList]).then((result) => {
    onLoading()
    if (result.includes("error")) {
      onError()
    } else {
      onSuccess()
    }
  })
}

export const IllaApp: FC = () => {
  const { t } = useTranslation()

  const [pageState, setPageState] = useState<string>("loading")

  const dispatch = useDispatch()
  useEffect(() => {
    const controller = new AbortController()
    requestData(
      dispatch,
      controller,
      () => {
        setPageState("error")
      },
      () => {
        setPageState("success")
      },
      () => {
        setPageState("loading")
      },
    )
    return () => {
      controller.abort()
    }
  }, [dispatch])

  useEffect(() => {
    Connection.enterRoom("dashboard", "")
    return () => {
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
      {pageState === "loading" && (
        <Loading _css={loadingStyle} colorScheme="techPurple" />
      )}
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
              requestData(
                dispatch,
                new AbortController(),
                () => {
                  setPageState("error")
                },
                () => {
                  setPageState("success")
                },
                () => {
                  setPageState("loading")
                },
              )
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

export default IllaApp

IllaApp.displayName = "IllaApp"
