import { ResetPwdFields } from "@illa-public/sso-module/ResetPasswordPage/interface"
import { EmailCode } from "@illa-public/sso-module/components/EmailCode"
import { FC, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Button, Input, Password, WarningCircleIcon } from "@illa-design/react"
import { Header } from "@/page/setting/components/Header"
import { ResetProps } from "./interface"
import {
  errorIconStyle,
  errorMsgStyle,
  formContainerStyle,
  formLabelStyle,
  gridFormFieldStyle,
  gridItemStyle,
  innerContainerStyle,
} from "./style"

const PCSetPassword: FC<ResetProps> = (props) => {
  const { t } = useTranslation()
  const {
    onSubmit,
    errorMsg,
    loading,
    showCountDown,
    onCountDownChange,
    sendEmail,
  } = props
  const { handleSubmit, control, formState, watch } =
    useFormContext<ResetPwdFields>()
  const { newPassword, verificationCode } = watch()

  const disabled = useMemo(() => {
    return !(newPassword && verificationCode)
  }, [newPassword, verificationCode])

  return (
    <>
      <Header title={t("profile.setting.password.title")} />
      <div css={innerContainerStyle}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          css={formContainerStyle}
        >
          <section css={gridFormFieldStyle}>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("page.user.forgot_password.fields.verification_code")}
              </label>
              <div>
                <Controller
                  name="verificationCode"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      colorScheme="techPurple"
                      maxLength={6}
                      size="large"
                      error={
                        !!formState?.errors.verificationCode ||
                        !!errorMsg.verificationCode
                      }
                      variant="fill"
                      autoComplete="off"
                      suffix={
                        <EmailCode
                          usage="forgetpwd"
                          showCountDown={showCountDown}
                          onCountDownChange={onCountDownChange}
                          sendEmail={sendEmail}
                        />
                      }
                      placeholder={t(
                        "page.user.forgot_password.placeholder.verification_code",
                      )}
                    />
                  )}
                  rules={{
                    required: t(
                      "page.user.forgot_password.error_message.verification_code.require",
                    ),
                  }}
                />
                {(formState?.errors.verificationCode ||
                  errorMsg.verificationCode) && (
                  <div css={errorMsgStyle}>
                    <WarningCircleIcon css={errorIconStyle} />
                    {formState?.errors.verificationCode?.message ||
                      errorMsg.verificationCode}
                  </div>
                )}
              </div>
            </section>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("page.user.sign_up.fields.password")}
              </label>
              <div>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <Password
                      {...field}
                      autoComplete="new-password"
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
          </section>
          <span>
            <Button
              colorScheme="techPurple"
              size="large"
              loading={loading}
              disabled={disabled}
            >
              {t("profile.setting.save")}
            </Button>
          </span>
        </form>
      </div>
    </>
  )
}

PCSetPassword.displayName = "SetPassword"

export default PCSetPassword
