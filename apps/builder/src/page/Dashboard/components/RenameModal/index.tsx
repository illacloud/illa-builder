import { FC, useState } from "react"
import { RenameModalProps } from "@/page/Dashboard/components/RenameModal/interface"
import { Input } from "@illa-design/input"
import { Modal } from "@illa-design/modal"
import { useTranslation } from "react-i18next"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { Api } from "@/api/base"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { useMessage } from "@illa-design/message"

export const RenameModal: FC<RenameModalProps> = (props) => {
  const { appId, visible, onVisibleChange } = props

  const app = useSelector((state: RootState) => {
    return state.dashboard.dashboardApps.list.find(
      (item) => item.appId === appId,
    )
  })!!

  const appList = useSelector(getDashboardApps)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(app?.appName)
  const message = useMessage()

  return (
    <Modal
      simple
      closable
      autoFocus
      footerAlign="right"
      visible={visible}
      title={t("dashboard.app.rename_app")}
      okButtonProps={{
        colorScheme: "techPurple",
      }}
      confirmLoading={loading}
      onCancel={() => {
        onVisibleChange(false)
      }}
      okText={t("save")}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        if (name === "") {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          return
        }
        if (appList.some((item) => item.appName === name)) {
          message.error({
            content: t("dashboard.app.name_existed"),
          })
          return
        }
        Api.request(
          {
            url: `/apps/${app.appId}`,
            method: "PUT",
            data: {
              appName: name,
            },
          },
          (response) => {
            dispatch(
              dashboardAppActions.renameDashboardAppReducer({
                appId: app.appId,
                newName: name,
              }),
            )
            message.success({
              content: t("dashboard.app.rename_success"),
            })
            onVisibleChange(false)
          },
          (failure) => {
            message.error({
              content: t("dashboard.app.rename_fail"),
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
    >
      <Input
        borderColor="techPurple"
        placeholder={app?.appName}
        autoFocus
        defaultValue={app?.appName}
        onChange={(name) => {
          setName(name)
        }}
      />
    </Modal>
  )
}

RenameModal.displayName = "RenameModal"
