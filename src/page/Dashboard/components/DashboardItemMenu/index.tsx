import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Modal } from "@illa-design/modal"
import { Message } from "@illa-design/message"
import { CloseIcon } from "@illa-design/icon"
import { Api } from "@/api/base"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { DashboardItemMenuProps } from "@/page/Dashboard/components/DashboardItemMenu/interface"
import { dashboardClossIconStyle } from "@/page/Dashboard/style"
import {
  triggerContentContainerCss,
  applyTriggerContentItemStyle,
  modalStyle,
} from "./style"

export const DashboardItemMenu: FC<DashboardItemMenuProps> = (props) => {
  const {
    appId,
    appIndex,
    showRenameModal,
    showDuplicateModal,
    setCurrentAppIdx,
  } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <div css={triggerContentContainerCss}>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-grayBlue-02`),
          globalColor(`--${illaPrefix}-techPurple-01`),
        )}
        onClick={() => {
          setCurrentAppIdx(appIndex)
          showRenameModal()
        }}
      >
        {t("rename")}
      </div>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-grayBlue-02`),
          globalColor(`--${illaPrefix}-techPurple-01`),
        )}
        onClick={() => {
          setCurrentAppIdx(appIndex)
          showDuplicateModal()
        }}
      >
        {t("duplicate")}
      </div>
      <div
        css={applyTriggerContentItemStyle(
          globalColor(`--${illaPrefix}-red-03`),
        )}
        onClick={() => {
          Modal.confirm({
            _css: modalStyle,
            title: t("dashboard.common.delete_title"),
            content: <span>{t("dashboard.common.delete_content")}</span>,
            cancelText: t("dashboard.common.delete_cancel_text"),
            okText: t("dashboard.common.delete_ok_text"),
            okButtonProps: {
              colorScheme: "techPurple",
            },
            closable: true,
            closeElement: (
              <div css={dashboardClossIconStyle}>
                <CloseIcon />
              </div>
            ),
            onOk: () => {
              Api.request<DashboardApp>(
                {
                  url: `/apps/${appId}`,
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
            },
          })
        }}
      >
        {t("dashboard.common.delete")}
      </div>
    </div>
  )
}

DashboardItemMenu.displayName = "DashboardItemMenu"
