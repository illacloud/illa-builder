import { getCurrentUser } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { PasswordSettingProps } from "../interface"
import PCChangePassword from "./changePassword"
import PCSetPassword from "./setPassword"

export const PasswordSettingContent: FC<PasswordSettingProps> = (props) => {
  const {
    passwordLoading,
    onCountDownChange,
    onPasswordFormSubmit,
    onResetPasswordSubmit,
    sendEmail,
    showCountDown,
    errorMsg,
  } = props
  const userInfo = useSelector(getCurrentUser)
  const isPasswordSet = userInfo?.isPasswordSet

  return isPasswordSet ? (
    <PCChangePassword
      onSubmit={onPasswordFormSubmit}
      loading={passwordLoading}
    />
  ) : (
    <PCSetPassword
      loading={passwordLoading}
      onSubmit={onResetPasswordSubmit}
      errorMsg={errorMsg}
      showCountDown={showCountDown}
      onCountDownChange={onCountDownChange}
      sendEmail={sendEmail}
    />
  )
}
