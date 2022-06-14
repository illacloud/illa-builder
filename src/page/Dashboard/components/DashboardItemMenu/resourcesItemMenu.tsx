import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Message } from "@illa-design/message"
import {
  triggerContentContainerCss,
  applyTriggerContentItemStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Api } from "@/api/base"
import { dashboardResourceActions } from "@/redux/dashboard/resources/dashboardResourceSlice"
import { DashboardResourcesItemMenuProps } from "./interface"

export const DashboardResourcesItemMenu: FC<DashboardResourcesItemMenuProps> = (
  props,
) => {
  const { appId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  return (
    <div css={triggerContentContainerCss}>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-techPurple-01`),
        )}
        onClick={() => {}}
      >
        {t("edit")}
      </div>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-red-03`),
        )}
        onClick={() => {
          Modal.confirm({
            confirmLoading: confirmLoading,
            title: t("dashboard.resources.trash_confirm_title"),
            content: (
              <div>{t("dashboard.resources.trash_confirm_content")}</div>
            ),
            onOk: () => {
              setConfirmLoading(true)
              return new Promise((resolve) => {
                Api.request(
                  {
                    url: `/api/v1/resources/${appId}`,
                    method: "DELETE",
                  },
                  (response) => {
                    dispatch(
                      dashboardResourceActions.removeResourceReducer(
                        response.data.resourceId,
                      ),
                    )
                    Message.success(t("dashboard.resources.trash_success"))

                    setConfirmLoading(false)
                    resolve("finish")
                  },
                  (failure) => {
                    Message.error(t("dashboard.resources.trash_failure"))

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
        {t("move_to_trash")}
      </div>
    </div>
  )
}

DashboardResourcesItemMenu.displayName = "DashboardResourcesItemMenu"
