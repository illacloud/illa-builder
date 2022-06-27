import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Message } from "@illa-design/message"
import { CloseIcon } from "@illa-design/icon"
import {
  triggerContentContainerCss,
  applyTriggerContentItemStyle,
  modalStyle,
  closeIconStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { Api } from "@/api/base"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { DashboardResource } from "@/redux/resource/resourceState"
import { DashboardResourcesItemMenuProps } from "./interface"

export const DashboardResourcesItemMenu: FC<DashboardResourcesItemMenuProps> = (
  props,
) => {
  const { resourceId, showFormVisible, setCurId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [confirmLoading, setConfirmLoading] = useState(false)

  return (
    <>
      <div css={triggerContentContainerCss}>
        <div
          css={applyTriggerContentItemStyle(
            globalColor(`--${illaPrefix}-grayBlue-02`),
            globalColor(`--${illaPrefix}-techPurple-01`),
          )}
          onClick={() => {
            setCurId(resourceId)
            showFormVisible()
          }}
        >
          {t("edit")}
        </div>
        <div
          css={applyTriggerContentItemStyle(
            globalColor(`--${illaPrefix}-red-03`),
          )}
          onClick={() => {
            Modal.confirm({
              _css: modalStyle,
              confirmLoading: confirmLoading,
              title: t("dashboard.common.delete_title"),
              content: <span>{t("dashboard.common.delete_content")}</span>,
              cancelText: t("dashboard.common.delete_cancel_text"),
              okText: t("dashboard.common.delete_ok_text"),
              okButtonProps: {
                colorScheme: "techPurple",
              },
              closable: true,
              // closeElement: <div css={closeIconStyle}>
              //   <CloseIcon size="14px" />
              // </div>,
              onOk: () => {
                setConfirmLoading(true)
                return new Promise((resolve) => {
                  Api.request<DashboardResource>(
                    {
                      url: `/resources/${resourceId}`,
                      method: "DELETE",
                    },
                    (response) => {
                      dispatch(
                        resourceActions.removeResourceItemReducer(
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
          {t("dashboard.common.delete")}
        </div>
      </div>
    </>
  )
}

DashboardResourcesItemMenu.displayName = "DashboardResourcesItemMenu"
