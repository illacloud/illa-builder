import { FC, useEffect, useState } from "react"
import { DashboardItemMenuProps } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Input } from "@illa-design/input"
import { Message } from "@illa-design/message"
import {
  triggerContentContainerCss,
  applyTriggerContentItemStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Api } from "@/api/base"
import { useDispatch } from "react-redux"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"

export const DashboardItemMenu: FC<DashboardItemMenuProps> = (props) => {
  const { appId, appName } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  let confirmVal = ""

  return (
    <div css={triggerContentContainerCss}>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-techPurple-01`),
        )}
        onClick={() => {
          Modal.confirm({
            content: (
              <Input
                onChange={(res) => {
                  confirmVal = res
                }}
              />
            ),
            title: t("rename"),
            confirmLoading: confirmLoading,
            onOk: () => {
              setConfirmLoading(true)
              return new Promise((resolve) => {
                Api.request(
                  {
                    url: `/api/v1/apps/${appId}`,
                    method: "PUT",
                    data: {
                      appName: confirmVal,
                    },
                  },
                  (response) => {
                    dispatch(
                      dashboardAppActions.renameDashboardAppReducer({
                        appId: appId,
                        newName: confirmVal,
                      }),
                    )

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                  (failure) => {
                    Message.error(t("dashboard.app.rename_fail"))

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                  (crash) => {
                    Message.error(t("network_error"))

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                )
              })
            },
          })
        }}
      >
        {t("rename")}
      </div>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-grayBlue-02`),
        )}
        onClick={() => {
          Modal.confirm({
            content: (
              <Input
                onChange={(res) => {
                  confirmVal = res
                }}
                placeholder={`${t("dashboard.app.duplicate_placeholder")}`}
              />
            ),
            title: `${t("duplicate")} '${appName}'`,
            confirmLoading: confirmLoading,
            onOk: () => {
              setConfirmLoading(true)
              return new Promise((resolve) => {
                Api.request(
                  {
                    url: `/api/v1/apps/${appId}/duplicate`,
                    method: "POST",
                  },
                  (response) => {
                    dispatch(
                      dashboardAppActions.addDashboardAppReducer({
                        app: response.data,
                      }),
                    )

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                  (failure) => {
                    Message.error(t("dashboard.app.duplicate_fail"))

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                  (crash) => {
                    Message.error(t("network_error"))

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                )
              })
            },
          })
        }}
      >
        {t("duplicate")}
      </div>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-red-03`),
        )}
        onClick={() => {
          Api.request(
            {
              url: `/api/v1/apps/${appId}`,
              method: "DELETE",
            },
            (response) => {
              dispatch(
                dashboardAppActions.removeDashboardAppReducer(
                  response.data.appId,
                ),
              )

              Message.success(t("dashboard.app.trash_success"))
            },
            (failure) => {
              Message.success(t("dashboard.app.trash_failure"))
            },
            (crash) => {
              Message.error(t("network_error"))
            },
          )
        }}
      >
        {t("move_to_trash")}
      </div>
    </div>
  )
}

DashboardItemMenu.displayName = "DashboardItemMenu"
