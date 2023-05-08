import { Global } from "@emotion/react"
import { FC, useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useMessage } from "@illa-design/react"
import { ERROR_FLAG } from "@/api/errorFlag"
import LoginPage from "@/illa-public-component/User/login"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { translateSearchParamsToURLPathWithSelfHost } from "@/router/utils/translateQS"
import { fetchSignIn } from "@/services/auth"
import { mobileAdaptationStyle } from "@/style"
import { ILLABuilderStorage } from "@/utils/storage"
import { isCloudVersion, isILLAAPiError } from "@/utils/typeHelper"
import { LoginFields } from "./interface"

const UserLogin: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ email: "", password: "" })
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const message = useMessage()
  const onSubmit: SubmitHandler<LoginFields> = async (requestBody) => {
    setSubmitLoading(true)
    try {
      const res = await fetchSignIn(requestBody)
      const token = res.headers["illa-token"]
      if (!token) return
      ILLABuilderStorage.setLocalStorage("token", token, -1)
      dispatch(
        currentUserActions.updateCurrentUserReducer({
          userId: res.data.id,
          nickname: res.data.nickname,
          language: res.data.language || "en-US",
          email: res.data.email,
          avatar: res.data.avatar,
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
      message.success({
        content: t("user.sign_in.tips.success"),
      })
    } catch (error) {
      if (isILLAAPiError(error)) {
        switch (error.data.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_SIGN_IN_FAILED:
            setErrorMsg({
              ...errorMsg,
              password: t("user.sign_in.error_message.password.incorrect"),
            })
            break
          default:
            message.error({
              content: t("user.sign_in.tips.fail"),
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
      <LoginPage
        loading={submitLoading}
        errorMsg={errorMsg}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default UserLogin

UserLogin.displayName = "UserLogin"
