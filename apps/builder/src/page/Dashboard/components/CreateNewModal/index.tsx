import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Input, Modal, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { CreateNewModalProps } from "./interface"

export const CreateNewModal: FC<CreateNewModalProps> = (props) => {
  const { visible, onVisibleChange, onCreateSuccess } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const [loading, setLoading] = useState(false)
  const message = useMessage()
  const [name, setName] = useState<string>()

  return (
    <Modal
      w="496px"
      closable
      autoFocus
      footerAlign="right"
      okButtonProps={{
        colorScheme: "techPurple",
      }}
      visible={visible}
      okLoading={loading}
      onCancel={() => {
        onVisibleChange(false)
      }}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        if (name === undefined || name === "" || name.trim() === "") {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          return
        }
        BuilderApi.teamRequest<DashboardApp>(
          {
            url: "/apps",
            method: "POST",
            data: {
              appName: name,
              initScheme: BASIC_APP_CONFIG,
            },
          },
          (response) => {
            onCreateSuccess()
            dispatch(
              dashboardAppActions.addDashboardAppReducer({
                app: response.data,
              }),
            )
            navigate(`/${teamIdentifier}/app/${response.data.appId}`)
          },
          (failure) => {},
          (error) => {},
          (loading) => {
            setLoading(loading)
          },
          (errorState) => {
            if (errorState) {
              message.error({ content: t("create_fail") })
            }
          },
        )
      }}
      title={t("dashboard.app.create_app")}
      okText={t("save")}
    >
      <Input
        colorScheme="techPurple"
        onChange={(res) => {
          setName(res)
        }}
      />
    </Modal>
  )
}
