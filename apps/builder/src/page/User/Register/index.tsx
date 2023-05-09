import { Global } from "@emotion/react"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ERROR_FLAG } from "@/api/errorFlag"
import { formatLanguage } from "@/i18n/config"
import RegisterPage from "@/illa-public-component/User/register"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { translateSearchParamsToURLPathWithSelfHost } from "@/router/utils/translateQS"
import { fetchSignUp } from "@/services/auth"
import { sendEmail } from "@/services/users"
import { mobileAdaptationStyle } from "@/style"
import { ILLABuilderStorage } from "@/utils/storage"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"
import { RegisterFields } from "./interface"

export function getLocalLanguage(): string {
  const lang = window.localStorage.getItem("i18nextLng") || "en-US"
  const finalLang = formatLanguage(lang)
  return finalLang
}

const UserRegister: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const message = useMessage()
  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("inviteToken")
  const location = useLocation()

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    const verificationToken =
      ILLABuilderStorage.getSessionStorage("verificationToken")
    setSubmitLoading(true)
    try {
      const res = await fetchSignUp({
        verificationToken,
        language: getLocalLanguage(),
        inviteToken,
        ...data,
      })
      message.success({
        content: t("user.sign_up.tips.success"),
      })
      const token = res.headers["illa-token"]
      if (!token) return
      ILLABuilderStorage.setLocalStorage("token", token, -1)
      dispatch(
        currentUserActions.updateCurrentUserReducer({
          ...res.data,
          userId: res.data.id,
          nickname: res.data.nickname,
          language: res.data.language,
          email: res.data.email,
        }),
      )
      if (!isCloudVersion) {
        const urlSearchParams = new URLSearchParams(location.search)
        const path = translateSearchParamsToURLPathWithSelfHost(urlSearchParams)
        navigate(`${path}`)
      } else {
        navigate(location.state?.from ?? "/", {
          replace: true,
        })
      }
    } catch (error) {
      if (isILLAAPiError(error)) {
        switch (error.data.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_EMAIL_HAS_BEEN_TAKEN:
            setErrorMsg({
              ...errorMsg,
              email: t("user.sign_up.error_message.email.registered"),
            })
            break
          default:
            message.error({
              content: t("user.sign_up.tips.fail"),
            })
        }
      } else {
        message.warning({
          content: t("network_error"),
        })
      }
    }
    setSubmitLoading(false)
  }

  return (
    <>
      <Global styles={mobileAdaptationStyle} />
      <RegisterPage
        loading={submitLoading}
        errorMsg={errorMsg}
        onSubmit={onSubmit}
        sendEmail={sendEmail}
      />
    </>
  )
}

export default UserRegister

UserRegister.displayName = "UserRegister"
