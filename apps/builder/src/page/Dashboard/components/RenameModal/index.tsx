import { FC, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, Modal, useMessage } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { RenameModalProps } from "@/page/Dashboard/components/RenameModal/interface"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { updateAppConfig } from "@/services/apps"
import { RootState } from "@/store"
import { track } from "@/utils/mixpanelHelper"

export const RenameModal: FC<RenameModalProps> = (props) => {
  const { appId, visible, onVisibleChange } = props

  const app = useSelector((state: RootState) => {
    return state.dashboard.dashboardApps.list.find(
      (item) => item.appId === appId,
    )
  })!!

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const nameRef = useRef(app?.appName ?? "")
  const message = useMessage()

  return (
    <Modal
      closable
      autoFocus
      footerAlign="right"
      visible={visible}
      title={t("dashboard.app.rename_app")}
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
            element: "rename_modal_close",
            parameter3: nameRef.current?.length ?? 0,
            parameter5: appId,
          },
        )
      }}
      okText={t("save")}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "rename_modal_save", parameter5: appId },
        )
        if (
          nameRef.current == undefined ||
          nameRef.current === "" ||
          nameRef.current.trim() === ""
        ) {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          track(
            ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "rename_modal_save",
              parameter2: "failed",
              parameter3: t("dashboard.app.name_empty"),
              parameter5: appId,
            },
          )
          return
        }
        track(
          ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "rename_modal_save",
            parameter2: "suc",
            parameter5: appId,
          },
        )
        setLoading(true)
        updateAppConfig(app.appId, {
          appName: nameRef.current,
        })
          .then(
            () => {
              dispatch(
                dashboardAppActions.renameDashboardAppReducer({
                  appId: app.appId,
                  newName: nameRef.current,
                }),
              )
              message.success({
                content: t("dashboard.app.rename_success"),
              })
              onVisibleChange(false)
            },
            () => {
              message.error({
                content: t("dashboard.app.rename_fail"),
              })
            },
          )
          .finally(() => {
            setLoading(false)
          })
      }}
    >
      <Input
        colorScheme="techPurple"
        placeholder={app?.appName}
        autoFocus
        defaultValue={app?.appName}
        onChange={(name) => {
          nameRef.current = name
        }}
      />
    </Modal>
  )
}

RenameModal.displayName = "RenameModal"
