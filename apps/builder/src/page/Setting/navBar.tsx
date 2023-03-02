import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import {
  navBarLogoStyle,
  navBarStyle,
  navBarTabStyle,
} from "@/page/Setting/style"

export const SettingNavBar: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { teamIdentifier } = useParams()

  return (
    <div css={navBarStyle}>
      <Logo css={navBarLogoStyle} onClick={() => navigate(`./`)} />
      <span
        css={navBarTabStyle}
        onClick={() => navigate(`/${teamIdentifier}/dashboard/apps`)}
      >
        {t("apps")}
      </span>
      <span
        css={navBarTabStyle}
        onClick={() => navigate(`/${teamIdentifier}/dashboard/resources`)}
      >
        {t("resources")}
      </span>
      <span
        css={navBarTabStyle}
        onClick={() => navigate(`/${teamIdentifier}/dashboard/members`)}
      >
        {t("members")}
      </span>
    </div>
  )
}

SettingNavBar.displayName = "SettingNavBar"
