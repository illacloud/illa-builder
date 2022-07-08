import { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { Input, Password } from "@illa-design/input"
import { Checkbox } from "@illa-design/checkbox"
import { Button } from "@illa-design/button"
import { Link } from "@illa-design/link"
import { Message } from "@illa-design/message"
import { Countdown } from "@illa-design/statistic"
import { WarningCircleIcon } from "@illa-design/icon"
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
  checkboxTextStyle,
} from "@/page/User/style"
import { RegisterFields, RegisterResult } from "./interface"
import { useDispatch } from "react-redux"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { LocationState } from "@/page/User/Login/interface"
import { setLocalStorage } from "@/utils/storage"

export const Register: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [verificationToken, setVerificationToken] = useState("")
  const [showCountDown, setShowCountDown] = useState(false)
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<RegisterFields>({
    mode: "onSubmit",
    defaultValues: {
      isSubscribed: true,
    },
  })
  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    Api.request<RegisterResult>(
      {
        method: "POST",
        url: "/auth/signup",
        data: {
          verificationToken,
          language: window.navigator.language === "zh-CN" ? "zh-cn" : "en-us",
          ...data,
        },
      },
      (res) => {
        const token = res.headers["illa-token"]
        if (!token) return
        setLocalStorage("token", token, -1)
        dispatch(
          currentUserActions.updateCurrentUserReducer({
            userId: res.data.userId,
            userName: res.data.username,
            language: "English",
            userAvatar: "",
          }),
        )
        navigate((location.state as LocationState)?.from?.pathname ?? "/", {
          replace: true,
        })
        Message.success(t("user.sign_up.tips.success"))
      },
      (res) => {
        Message.error(t("user.sign_up.tips.fail"))
        switch (res.data.errorMessage) {
          case "duplicate email address":
            setErrorMsg({
              ...errorMsg,
              email: t("user.sign_up.error_message.email.registered"),
            })
            break
          case "invalid verification code":
            setErrorMsg({
              ...errorMsg,
              verificationCode: t(
                "user.sign_up.error_message.verificationCode.invalid",
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
                  borderColor="techPurple"
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
                  placeholder={t("user.sign_up.placeholder.email")}
                />
              )}
              rules={{
                required: t("user.sign_up.error_message.email.require"),
                pattern: {
                  value: EMAIL_FORMAT,
                  message: t(
                    "user.sign_up.error_message.email.invalid_pattern",
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
            {t("user.sign_up.fields.verificationCode")}
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
                        mode="builder"
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
                                data: { email: getValues("email") },
                              },
                              (res) => {
                                Message.success(
                                  t("user.sign_up.tips.verificationCode"),
                                )
                                setVerificationToken(res.data.verificationToken)
                              },
                              () => {
                                Message.error(t("user.sign_up.tips.fail_sent"))
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
                        {t("user.sign_up.actions.send")}
                      </Link>
                    ),
                  }}
                  placeholder={t("user.sign_up.placeholder.verificationCode")}
                />
              )}
              rules={{
                required: t(
                  "user.sign_up.error_message.verificationCode.require",
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
            {t("user.sign_up.fields.password")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Password
                  {...field}
                  borderColor="techPurple"
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
          <Controller
            name="isSubscribed"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                colorScheme="techPurple"
              >
                <span css={checkboxTextStyle}>
                  {t("user.sign_up.description.subscribe")}
                </span>
              </Checkbox>
            )}
          />
        </div>
      </section>
      <Button
        colorScheme="techPurple"
        size="large"
        buttonRadius="8px"
        loading={submitLoading}
        fullWidth
      >
        {t("user.sign_up.actions.create")}
      </Button>
    </form>
  )
}

Register.displayName = "Register"
