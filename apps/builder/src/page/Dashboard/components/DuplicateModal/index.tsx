import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, Modal, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { DuplicateModalProps } from "@/page/Dashboard/components/DuplicateModal/interface"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { RootState } from "@/store"
import { track } from "@/utils/mixpanelHelper"

export const DuplicateModal: FC<DuplicateModalProps> = (props) => {
  const { appId, visible, onVisibleChange } = props

  const app = useSelector((state: RootState) => {
    return state.dashboard.dashboardApps.list.find(
      (item) => item.appId === appId,
    )
  })

  const appList = useSelector(getDashboardApps)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const message = useMessage()

  if (!app) return null

  return (
    <Modal
      w="496px"
      closable
      autoFocus
      footerAlign="right"
      visible={visible}
      okButtonProps={{
        colorScheme: "techPurple",
      }}
      okLoading={loading}
      onCancel={() => {
        onVisibleChange(false)
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "duplicate_modal_close",
            parameter3: name?.length ?? 0,
            parameter5: appId,
          },
        )
      }}
      onOk={() => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "duplicate_modal_save", parameter5: appId },
        )
        if (name === undefined || name === "") {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          track(
            ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "duplicate_modal_save",
              parameter2: "failed",
              parameter3: t("dashboard.app.name_empty"),
              parameter5: appId,
            },
          )
          return
        }
        if (appList.some((item) => item.appName === name)) {
          message.error({
            content: t("dashboard.app.name_existed"),
          })
          track(
            ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "duplicate_modal_save",
              parameter2: "failed",
              parameter3: t("dashboard.app.name_existed"),
              parameter5: appId,
            },
          )
          return
        }
        track(
          ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "duplicate_modal_save", parameter2: "suc" },
        )
        BuilderApi.teamRequest<DashboardApp>(
          {
            url: `/apps/${app.appId}/duplication`,
            method: "POST",
            data: {
              appName: name,
            },
          },
          (response) => {
            dispatch(
              dashboardAppActions.addDashboardAppReducer({
                app: response.data,
              }),
            )
            onVisibleChange(false)
          },
          (failure) => {
            message.error({
              content: t("dashboard.app.duplicate_fail"),
            })
          },
          (crash) => {
            message.error({
              content: t("network_error"),
            })
          },
          (loading) => {
            setLoading(loading)
          },
        )
      }}
      title={`${t("duplicate")} "${app.appName}"`}
      okText={t("save")}
      cancelText={t("dashboard.common.cancel")}
    >
      <Input
        colorScheme="techPurple"
        onChange={(res) => {
          setName(res)
        }}
        placeholder={`${t("dashboard.app.duplicate_placeholder")}`}
      />
    </Modal>
  )
}

DuplicateModal.displayName = "DuplicateModal"
