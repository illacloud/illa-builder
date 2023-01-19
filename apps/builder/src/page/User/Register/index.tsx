import { FC, useRef, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Checkbox,
  Countdown,
  Input,
  Link,
  Password,
  WarningCircleIcon,
  getColor,
  useMessage,
} from "@illa-design/react"
import { CloudBaseApi } from "@/api/cloudApi"
import { EMAIL_FORMAT } from "@/constants/regExp"
import { formatLanguage, languageKeys } from "@/i18n/config"
import { TextLink } from "@/page/User/components/TextLink"
import {
  checkboxTextStyle,
  descriptionStyle,
  errorIconStyle,
  errorMsgStyle,
  formLabelStyle,
  formTitleStyle,
  gridFormFieldStyle,
  gridFormStyle,
  gridItemStyle,
  gridValidStyle,
} from "@/page/User/style"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { getLocalStorage, setLocalStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import { RegisterFields, RegisterResult } from "./interface"

export function getLocalLanguage(): string {
  const lang = getLocalStorage("i18nextLng")
  const finalLang = formatLanguage(lang)
  return finalLang
}

export const Register: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const message = useMessage()
  const [showCountDown, setShowCountDown] = useState(false)
  const vt = useRef<string>("")
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
    CloudBaseApi.request<RegisterResult>(
      {
        method: "POST",
        url: "/auth/signup",
        data: {
          verificationToken: vt.current,
          language: getLocalLanguage(),
          ...data,
        },
      },
      (res) => {
        message.success({
          content: t("user.sign_up.tips.success"),
        })
        const token = res.headers["illa-token"]
        if (!token) return
        setLocalStorage("token", token, -1)
        dispatch(
          currentUserActions.updateCurrentUserReducer({
            userId: res.data.id,
            nickname: res.data.nickname,
            language: res.data.language,
            email: res.data.email,
          }),
        )
        navigate("/", {
          replace: true,
        })
      },
      (res) => {
        message.error({
          content: t("user.sign_up.tips.fail"),
        })
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
                "user.sign_up.error_message.verification_code.invalid",
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
  return (
    <form css={gridFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <header css={gridItemStyle}>
        <div css={formTitleStyle}>{t("user.sign_up.title")}</div>
        <div css={descriptionStyle}>
          <Trans
            i18nKey="user.sign_up.description.login"
            t={t}
            components={[
              <TextLink
                key="go-to-login"
                onClick={() => {
                  navigate("/user/login")
                }}
              />,
            ]}
          />
        </div>
      </header>
      <section css={gridFormFieldStyle}>
        <section css={gridItemStyle}>
          <label css={formLabelStyle}>
            {t("user.sign_up.fields.username")}
          </label>
          <div css={gridValidStyle}>
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  borderColor="techPurple"
                  size="large"
                  error={!!errors.nickname}
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
            {errors.nickname && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                {errors.nickname.message}
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
        {isCloudVersion && (
          <section css={gridItemStyle}>
            <label css={formLabelStyle}>
              {t("user.sign_up.fields.verification_code")}
            </label>
            <div css={gridValidStyle}>
              <Controller
                name="verificationCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    borderColor="techPurple"
                    maxLength={6}
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
                          valueStyle={{
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: getColor("techPurple", "01"),
                          }}
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
                              CloudBaseApi.request<{
                                verificationToken: string
                              }>(
                                {
                                  method: "POST",
                                  url: "/auth/verification",
                                  data: {
                                    email: getValues("email"),
                                    usage: "signup",
                                  },
                                },
                                (res) => {
                                  message.success({
                                    content: t(
                                      "user.sign_up.tips.verification_code",
                                    ),
                                  })
                                  vt.current = res.data.verificationToken
                                },
                                () => {
                                  message.error({
                                    content: t("user.sign_up.tips.fail_sent"),
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
                          {t("user.sign_up.actions.send")}
                        </Link>
                      ),
                    }}
                    placeholder={t(
                      "user.sign_up.placeholder.verification_code",
                    )}
                  />
                )}
                rules={{
                  required: t(
                    "user.sign_up.error_message.verification_code.require",
                  ),
                }}
              />
              {(errors.verificationCode || errorMsg.verificationCode) && (
                <div css={errorMsgStyle}>
                  <WarningCircleIcon css={errorIconStyle} />
                  {errors.verificationCode?.message ||
                    errorMsg.verificationCode}
                </div>
              )}
            </div>
          </section>
        )}
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
                  placeholder={t("user.password.placeholder")}
                />
              )}
              rules={{
                required: t("user.sign_up.error_message.password.require"),
                minLength: {
                  value: 6,
                  message: t("user.sign_in.error_message.password.min_length"),
                },
                validate: (value) => {
                  return value.includes(" ")
                    ? t("setting.password.error_password_has_empty")
                    : true
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
        loading={submitLoading}
        fullWidth
      >
        {t("user.sign_up.actions.create")}
      </Button>
    </form>
  )
}

Register.displayName = "Register"
