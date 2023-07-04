import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  Button,
  Input,
  Modal,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { applyConfigItemLabelText } from "@/page/App/components/ControlledElement/style"
import { AppSettingModalProps } from "@/page/Dashboard/components/AppSettingModal/interface"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { fetchChangeAppSetting } from "@/services/apps"
import { track } from "@/utils/mixpanelHelper"
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
  const { appInfo, visible, onVisibleChange } = props

  const { control, formState, handleSubmit } = useForm<AppSettingFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      appName: appInfo?.appName ?? "",
      description: appInfo?.config?.description ?? "",
    },
  })

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const message = useMessage()

  const onSubmit = async (data: AppSettingFields) => {
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP, {
      element: "rename_modal_save",
      parameter5: appInfo.appId,
    })

    setLoading(true)
    fetchChangeAppSetting(appInfo.appId, data.appName, data.description)
      .then(
        () => {
          dispatch(
            dashboardAppActions.renameDashboardAppReducer({
              appId: appInfo.appId,
              newName: data.appName,
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
  }

  return (
    <Modal
      closable
      autoFocus={false}
      footer={false}
      footerAlign="right"
      visible={visible}
      title={t("new_dashboard.app_setting.app_setting")}
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
            parameter5: appInfo.appId,
          },
        )
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
                    placeholder={t("page.user.sign_up.placeholder.username")}
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
                    placeholder={t("page.user.sign_up.placeholder.email")}
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
