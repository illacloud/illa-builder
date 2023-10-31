import { FC, useContext, useMemo } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Button, Password, WarningCircleIcon } from "@illa-design/react"
import { Header } from "@/page/setting/components/Header"
import { TeamContext } from "@/page/setting/context"
import { PasswordSettingFields } from "@/page/setting/interface"
import { PasswordSettingProps } from "./interface"
import {
  formLabelStyle,
  gridFormFieldStyle,
  innerContainerStyle,
} from "./style"
import {
  errorIconStyle,
  errorMsgStyle,
  gridItemStyle,
  passwordFormContainerStyle,
} from "./style"

const PCChangePassword: FC<PasswordSettingProps> = (props) => {
  const { t } = useTranslation()
  const { passwordFormProps } = useContext(TeamContext)
  const { onSubmit, loading } = props
  const { handleSubmit, control, formState, watch } =
    passwordFormProps as UseFormReturn<PasswordSettingFields>

  const { currentPassword, newPassword, confirmPassword } = watch()

  const disabled = useMemo(() => {
    return !(currentPassword && newPassword && confirmPassword)
  }, [currentPassword, newPassword, confirmPassword])

  return (
    <>
      <Header title={t("profile.setting.password.title")} />
      <div css={innerContainerStyle}>
        <form
          onSubmit={handleSubmit?.(onSubmit)}
          css={passwordFormContainerStyle}
        >
          <section css={gridFormFieldStyle}>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("profile.setting.current_pwd")}
              </label>
              <div>
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <Password
                      {...field}
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
                    <WarningCircleIcon css={errorIconStyle} />
                    {formState?.errors.currentPassword?.message}
                  </div>
                )}
              </div>
            </section>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>{t("profile.setting.new_pwd")}</label>
              <div>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <Password
                      {...field}
                      size="large"
                      error={!!formState?.errors.newPassword}
                      variant="fill"
                      placeholder={t(
                        "profile.setting.new_password_placeholder",
                      )}
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
                    <WarningCircleIcon css={errorIconStyle} />
                    {formState?.errors.newPassword?.message}
                  </div>
                )}
              </div>
            </section>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("profile.setting.confirm_pwd")}
              </label>
              <div>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Password
                      {...field}
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
                      value === newPassword ||
                      t("profile.setting.password_not_match"),
                  }}
                />
                {formState?.errors.confirmPassword && (
                  <div css={errorMsgStyle}>
                    <WarningCircleIcon css={errorIconStyle} />
                    {formState?.errors.confirmPassword?.message}
                  </div>
                )}
              </div>
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
          </section>
        </form>
      </div>
    </>
  )
}

PCChangePassword.displayName = "PasswordSetting"

export default PCChangePassword
