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
  return (
    <div css={containerStyle}>
      <aside css={asideStyle}>
        <Logo css={logoStyle} />
        <section css={introductionStyle}>{t("user.description")}</section>
      </aside>
      <div css={contentStyle}>
        <Outlet />
      </div>
    </div>
  )
}

UserLogin.displayName = "UserLogin"
