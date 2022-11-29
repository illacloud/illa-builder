import { FC } from "react"
import {
  navBarLogoStyle,
  navBarStyle,
  navBarTabStyle,
} from "@/page/Setting/style"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export const SettingNavBar: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div css={navBarStyle}>
      <Logo
        css={navBarLogoStyle}
        onClick={() => {
          navigate("/")
        }}
      />
      <span css={navBarTabStyle} onClick={() => navigate("/dashboard/apps")}>
        {t("apps")}
      </span>
      <span
        css={navBarTabStyle}
        onClick={() => navigate("/dashboard/resources")}
      >
        {t("resources")}
      </span>
    </div>
  )
}

SettingNavBar.displayName = "SettingNavBar"
