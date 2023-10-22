import { ResetPwdFields } from "@illa-public/sso-module/ResetPasswordPage/interface"
import { FC, ReactNode, createContext } from "react"
import { UseFormReturn } from "react-hook-form"
import {
  AccountSettingFields,
  PasswordSettingFields,
} from "@/page/setting/interface"

interface TeamProps {
  passwordFormProps?: UseFormReturn<PasswordSettingFields>
  accountFormProps?: UseFormReturn<AccountSettingFields>
  setPasswordFormProps?: UseFormReturn<ResetPwdFields>
}

interface Inject extends TeamProps {
  children: ReactNode
}

export const TeamContext = createContext<TeamProps>({
  passwordFormProps: {} as UseFormReturn<PasswordSettingFields>,
  accountFormProps: {} as UseFormReturn<AccountSettingFields>,
  setPasswordFormProps: {} as UseFormReturn<ResetPwdFields>,
} as TeamProps)

export const TeamProvider: FC<Inject> = (props) => {
  const { children, ...data } = props

  return (
    <TeamContext.Provider value={{ ...data }}>{children}</TeamContext.Provider>
  )
}

TeamProvider.displayName = "TeamProvider"
