import { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Countdown,
  Input,
  Link,
  Password,
  PreIcon,
  WarningCircleIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { AuthApi } from "@/api/cloudApi"
import { EMAIL_FORMAT } from "@/constants/regExp"
import {
  errorIconStyle,
  errorMsgStyle,
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
  hotspotWrapperStyle,
  prevIconStyle,
  resetPasswordSubtitleWrapperStyle,
} from "@/page/User/style"
import { ResetPwdFields } from "./interface"

export const ResetPassword: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const message = useMessage()
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
    AuthApi.request(
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
        message.success({
          content: t("user.forgot_password.tips.success"),
        })
      },
      (res) => {
        message.error({
          content: t("user.forgot_password.tips.fail"),
        })
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
        message.warning({
          content: t("network_error"),
        })
      },
      (loading) => {
        setSubmitLoading(loading)
      },
    )
  }

  const onClickBackToLogin = () => {
    navigate("/user/login")
  }

  return (
    <form css={gridFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={formTitleStyle}>
        {t("user.forgot_password.title")}
        <div
          css={resetPasswordSubtitleWrapperStyle}
          onClick={onClickBackToLogin}
        >
          <span css={hotspotWrapperStyle}>
            <PreIcon css={prevIconStyle} />
            {t("user.forgot_password.subtitle")}
          </span>
        </div>
      </header>
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
                        value={Date.now() + 1000 * 60}
                        now={Date.now()}
                        format="ss"
                        onFinish={() => {
                          setShowCountDown(false)
                        }}
                        valueStyle={{
                          fontSize: "14px",
                          lineHeight: "22px",
                          color: getColor("techPurple", "01"),
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
                            AuthApi.request<{ verificationToken: string }>(
                              {
                                method: "POST",
                                url: "/auth/verification",
                                data: {
                                  email: getValues("email"),
                                  usage: "forgetpwd",
                                },
                              },
                              (res) => {
                                message.success({
                                  content: t(
                                    "user.forgot_password.tips.verification_code",
                                  ),
                                })
                                setVerificationToken(res.data.verificationToken)
                              },
                              () => {
                                message.error({
                                  content: t(
                                    "user.forgot_password.tips.fail_sent",
                                  ),
                                })
                                setShowCountDown(false)
                              },
                              () => {
                                message.warning({
                                  content: t("network_error"),
                                })
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
                  placeholder={t("user.password.placeholder")}
                />
              )}
              rules={{
                required: t(
                  "user.forgot_password.error_message.newPassword.require",
                ),
                minLength: {
                  value: 6,
                  message: t("user.sign_in.error_message.password.min_length"),
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
