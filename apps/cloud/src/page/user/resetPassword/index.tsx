import { isILLAAPiError } from "@illa-public/illa-net"
import ResetPasswordPage from "@illa-public/sso-module/ResetPasswordPage"
import {
  ResetPwdErrorMsg,
  ResetPwdFields,
} from "@illa-public/sso-module/ResetPasswordPage/interface"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { fetchSendVerificationCodeToEmail } from "@/api/auth"
import { fetchUpdatePasswordFromForgot } from "@/services/auth"
import { ILLACloudStorage } from "@/utils/storage"

const ResetPassword: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const message = useMessage()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<ResetPwdErrorMsg>({
    email: "",
    verificationCode: "",
  })

  const onSubmit: SubmitHandler<ResetPwdFields> = async (data) => {
    const verificationToken = ILLACloudStorage.getSessionStorage(
      "verificationToken",
    ) as string
    setLoading(true)
    try {
      await fetchUpdatePasswordFromForgot({
        verificationToken,
        ...data,
      })
      navigate("/login")
      message.success({
        content: t("page.user.forgot_password.tips.success"),
      })
    } catch (e) {
      if (isILLAAPiError(e)) {
        message.error({
          content: t("page.user.forgot_password.tips.fail"),
        })
        switch (e.data.errorMessage) {
          case "no such user":
            setErrorMsg({
              ...errorMsg,
              email: t(
                "page.user.forgot_password.error_message.email.registered",
              ),
            })
            break
          case "invalid verification code":
            setErrorMsg({
              ...errorMsg,
              verificationCode: t(
                "page.user.forgot_password.error_message.verification_code.invalid",
              ),
            })
            break
          default:
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async (email: string) => {
    try {
      await fetchSendVerificationCodeToEmail(email, "forgetpwd")
    } catch (e) {}
  }

  return (
    <ResetPasswordPage
      loading={loading}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
      sendEmail={handleSendEmail}
    />
  )
}

export default ResetPassword
