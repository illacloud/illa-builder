import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { CloudApi } from "@/api/cloudApi"
import LoginPage from "@/illa-public-component/User/login"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { UserInfoResponse } from "@/redux/currentUser/currentUserState"
import { setLocalStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import { LoginFields } from "./interface"

const UserLogin: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const appID = searchParams.get("appID")
  const teamIdentifier = searchParams.get("teamIdentifier")

  const message = useMessage()
  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    CloudApi.request<UserInfoResponse>(
      { method: "POST", url: "/auth/signin", data },
      (res) => {
        const token = res.headers["illa-token"]
        if (!token) return
        setLocalStorage("token", token, -1)
        dispatch(
          currentUserActions.updateCurrentUserReducer({
            userId: res.data.id,
            nickname: res.data.nickname,
            language: res.data.language || "en-US",
            email: res.data.email,
            avatar: res.data.avatar,
          }),
        )
        if (!isCloudVersion && appID && teamIdentifier) {
          navigate(`/${teamIdentifier}/deploy/app/${appID}`, {
            replace: true,
          })
        } else {
          navigate(location.state?.from ?? "/", {
            replace: true,
          })
        }
        message.success({
          content: t("user.sign_in.tips.success"),
        })
      },
      (res) => {
        message.error({
          content: t("user.sign_in.tips.fail"),
        })
        switch (res.data.errorMessage) {
          case "no such user":
            setErrorMsg({
              ...errorMsg,
              email: t("user.sign_in.error_message.email.registered"),
            })
            break
          case "invalid password":
            setErrorMsg({
              ...errorMsg,
              password: t("user.sign_in.error_message.password.incorrect"),
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
    <LoginPage
      loading={submitLoading}
      errorMsg={errorMsg}
      onSubmit={onSubmit}
    />
  )
}

export default UserLogin

UserLogin.displayName = "UserLogin"
