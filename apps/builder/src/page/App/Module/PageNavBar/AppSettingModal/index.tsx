import { FC, useCallback } from "react"
import { Controller, useForm, useFormState } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Button,
  CloseIcon,
  Input,
  Modal,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import { AppSettingModalProps } from "@/page/App/Module/PageNavBar/AppSettingModal/interface"
import { applyConfigItemLabelText } from "@/page/App/components/Actions/ControlledElement/style"
import { appInfoActions } from "@/redux/currentApp/appInfo/appInfoSlice"
import { updateAppConfig } from "@/services/apps"
import {
  closeIconHotSpotStyle,
  formLabelStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
  modalHeaderWrapperStyle,
  modalTitleStyle,
  modalWrapperStyle,
} from "./style"

export interface AppSettingFields {
  appName: string
  description?: string
}

export const AppSettingModal: FC<AppSettingModalProps> = (props) => {
  const { appInfo, visible, onVisibleChange, onSaveEvent, onCloseEvent } = props

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

  const { isSubmitting, isDirty } = useFormState({
    control,
  })

  const { t } = useTranslation()
  const { appId } = useParams()
  const dispatch = useDispatch()

  const message = useMessage()

  const onSubmit = useCallback(
    async (data: AppSettingFields) => {
      try {
        onSaveEvent()
        const res = await updateAppConfig(appInfo.appId, {
          description: data.description,
          appName: data.appName,
        })
        if (res.data.appId === appId) {
          dispatch(appInfoActions.updateAppInfoReducer(res.data))
        }
        reset({
          appName: data.appName,
          description: data.description,
        })
        message.success({
          content: t("dashboard.app.rename_success"),
        })
      } catch (error) {
        message.error({
          content: t("dashboard.app.rename_fail"),
        })
      }
      onVisibleChange(false)
    },
    [
      onVisibleChange,
      onSaveEvent,
      appInfo.appId,
      dispatch,
      appId,
      reset,
      message,
      t,
    ],
  )

  return (
    <Modal
      maskClosable
      withoutPadding
      w="528px"
      visible={visible}
      footer={false}
      onCancel={() => {
        onCloseEvent()
        onVisibleChange(false)
      }}
    >
      <div css={modalWrapperStyle}>
        <header css={modalHeaderWrapperStyle}>
          <h3 css={modalTitleStyle}>
            {t("new_dashboard.app_setting.app_setting")}
          </h3>
          <span
            css={closeIconHotSpotStyle}
            onClick={() => {
              onCloseEvent()
              onVisibleChange(false)
            }}
          >
            <CloseIcon />
          </span>
        </header>
        <form
          css={gridFormStyle}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section css={gridFormFieldStyle}>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("new_dashboard.app_setting.app_name")}
                <span css={applyConfigItemLabelText(getColor("red", "03"))}>
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
                      placeholder={t(
                        "new_dashboard.app_setting.placeholder.app_name",
                      )}
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
                      autoSize={{ minRows: 6 }}
                      colorScheme="techPurple"
                      error={!!formState?.errors.description}
                      placeholder={t(
                        "new_dashboard.app_setting.placeholder.description",
                      )}
                    />
                  )}
                />
              </div>
            </section>
          </section>
          <Button
            colorScheme="techPurple"
            loading={isSubmitting}
            disabled={!isDirty}
            fullWidth
          >
            {t("save")}
          </Button>
        </form>
      </div>
    </Modal>
  )
}

AppSettingModal.displayName = "AppSettingModal"
