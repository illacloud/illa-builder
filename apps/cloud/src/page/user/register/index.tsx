import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import RegisterPage from "@illa-public/sso-module/RegisterPage"
import {
  RegisterErrorMsg,
  RegisterFields,
} from "@illa-public/sso-module/RegisterPage/interface"
import { setAuthToken } from "@illa-public/utils"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { fetchSendVerificationCodeToEmail } from "@/api/auth"
import { getLocalLanguage } from "@/i18n"
import { fetchSignUp } from "@/services/auth"
import { ILLACloudStorage } from "@/utils/storage"

const UserRegister: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const message = useMessage()
  const [searchParams] = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<RegisterErrorMsg>({
    email: "",
    verificationCode: "",
  })

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    const verificationToken = ILLACloudStorage.getSessionStorage(
      "verificationToken",
    ) as string
    const inviteToken = searchParams.get("inviteToken")
    try {
      setLoading(true)
      const res = await fetchSignUp({
        inviteToken,
        verificationToken,
        language: getLocalLanguage(),
        ...data,
      })
      const token = res.headers["illa-token"]
      if (!token) return
      message.success({
        content: t("page.user.sign_up.tips.success"),
      })
      setAuthToken(token)
      searchParams.delete("inviteToken")
      navigate(
        `/${searchParams.toString() ? "?" + searchParams.toString() : ""}`,
      )
    } catch (e) {
      if (isILLAAPiError(e)) {
        switch (e?.data?.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_EMAIL_HAS_BEEN_TAKEN:
            message.error({
              content: t("page.user.sign_up.error_message.email.registered"),
            })
            break
          case ERROR_FLAG.ERROR_FLAG_VALIDATE_VERIFICATION_CODE_FAILED:
            message.error({
              content: t(
                "page.user.sign_up.error_message.verification_code.invalid",
              ),
            })
            break
          default:
            message.error({
              content: t("page.user.sign_up.tips.fail"),
            })
            break
        }
        switch (e.data.errorMessage) {
          case "duplicate email address":
            setErrorMsg({
              ...errorMsg,
              email: t("page.user.sign_up.error_message.email.registered"),
            })
            break
          case "invalid verification code":
            setErrorMsg({
              ...errorMsg,
              verificationCode: t(
                "page.user.sign_up.error_message.verification_code.invalid",
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
      await fetchSendVerificationCodeToEmail(email, "signup")
    } catch (e) {}
  }

  return (
    <RegisterPage
      loading={loading}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
      sendEmail={handleSendEmail}
    />
  )
}

export default UserRegister
