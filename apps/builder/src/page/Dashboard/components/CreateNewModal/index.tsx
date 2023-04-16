import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Input, Modal, useMessage } from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import { track } from "@/utils/mixpanelHelper"
import { CreateNewModalProps } from "./interface"

const { SHOW, CLICK } = ILLA_MIXPANEL_EVENT_TYPE
const { APP } = ILLA_MIXPANEL_BUILDER_PAGE_NAME

export const CreateNewModal: FC<CreateNewModalProps> = (props) => {
  const { visible, onVisibleChange, onCreateSuccess } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const [loading, setLoading] = useState(false)
  const message = useMessage()
  const [name, setName] = useState<string>()

  useEffect(() => {
    visible && track(SHOW, APP, { element: "create_new_app_modal" })
  }, [visible])

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
        track(CLICK, APP, {
          element: "create_new_app_modal_close",
          parameter3: name?.length ?? 0,
        })
      }}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        track(CLICK, APP, { element: "create_new_app_modal_save" })
        if (name === undefined || name === "" || name.trim() === "") {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          track(CLICK, APP, {
            element: "create_new_app_modal_save",
            parameter2: "failed",
            parameter3: t("dashboard.app.name_empty"),
          })
          return
        }
        track(CLICK, APP, {
          element: "create_new_app_modal_save",
          parameter2: "suc",
          parameter3: name.length,
        })
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
