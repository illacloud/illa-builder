import { FC } from "react"
import { PasswordSettingProps } from "../interface"
import PCChangePassword from "./changePassword"

export const PasswordSettingContent: FC<PasswordSettingProps> = (props) => {
  const { passwordLoading, onPasswordFormSubmit } = props

  return (
    <PCChangePassword
      onSubmit={onPasswordFormSubmit}
      loading={passwordLoading}
    />
  )
}
