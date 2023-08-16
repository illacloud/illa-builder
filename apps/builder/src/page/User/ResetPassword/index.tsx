import { Global } from "@emotion/react"
import {
  ILLA_MIXPANEL_PUBLIC_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { ResetPasswordPage } from "@illa-public/sso-module"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { fetchUpdatePassword } from "@/services/auth"
import { sendEmail } from "@/services/users"
import { mobileAdaptationStyle } from "@/style"
import { track } from "@/utils/mixpanelHelper"
import { ILLABuilderStorage } from "@/utils/storage"
import { isILLAAPiError } from "@/utils/typeHelper"
import { ResetPwdFields } from "./interface"

const ResetPassword: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const message = useMessage()

  const onSubmit: SubmitHandler<ResetPwdFields> = async (data) => {
    const verificationToken = ILLABuilderStorage.getSessionStorage(
      "verificationToken",
    ) as string
    setSubmitLoading(true)
    try {
      await fetchUpdatePassword({
        verificationToken,
        ...data,
      })
      navigate("/login")
      message.success({
        content: t("user.forgot_password.tips.success"),
      })
    } catch (e) {
      if (isILLAAPiError(e)) {
        message.error({
          content: t("user.forgot_password.tips.fail"),
        })
        switch (e.data.errorMessage) {
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
            break
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
    return sendEmail(email, "forgetpwd")
  }

  return (
    <MixpanelTrackProvider
      basicTrack={track}
      pageName={ILLA_MIXPANEL_PUBLIC_PAGE_NAME.FORGET_PASSWORD}
    >
      <Global styles={mobileAdaptationStyle} />
      <ResetPasswordPage
        loading={submitLoading}
        errorMsg={errorMsg}
        onSubmit={onSubmit}
        sendEmail={handleSendEmail}
      />
    </MixpanelTrackProvider>
  )
}

export default ResetPassword

ResetPassword.displayName = "ResetPassword"
