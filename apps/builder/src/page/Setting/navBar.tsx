import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import {
  navBarLogoStyle,
  navBarStyle,
  navBarTabStyle,
} from "@/page/Setting/style"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"

export const SettingNavBar: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { teamIdentifier = teamInfo?.identifier } = useParams()
  const canEditApp = canManage(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

  return (
    <div css={navBarStyle}>
      <Logo css={navBarLogoStyle} onClick={() => navigate(`./`)} />
      <span
        css={navBarTabStyle}
        onClick={() => navigate(`/${teamIdentifier}/dashboard/apps`)}
      >
        {t("apps")}
      </span>
      {canEditApp && (
        <span
          css={navBarTabStyle}
          onClick={() => navigate(`/${teamIdentifier}/dashboard/resources`)}
        >
          {t("resources")}
        </span>
      )}
      <span
        css={navBarTabStyle}
        onClick={() => navigate(`/${teamIdentifier}/dashboard/members`)}
      >
        {t("user_management.page.member")}
      </span>
      {canEditApp && (
        <span
          css={navBarTabStyle}
          onClick={() => navigate(`/${teamIdentifier}/dashboard/tutorial`)}
        >
          {t("editor.tutorial.panel.tutorial.tab.title")}
        </span>
      )}
    </div>
  )
}

SettingNavBar.displayName = "SettingNavBar"
