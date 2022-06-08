import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation, Trans } from "react-i18next"
import { Input, Password } from "@illa-design/input"
import { Checkbox } from "@illa-design/checkbox"
import { Button } from "@illa-design/button"
import { Link } from "@illa-design/link"
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
  checkboxTextStyle,
} from "@/page/User/style"
import { TextLink } from "@/page/User/components/TextLink"

import { RegisterFields } from "./interface"

export const Register: FC = () => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFields>({
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    console.log(data)
  }
  return (
    <form css={gridFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={formTitleStyle}>{t("user.sign_up.title")}</header>
      <section css={gridFormFieldStyle}>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.sign_up.fields.username")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  error={!!errors.username}
                  variant="fill"
                  placeholder={t("user.sign_up.placeholder.username")}
                />
              )}
              rules={{
                required: t("user.sign_up.error_message.username.require"),
                maxLength: {
                  value: 15,
                  message: t("user.sign_up.error_message.username.length"),
                },
                minLength: {
                  value: 3,
                  message: t("user.sign_up.error_message.username.length"),
                },
              }}
            />
            {errors.username && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.username.message}
              </div>
            )}
          </div>
        </section>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>{t("user.sign_up.fields.email")}</label>
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
                  placeholder={t("user.sign_up.placeholder.email")}
                />
              )}
              rules={{
                required: t("user.sign_up.error_message.email.require"),
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: t(
                    "user.sign_up.error_message.email.invalid_pattern",
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
          <label css={formLabelStyle}>{t("user.sign_up.fields.verify")}</label>
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
                        {t("user.sign_up.actions.send")}
                      </Link>
                    ),
                  }}
                  placeholder={t("user.sign_up.placeholder.verify")}
                />
              )}
              rules={{
                required: t("user.sign_up.error_message.verify.require"),
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
            {t("user.sign_up.fields.password")}
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
                  placeholder={t("user.sign_up.placeholder.password")}
                />
              )}
              rules={{
                required: t("user.sign_up.error_message.password.require"),
                maxLength: {
                  value: 20,
                  message: t("user.sign_up.error_message.password.length"),
                },
                minLength: {
                  value: 6,
                  message: t("user.sign_up.error_message.password.length"),
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
      <section css={gridItemStyle}>
        <div>
          <Checkbox colorScheme="techPurple">
            <span css={checkboxTextStyle}>
              <Trans
                i18nKey="user.sign_up.description.policy"
                t={t}
                components={[<TextLink />, <TextLink />]}
              />
            </span>
          </Checkbox>
        </div>
        <div>
          <Checkbox colorScheme="techPurple">
            <span css={checkboxTextStyle}>
              {t("user.sign_up.description.subscribe")}
            </span>
          </Checkbox>
        </div>
      </section>
      <section>
        <Button
          colorScheme="techPurple"
          size="large"
          buttonRadius="8px"
          fullWidth
        >
          {t("user.sign_up.actions.create")}
        </Button>
      </section>
    </form>
  )
}

Register.displayName = "Register"
