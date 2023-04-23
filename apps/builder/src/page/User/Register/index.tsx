import { Global } from "@emotion/react"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { formatLanguage } from "@/i18n/config"
import RegisterPage from "@/illa-public-component/User/register"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
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
  const appID = searchParams.get("appID")
  const teamIdentifier = searchParams.get("teamIdentifier")

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
      if (!isCloudVersion && appID && teamIdentifier) {
        navigate(`/${teamIdentifier}/deploy/app/${appID}`)
      } else {
        navigate("/", {
          replace: true,
        })
      }
    } catch (error) {
      if (isILLAAPiError(error)) {
        message.error({
          content: t("user.sign_up.tips.fail"),
        })
        switch (error.data.errorMessage) {
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
        return
      }
      message.warning({
        content: t("network_error"),
      })
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
