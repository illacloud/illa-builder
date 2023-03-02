import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom"
import { ReactComponent as Logo } from "@/assets/illa-logo-white.svg"
import {
  asideStyle,
  containerStyle,
  contentStyle,
  introductionStyle,
  logoStyle,
} from "./style"

export const UserLogin: FC = () => {
  const { t } = useTranslation()
  return <Outlet />
}

export default UserLogin

UserLogin.displayName = "UserLogin"
