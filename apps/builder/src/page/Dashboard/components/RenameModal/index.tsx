import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, Modal, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { RenameModalProps } from "@/page/Dashboard/components/RenameModal/interface"
import { getDashboardApps } from "@/redux/dashboard/apps/dashboardAppSelector"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { RootState } from "@/store"

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
      }}
      okText={t("save")}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        if (name === "" || name.trim() === "") {
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
        BuilderApi.teamRequest(
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
        colorScheme="techPurple"
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
