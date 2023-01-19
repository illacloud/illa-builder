import { FC, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Input,
  Password,
  WarningCircleIcon,
  useMessage,
} from "@illa-design/react"
import { AuthApi } from "@/api/cloudApi"
import { EMAIL_FORMAT } from "@/constants/regExp"
import { TextLink } from "@/page/User/components/TextLink"
import {
  descriptionStyle,
  errorIconStyle,
  errorMsgStyle,
  forgotPwdContainerStyle,
  forgotPwdStyle,
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
} from "@/page/User/style"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { setLocalStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import { LoginFields } from "./interface"

export const Login: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    mode: "onSubmit",
  })

  const message = useMessage()
  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    AuthApi.request<CurrentUser>(
      { method: "POST", url: "/auth/signin", data },
      (res) => {
        const token = res.headers["illa-token"]
        if (!token) return
        setLocalStorage("token", token, -1)
        dispatch(
          currentUserActions.updateCurrentUserReducer({
            userId: res.data.userId,
            nickname: res.data.nickname,
            language: res.data.language || "en-US",
            email: res.data.email,
          }),
        )
        navigate(location.state?.from?.pathname ?? "/", {
          replace: true,
        })
        message.success({
          content: t("user.sign_in.tips.success"),
        })
      },
      (res) => {
        message.error({
          content: t("user.sign_in.tips.fail"),
        })
        switch (res.data.errorMessage) {
          case "no such user":
            setErrorMsg({
              ...errorMsg,
              email: t("user.sign_in.error_message.email.registered"),
            })
            break
          case "invalid password":
            setErrorMsg({
              ...errorMsg,
              password: t("user.sign_in.error_message.password.incorrect"),
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
                key="text-link"
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
                  onChange={(value, event) => {
                    field.onChange(event)
                    if (errorMsg.email !== "") {
                      setErrorMsg({ ...errorMsg, email: "" })
                    }
                  }}
                  size="large"
                  error={!!errors.email || !!errorMsg.email}
                  variant="fill"
                  placeholder={t("user.sign_in.placeholder.email")}
                  borderColor="techPurple"
                />
              )}
              rules={{
                required: t("user.sign_in.error_message.email.require"),
                validate: (value: string) => {
                  if (isCloudVersion && !EMAIL_FORMAT.test(value)) {
                    return t("user.sign_up.error_message.email.invalid_pattern")
                  }
                  return value === "root"
                    ? true
                    : EMAIL_FORMAT.test(value)
                    ? true
                    : t("user.sign_up.error_message.email.invalid_pattern")
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
                  onChange={(event) => {
                    field.onChange(event)
                    if (errorMsg.password !== "") {
                      setErrorMsg({ ...errorMsg, password: "" })
                    }
                  }}
                  size="large"
                  error={!!errors.password || !!errorMsg.password}
                  variant="fill"
                  placeholder={t("user.password.placeholder")}
                  borderColor="techPurple"
                />
              )}
              rules={{
                required: t("user.sign_in.error_message.password.require"),
                minLength: {
                  value: 6,
                  message: t("user.sign_in.error_message.password.min_length"),
                },
              }}
            />
            {(errors.password || errorMsg.password) && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.password?.message || errorMsg.password}
              </div>
            )}
          </div>
        </section>
      </section>
      <Button
        colorScheme="techPurple"
        size="large"
        loading={submitLoading}
        fullWidth
      >
        {t("user.sign_in.actions.login")}
      </Button>
    </form>
  )
}

Login.displayName = "Login"
