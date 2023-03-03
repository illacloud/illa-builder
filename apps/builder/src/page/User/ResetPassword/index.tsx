import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { CloudApi } from "@/api/cloudApi"
import { sendEmail } from "@/api/users"
import ResetPasswordPage from "@/illa-public-component/User/resetPassword"
import { ILLABuilderStorage } from "@/utils/storage"
import { ResetPwdFields } from "./interface"

const ResetPassword: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", verificationCode: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const message = useMessage()

  const onSubmit: SubmitHandler<ResetPwdFields> = (data) => {
    const verificationToken =
      ILLABuilderStorage.getSessionStorage("verificationToken")
    CloudApi.request(
      {
        method: "POST",
        url: "/auth/forgetPassword",
        data: {
          verificationToken,
          ...data,
        },
      },
      () => {
        navigate("/login")
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

  return (
    <ResetPasswordPage
      loading={submitLoading}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
      sendEmail={sendEmail}
    />
  )
}

export default ResetPassword

ResetPassword.displayName = "ResetPassword"
