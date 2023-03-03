import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { CloudApi } from "@/api/cloudApi"
import { sendEmail } from "@/api/users"
import { formatLanguage } from "@/i18n/config"
import RegisterPage from "@/illa-public-component/User/register"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import {
  ILLABuilderStorage,
  getLocalStorage,
  setLocalStorage,
} from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import { RegisterFields, RegisterResult } from "./interface"

export function getLocalLanguage(): string {
  const lang = getLocalStorage("i18nextLng")
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

  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    const verificationToken =
      ILLABuilderStorage.getSessionStorage("verificationToken")
    CloudApi.request<RegisterResult>(
      {
        method: "POST",
        url: "/auth/signup",
        data: {
          verificationToken,
          language: getLocalLanguage(),
          inviteToken,
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
        if (!isCloudVersion && appID && teamIdentifier) {
          navigate(`/${teamIdentifier}/deploy/app/${appID}`)
        } else {
          navigate("/", {
            replace: true,
          })
        }
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
    <RegisterPage
      loading={submitLoading}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
      sendEmail={sendEmail}
    />
  )
}

export default UserRegister

UserRegister.displayName = "UserRegister"
