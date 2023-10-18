import {
  ResetPwdErrorMsg,
  ResetPwdFields,
} from "@illa-public/sso-module/ResetPasswordPage/interface"
import { SubmitHandler } from "react-hook-form"

export interface ResetProps {
  loading: boolean
  errorMsg: ResetPwdErrorMsg
  onSubmit: SubmitHandler<ResetPwdFields>
  showCountDown: boolean
  onCountDownChange: (showCountDown: boolean) => void
  sendEmail: (email: string) => void
}
