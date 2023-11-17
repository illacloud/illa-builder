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
}
