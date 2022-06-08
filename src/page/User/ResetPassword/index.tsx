import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input, Password } from "@illa-design/input"
import { Button } from "@illa-design/button"
import { WarningCircleIcon } from "@illa-design/icon"
import {
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
  errorMsgStyle,
  errorIconStyle,
} from "@/page/User/style"
import { ResetPwdFields } from "./interface"
import { Link } from "@illa-design/link"

export const ResetPassword: FC = () => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ResetPwdFields>({
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<ResetPwdFields> = (data) => {
    console.log(data)
  }
  return (
    <form css={gridFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={formTitleStyle}>{t("user.forgot_password.title")}</header>
      <section css={gridFormFieldStyle}>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.forgot_password.fields.email")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  error={!!errors.email}
                  variant="fill"
                  placeholder={t("user.forgot_password.placeholder.email")}
                />
              )}
              rules={{
                required: t("user.forgot_password.error_message.email.require"),
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: t(
                    "user.forgot_password.error_message.email.invalid_pattern",
                  ),
                },
              }}
            />
            {errors.email && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.email.message}
              </div>
            )}
          </div>
        </section>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.forgot_password.fields.verify")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="verify"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  error={!!errors.verify}
                  variant="fill"
                  suffix={{
                    render: (
                      <Link
                        colorScheme="techPurple"
                        hoverable={false}
                        onClick={async () => {
                          const res = await trigger("email")
                          if (res) {
                            // TODO send verify code
                          }
                        }}
                      >
                        {t("user.forgot_password.actions.send")}
                      </Link>
                    ),
                  }}
                  placeholder={t("user.forgot_password.placeholder.verify")}
                />
              )}
              rules={{
                required: t(
                  "user.forgot_password.error_message.verify.require",
                ),
              }}
            />
            {errors.verify && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.verify.message}
              </div>
            )}
          </div>
        </section>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.forgot_password.fields.password")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  size="large"
                  error={!!errors.password}
                  variant="fill"
                  placeholder={t("user.forgot_password.placeholder.password")}
                />
              )}
              rules={{
                required: t(
                  "user.forgot_password.error_message.password.require",
                ),
                maxLength: {
                  value: 20,
                  message: t(
                    "user.forgot_password.error_message.password.length",
                  ),
                },
                minLength: {
                  value: 6,
                  message: t(
                    "user.forgot_password.error_message.password.length",
                  ),
                },
              }}
            />
            {errors.password && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.password.message}
              </div>
            )}
          </div>
        </section>
      </section>
      <section>
        <Button
          colorScheme="techPurple"
          size="large"
          buttonRadius="8px"
          fullWidth
        >
          {t("user.forgot_password.actions.reset")}
        </Button>
      </section>
    </form>
  )
}

ResetPassword.displayName = "ResetPassword"
