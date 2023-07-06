import { FC, useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Button,
  Input,
  Modal,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import { applyConfigItemLabelText } from "@/page/App/components/ControlledElement/style"
import { AppSettingModalProps } from "@/page/Dashboard/components/AppSettingModal/interface"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { updateAppConfig } from "@/services/apps"
import {
  formLabelStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
} from "./style"

export interface AppSettingFields {
  appName: string
  description?: string
}

export const AppSettingModal: FC<AppSettingModalProps> = (props) => {
  const { appInfo, visible, onVisibleChange, onOk, onCancel } = props

  const { control, formState, handleSubmit, reset } = useForm<AppSettingFields>(
    {
      mode: "onSubmit",
      criteriaMode: "firstError",
      defaultValues: {
        appName: appInfo?.appName ?? "",
        description: appInfo?.config?.description ?? "",
      },
    },
  )

  const { t } = useTranslation()
  const { appId } = useParams()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const message = useMessage()

  const onSubmit = useCallback(
    (data: AppSettingFields) => {
      setLoading(true)
      onOk()
      updateAppConfig(appInfo.appId, {
        description: data.description,
        appName: data.appName,
      })
        .then(
          (res) => {
            dispatch(dashboardAppActions.updateDashboardAppReducer(res.data))
            if (res.data.appId === appId) {
              dispatch(appInfoActions.updateAppInfoReducer(res.data))
            }
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
    },
    [appInfo.appId, appId, dispatch, message, onOk, onVisibleChange, t],
  )

  return (
    <Modal
      closable
      autoFocus={false}
      footer={false}
      maskClosable={false}
      footerAlign="right"
      visible={visible}
      title={t("new_dashboard.app_setting.app_setting")}
      okButtonProps={{
        colorScheme: "techPurple",
      }}
      okLoading={loading}
      onCancel={() => {
        onCancel()
        onVisibleChange(false)
        reset({
          appName: appInfo?.appName ?? "",
          description: appInfo?.config?.description ?? "",
        })
      }}
      okText={t("save")}
      cancelText={t("dashboard.common.cancel")}
    >
      <form
        css={gridFormStyle}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section css={gridFormFieldStyle}>
          <section css={gridItemStyle}>
            <label css={formLabelStyle}>
              {t("new_dashboard.app_setting.app_name")}
              <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                *
              </span>
            </label>
            <div css={gridValidStyle}>
              <Controller
                name="appName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    colorScheme="techPurple"
                    error={!!formState?.errors.appName}
                    placeholder={t("Enter a name for the app")}
                  />
                )}
                rules={{
                  required: t(
                    "page.user.sign_up.error_message.username.require",
                  ),
                  maxLength: {
                    value: 280,
                    message: t(
                      "page.user.sign_up.error_message.username.length",
                    ),
                  },
                }}
              />
            </div>
          </section>
          <section css={gridItemStyle}>
            <label css={formLabelStyle}>
              {t("new_dashboard.app_setting.description")}
            </label>
            <div css={gridValidStyle}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    showWordLimit
                    maxLength={180}
                    autoSize={{ minRows: 6, maxRows: 6 }}
                    colorScheme="techPurple"
                    error={!!formState?.errors.description}
                    placeholder={t("Enter a description for the app")}
                  />
                )}
              />
            </div>
          </section>
        </section>
        <Button colorScheme="techPurple" loading={loading} fullWidth>
          {t("save")}
        </Button>
      </form>
    </Modal>
  )
}

AppSettingModal.displayName = "AppSettingModal"
