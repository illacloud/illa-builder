import { FC } from "react"
import { PasswordSettingProps } from "../interface"
import MobileChangePassword from "./changePassword"

export const MobilePasswordSettingContent: FC<PasswordSettingProps> = (
  props,
) => {
  const { passwordLoading, onPasswordFormSubmit } = props

  return (
    <MobileChangePassword
      onSubmit={onPasswordFormSubmit}
      loading={passwordLoading}
    />
  )
}
