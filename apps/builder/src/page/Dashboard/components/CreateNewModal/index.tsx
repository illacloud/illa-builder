import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { FC, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Input, Modal, useMessage } from "@illa-design/react"
import { BASIC_APP_CONFIG } from "@/config/newAppConfig"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchCreateApp } from "@/services/apps"
import { track } from "@/utils/mixpanelHelper"
import { CreateNewModalProps } from "./interface"

export const CreateNewModal: FC<CreateNewModalProps> = (props) => {
  const { visible, onVisibleChange, onCreateSuccess } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  const [loading, setLoading] = useState(false)
  const message = useMessage()
  const newAppNameRef = useRef<string>()

  useEffect(() => {
    visible &&
      track(
        ILLA_MIXPANEL_EVENT_TYPE.SHOW,
        ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
        { element: "create_new_app_modal" },
      )
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
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "create_new_app_modal_close",
            parameter3: newAppNameRef.current?.length ?? 0,
          },
        )
      }}
      cancelText={t("dashboard.common.cancel")}
      onOk={() => {
        track(
          ILLA_MIXPANEL_EVENT_TYPE.CLICK,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          { element: "create_new_app_modal_save" },
        )
        if (
          newAppNameRef.current === undefined ||
          newAppNameRef.current === "" ||
          newAppNameRef.current.trim() === ""
        ) {
          message.error({
            content: t("dashboard.app.name_empty"),
          })
          track(
            ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
            ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
            {
              element: "create_new_app_modal_save",
              parameter2: "failed",
              parameter3: t("dashboard.app.name_empty"),
            },
          )
          return
        }
        track(
          ILLA_MIXPANEL_EVENT_TYPE.VALIDATE,
          ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
          {
            element: "create_new_app_modal_save",
            parameter2: "suc",
            parameter3: newAppNameRef.current?.length,
          },
        )
        setLoading(true)
        const requestData = {
          appName: newAppNameRef.current,
          initScheme: BASIC_APP_CONFIG,
        }
        fetchCreateApp(requestData)
          .then(
            (response) => {
              onCreateSuccess()
              dispatch(
                dashboardAppActions.addDashboardAppReducer({
                  app: response.data,
                }),
              )
              navigate(`/${teamIdentifier}/app/${response.data.appId}`)
            },
            () => {
              message.error({ content: t("create_fail") })
            },
          )
          .finally(() => {
            setLoading(false)
          })
      }}
      title={t("dashboard.app.create_app")}
      okText={t("save")}
    >
      <Input
        colorScheme="techPurple"
        onChange={(res) => {
          newAppNameRef.current = res
        }}
      />
    </Modal>
  )
}
