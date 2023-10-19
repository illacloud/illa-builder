import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { LoginPage } from "@illa-public/sso-module"
import { LoginFields } from "@illa-public/sso-module/LoginPage/interface"
import { setAuthToken } from "@illa-public/utils"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { fetchSignIn } from "@/services/auth"

export type LoginErrorMsg = Record<keyof LoginFields, string>

const UserLogin: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<LoginErrorMsg>({
    email: "",
    password: "",
  })

  const message = useMessage()
  const [searchParams] = useSearchParams()

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    setLoading(true)
    try {
      const response = await fetchSignIn(data)
      const token = response.headers["illa-token"]
      if (!token) return
      setAuthToken(token)
      message.success({
        content: t("page.user.sign_in.tips.success"),
      })

      navigate(
        `/${searchParams.toString() ? "?" + searchParams.toString() : ""}`,
      )
    } catch (e) {
      if (isILLAAPiError(e)) {
        switch (e?.data?.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_PASSWORD_INVALIED:
          case ERROR_FLAG.ERROR_FLAG_SIGN_IN_FAILED:
            message.error({
              content: t("page.user.sign_in.tips.fail_account"),
            })
            break
          default:
            message.error({
              content: t("page.user.sign_in.tips.fail"),
            })
            break
        }
        switch (e.data.errorMessage) {
          case "no such user":
            setErrorMsg({
              ...errorMsg,
              email: t("page.user.sign_in.error_message.email.registered"),
            })
            break
          case "invalid password":
            setErrorMsg({
              ...errorMsg,
              password: t("page.user.sign_in.error_message.password.incorrect"),
            })
            break
          default:
        }
      } else {
        message.warning({
          content: t("network_error"),
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return <LoginPage loading={loading} errorMsg={errorMsg} onSubmit={onSubmit} />
}

export default UserLogin
