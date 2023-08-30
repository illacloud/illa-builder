import { Global } from "@emotion/react"
import { ERROR_FLAG } from "@illa-public/illa-net/errorFlag"
import {
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { RegisterPage } from "@illa-public/sso-module"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { formatLanguage } from "@/i18n/config"
import { translateSearchParamsToURLPathWithSelfHost } from "@/router/utils/translateQS"
import { fetchSignUp } from "@/services/auth"
import { sendEmail } from "@/services/users"
import { mobileAdaptationStyle } from "@/style"
import { track } from "@/utils/mixpanelHelper"
import { ILLABuilderStorage } from "@/utils/storage"
import { isILLAAPiError } from "@/utils/typeHelper"
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
      if (!token) {
        return
      }
      ILLABuilderStorage.setLocalStorage("token", token, -1)
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
          case ERROR_FLAG.ERROR_FLAG_REGISTER_BLOCKED:
            message.error({
              content: t("user.sign_up.tips.not_allow_register"),
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

  const handleSendEmail = (email: string) => {
    return sendEmail(email, "signup")
  }

  return (
    <MixpanelTrackProvider
      basicTrack={track}
      pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.SIGNUP}
    >
      <Global styles={mobileAdaptationStyle} />
      <RegisterPage
        loading={submitLoading}
        errorMsg={errorMsg}
        onSubmit={onSubmit}
        sendEmail={handleSendEmail}
      />
    </MixpanelTrackProvider>
  )
}

export default UserRegister

UserRegister.displayName = "UserRegister"
