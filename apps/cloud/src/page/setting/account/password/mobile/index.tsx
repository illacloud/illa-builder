import { getCurrentUser } from "@illa-public/user-data"
import { FC } from "react"
import { useSelector } from "react-redux"
import { PasswordSettingProps } from "../interface"
import MobileChangePassword from "./changePassword"
import MobileSetPassword from "./setPassword"

export const MobilePasswordSettingContent: FC<PasswordSettingProps> = (
  props,
) => {
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
  const isPasswordSetted = userInfo?.isPasswordSet

  return isPasswordSetted ? (
    <MobileChangePassword
      onSubmit={onPasswordFormSubmit}
      loading={passwordLoading}
    />
  ) : (
    <MobileSetPassword
      loading={passwordLoading}
      onSubmit={onResetPasswordSubmit}
      errorMsg={errorMsg}
      showCountDown={showCountDown}
      onCountDownChange={onCountDownChange}
      sendEmail={sendEmail}
    />
  )
}
