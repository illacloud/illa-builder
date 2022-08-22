import { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Input, Password } from "@illa-design/input"
import { Button } from "@illa-design/button"
import { WarningCircleIcon } from "@illa-design/icon"
import { Link } from "@illa-design/link"
import { Message } from "@illa-design/message"
import { Countdown } from "@illa-design/statistic"
import { EMAIL_FORMAT } from "@/constants/regExp"
import { Api } from "@/api/base"
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

export const ResetPassword: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [verificationToken, setVerificationToken] = useState("")
  const [showCountDown, setShowCountDown] = useState(false)
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ResetPwdFields>({
    mode: "onSubmit",
  })
  const onSubmit: SubmitHandler<ResetPwdFields> = (data) => {
    Api.request(
      {
        method: "POST",
        url: "/auth/forgetPassword",
        data: {
          verificationToken,
          ...data,
        },
      },
      () => {
        navigate("/user/login")
        Message.success(t("user.forgot_password.tips.success"))
      },
      (res) => {
        Message.error(t("user.forgot_password.tips.fail"))
        switch (res.data.errorMessage) {
          case "no such user":
            setErrorMsg({
              ...errorMsg,
              email: t("user.forgot_password.error_message.email.registered"),
            })
            break
          case "invalid verification code":
            setErrorMsg({
              ...errorMsg,
              verificationCode: t(
                "user.forgot_password.error_message.verification_code.invalid",
              ),
            })
            break
          default:
        }
      },
      () => {
        Message.warning(t("network_error"))
      },
      (loading) => {
        setSubmitLoading(loading)
      },
    )
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
                  onChange={(value, event) => {
                    field.onChange(event)
                    if (errorMsg.email !== "") {
                      setErrorMsg({ ...errorMsg, email: "" })
                    }
                  }}
                  borderColor="techPurple"
                  size="large"
                  error={!!errors.email || !!errorMsg.email}
                  variant="fill"
                  placeholder={t("user.forgot_password.placeholder.email")}
                />
              )}
              rules={{
                required: t("user.forgot_password.error_message.email.require"),
                pattern: {
                  value: EMAIL_FORMAT,
                  message: t(
                    "user.forgot_password.error_message.email.invalid_pattern",
                  ),
                },
              }}
            />
            {(errors.email || errorMsg.email) && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.email?.message || errorMsg.email}
              </div>
            )}
          </div>
        </section>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.forgot_password.fields.verification_code")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="verificationCode"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  borderColor="techPurple"
                  onChange={(value, event) => {
                    field.onChange(event)
                    if (errorMsg.verificationCode !== "") {
                      setErrorMsg({ ...errorMsg, verificationCode: "" })
                    }
                  }}
                  size="large"
                  error={
                    !!errors.verificationCode || !!errorMsg.verificationCode
                  }
                  variant="fill"
                  suffix={{
                    render: showCountDown ? (
                      <Countdown
                        mode="builder"
                        value={Date.now() + 1000 * 60}
                        now={Date.now()}
                        format="ss"
                        onFinish={() => {
                          setShowCountDown(false)
                        }}
                      />
                    ) : (
                      <Link
                        colorScheme="techPurple"
                        hoverable={false}
                        onClick={async () => {
                          const res = await trigger("email")
                          if (res) {
                            setShowCountDown(true)
                            Api.request<{ verificationToken: string }>(
                              {
                                method: "POST",
                                url: "/auth/verification",
                                data: {
                                  email: getValues("email"),
                                  usage: "forgetpwd",
                                },
                              },
                              (res) => {
                                Message.success(
                                  t(
                                    "user.forgot_password.tips.verification_code",
                                  ),
                                )
                                setVerificationToken(res.data.verificationToken)
                              },
                              () => {
                                Message.error(
                                  t("user.forgot_password.tips.fail_sent"),
                                )
                                setShowCountDown(false)
                              },
                              () => {
                                Message.warning(t("network_error"))
                                setShowCountDown(false)
                              },
                              () => {},
                            )
                          }
                        }}
                      >
                        {t("user.forgot_password.actions.send")}
                      </Link>
                    ),
                  }}
                  placeholder={t(
                    "user.forgot_password.placeholder.verification_code",
                  )}
                />
              )}
              rules={{
                required: t(
                  "user.forgot_password.error_message.verification_code.require",
                ),
              }}
            />
            {(errors.verificationCode || errorMsg.verificationCode) && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.verificationCode?.message || errorMsg.verificationCode}
              </div>
            )}
          </div>
        </section>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.forgot_password.fields.newPassword")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  borderColor="techPurple"
                  size="large"
                  error={!!errors.newPassword}
                  variant="fill"
                  placeholder={t(
                    "user.forgot_password.placeholder.newPassword",
                  )}
                />
              )}
              rules={{
                required: t(
                  "user.forgot_password.error_message.newPassword.require",
                ),
                maxLength: {
                  value: 20,
                  message: t(
                    "user.forgot_password.error_message.newPassword.length",
                  ),
                },
                minLength: {
                  value: 6,
                  message: t(
                    "user.forgot_password.error_message.newPassword.length",
                  ),
                },
              }}
            />
            {errors.newPassword && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.newPassword.message}
              </div>
            )}
          </div>
        </section>
      </section>
      <section>
        <Button
          colorScheme="techPurple"
          size="large"
          loading={submitLoading}
          fullWidth
        >
          {t("user.forgot_password.actions.reset")}
        </Button>
      </section>
    </form>
  )
}

ResetPassword.displayName = "ResetPassword"
