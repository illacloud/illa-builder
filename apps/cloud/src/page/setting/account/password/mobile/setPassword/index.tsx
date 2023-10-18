import {
  errorMsgStyle,
  mobileInputStyle,
} from "@illa-public/sso-module/LoginPage/mobile/style"
import {
  errorIconStyle,
  gridValidStyle,
} from "@illa-public/sso-module/LoginPage/pc/style"
import {
  ResetProps,
  ResetPwdFields,
} from "@illa-public/sso-module/ResetPasswordPage/interface"
import { EmailCode } from "@illa-public/sso-module/components/EmailCode"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Button, Input, Password, WarningCircleIcon } from "@illa-design/react"
import SettingMobileLayout from "@/page/setting/layout/mobile"
import { controllerContainerStyle, formContainerStyle } from "../style"

const MobileSetPassword: FC<ResetProps> = (props) => {
  const {
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const { t } = useTranslation()
  const { handleSubmit, control, formState } = useFormContext<ResetPwdFields>()

  return (
    <SettingMobileLayout>
      <form onSubmit={handleSubmit(onSubmit)} css={formContainerStyle}>
        <section css={controllerContainerStyle}>
          <label>
            {t("page.user.forgot_password.fields.verification_code")}
          </label>
          <div>
            <Controller
              name="verificationCode"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  _css={mobileInputStyle}
                  colorScheme="techPurple"
                  maxLength={6}
                  size="large"
                  error={
                    !!formState?.errors.verificationCode ||
                    !!errorMsg.verificationCode
                  }
                  variant="fill"
                  suffix={
                    <EmailCode
                      usage="forgetpwd"
                      showCountDown={showCountDown}
                      onCountDownChange={onCountDownChange}
                      sendEmail={sendEmail}
                    />
                  }
                  placeholder={t(
                    "page.user.forgot_password.error_message.verification_code.require",
                  )}
                />
              )}
              rules={{
                required: t(
                  "page.user.forgot_password.error_message.verification_code.require",
                ),
              }}
            />
            {formState?.errors.verificationCode && (
              <div css={errorMsgStyle}>
                {formState?.errors.verificationCode?.message}
              </div>
            )}
          </div>
        </section>
        <section css={controllerContainerStyle}>
          <label> {t("page.user.sign_up.fields.password")}</label>
          <div css={gridValidStyle}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  _css={mobileInputStyle}
                  colorScheme="techPurple"
                  size="large"
                  error={!!formState?.errors.newPassword}
                  variant="fill"
                  placeholder={t("page.user.password.placeholder")}
                />
              )}
              rules={{
                required: t(
                  "page.user.forgot_password.error_message.newPassword.require",
                ),
                minLength: {
                  value: 6,
                  message: t(
                    "page.user.sign_in.error_message.password.min_length",
                  ),
                },
              }}
            />
            {formState?.errors.newPassword && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {formState?.errors.newPassword.message}
              </div>
            )}
          </div>
        </section>
        <Button
          colorScheme="techPurple"
          size="large"
          loading={loading}
          disabled={false}
          fullWidth
        >
          {t("profile.setting.save")}
        </Button>
      </form>
    </SettingMobileLayout>
  )
}

MobileSetPassword.displayName = "SetPasswordMobile"

export default MobileSetPassword
