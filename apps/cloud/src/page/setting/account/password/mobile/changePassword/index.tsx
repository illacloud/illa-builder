import { FC, useContext, useMemo } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Button, Password } from "@illa-design/react"
import { TeamContext } from "@/page/setting/context"
import { PasswordSettingFields } from "@/page/setting/interface"
import SettingMobileLayout from "@/page/setting/layout/mobile"
import { controllerContainerStyle, formContainerStyle } from "../style"
import { PasswordSettingMobileProps } from "./interface"
import { errorMsgStyle, mobileInputStyle, submitButtonStyle } from "./style"

const MobileChangePassword: FC<PasswordSettingMobileProps> = (props) => {
  const { t } = useTranslation()
  const { passwordFormProps } = useContext(TeamContext)
  const { onSubmit, loading } = props
  const { handleSubmit, control, formState, getValues, watch } =
    passwordFormProps as UseFormReturn<PasswordSettingFields>

  const { currentPassword, newPassword, confirmPassword } = watch()

  const disabled = useMemo(() => {
    return !(currentPassword && newPassword && confirmPassword)
  }, [currentPassword, newPassword, confirmPassword])

  return (
    <SettingMobileLayout>
      <form onSubmit={handleSubmit?.(onSubmit)} css={formContainerStyle}>
        <section css={controllerContainerStyle}>
          <label>{t("profile.setting.current_pwd")}</label>
          <div>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  _css={mobileInputStyle}
                  size="large"
                  error={!!formState?.errors.currentPassword}
                  variant="fill"
                  placeholder={t("profile.setting.password_placeholder")}
                  colorScheme="techPurple"
                />
              )}
              rules={{
                required: t("profile.setting.password_empty"),
                minLength: {
                  value: 6,
                  message: t("profile.setting.password_length"),
                },
                maxLength: {
                  value: 20,
                  message: t("profile.setting.password_length"),
                },
              }}
            />
            {formState?.errors.currentPassword && (
              <div css={errorMsgStyle}>
                {formState?.errors.currentPassword?.message}
              </div>
            )}
          </div>
        </section>
        <section css={controllerContainerStyle}>
          <label>{t("profile.setting.new_pwd")}</label>
          <div>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  _css={mobileInputStyle}
                  size="large"
                  error={!!formState?.errors.newPassword}
                  variant="fill"
                  placeholder={t("profile.setting.new_password_placeholder")}
                  colorScheme="techPurple"
                />
              )}
              rules={{
                required: t("profile.setting.new_password_empty"),
                minLength: {
                  value: 6,
                  message: t("profile.setting.password_length"),
                },
                maxLength: {
                  value: 20,
                  message: t("profile.setting.password_length"),
                },
              }}
            />
            {formState?.errors.newPassword && (
              <div css={errorMsgStyle}>
                {formState?.errors.newPassword?.message}
              </div>
            )}
          </div>
        </section>
        <section css={controllerContainerStyle}>
          <label>{t("profile.setting.confirm_pwd")}</label>
          <div>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  _css={mobileInputStyle}
                  size="large"
                  error={!!formState?.errors.confirmPassword}
                  variant="fill"
                  placeholder={t(
                    "profile.setting.new_password_again_placeholder",
                  )}
                  colorScheme="techPurple"
                />
              )}
              rules={{
                validate: (value) =>
                  value === getValues?.("newPassword") ||
                  t("profile.setting.password_not_match"),
              }}
            />
            {formState?.errors.confirmPassword && (
              <div css={errorMsgStyle}>
                {formState?.errors.confirmPassword?.message}
              </div>
            )}
          </div>
        </section>
        <Button
          _css={submitButtonStyle}
          colorScheme="techPurple"
          size="large"
          loading={loading}
          disabled={disabled}
          fullWidth
        >
          {t("profile.setting.save")}
        </Button>
      </form>
    </SettingMobileLayout>
  )
}

MobileChangePassword.displayName = "PasswordSettingMobile"

export default MobileChangePassword
