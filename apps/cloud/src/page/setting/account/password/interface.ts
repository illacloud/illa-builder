import {
  ResetPwdErrorMsg,
  ResetPwdFields,
} from "@illa-public/sso-module/ResetPasswordPage/interface"
import { SubmitHandler } from "react-hook-form"

export interface PasswordSettingFields {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type PasswordSettingErrorMsg = Partial<
  Record<keyof PasswordSettingFields, string>
>
export interface PasswordSettingProps {
  onPasswordFormSubmit: SubmitHandler<PasswordSettingFields>
  passwordLoading: boolean
  onResetPasswordSubmit: SubmitHandler<ResetPwdFields>
  showCountDown: boolean
  errorMsg: ResetPwdErrorMsg
  onCountDownChange: (showCountDown: boolean) => void
  sendEmail: (email: string) => void
}
