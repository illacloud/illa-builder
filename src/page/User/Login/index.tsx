import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation, Trans } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Input, Password } from "@illa-design/input"
import { Checkbox } from "@illa-design/checkbox"
import { Button } from "@illa-design/button"
import { WarningCircleIcon } from "@illa-design/icon"
import { EMAIL_FORMAT } from "@/constants/regExp"
import {
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  descriptionStyle,
  gridValidStyle,
  errorMsgStyle,
  errorIconStyle,
  checkboxTextStyle,
  forgotPwdStyle,
  forgotPwdContainerStyle,
} from "@/page/User/style"
import { TextLink } from "@/page/User/components/TextLink"
import { LoginFields } from "./interface"

export const Login: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    console.log(data)
  }
  return (
    <form css={gridFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={gridItemStyle}>
        <div css={formTitleStyle}>{t("user.sign_in.title")}</div>
        <div css={descriptionStyle}>
          <Trans
            i18nKey="user.sign_in.description.register"
            t={t}
            components={[
              <TextLink
                onClick={() => {
                  navigate("/user/register")
                }}
              />,
            ]}
          />
        </div>
      </header>
      <section css={gridFormFieldStyle}>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>{t("user.sign_in.fields.email")}</label>
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
                  placeholder={t("user.sign_in.placeholder.email")}
                />
              )}
              rules={{
                required: t("user.sign_in.error_message.email.require"),
                pattern: {
                  value: EMAIL_FORMAT,
                  message: t(
                    "user.sign_in.error_message.email.invalid_pattern",
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
          <div css={forgotPwdContainerStyle}>
            <label css={formLabelStyle}>
              {t("user.sign_in.fields.password")}
            </label>
            <TextLink
              css={forgotPwdStyle}
              onClick={() => {
                navigate("/user/forgotPassword")
              }}
            >
              {t("user.sign_in.description.forgot_password")}
            </TextLink>
          </div>
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
                  placeholder={t("user.sign_in.placeholder.password")}
                />
              )}
              rules={{
                required: t("user.sign_in.error_message.password.require"),
                maxLength: {
                  value: 20,
                  message: t("user.sign_in.error_message.password.length"),
                },
                minLength: {
                  value: 6,
                  message: t("user.sign_in.error_message.password.length"),
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
                i18nKey="user.sign_in.description.policy"
                t={t}
                components={[<TextLink />, <TextLink />]}
              />
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
          {t("user.sign_in.actions.login")}
        </Button>
      </section>
    </form>
  )
}

Login.displayName = "Login"
