import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import ProfileIcon from "@/assets/page/setting/profile.svg?react"
import TeamIcon from "@/assets/page/setting/team.svg?react"
import { canMemberAccess } from "@/router/loader/accessUtils"
import { onClickLogout } from "@/utils/auth"
import { MobileMenuItems } from "./landingMenu"
import {
  landingMenuItemsStyle,
  landingMenuTitleStyle,
  landingTitleStyle,
} from "./style"

const MobileEntrance: FC = () => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  const notCanAccessMember = !canMemberAccess(currentTeamInfo)

  const accountOptions = [
    {
      path: "/setting/account",
      label: t("profile.setting.personal_info"),
    },
    {
      path: "/setting/password",
      label: t("profile.setting.password.title"),
    },
    {
      path: "/setting/language",
      label: t("profile.setting.language"),
    },
    {
      path: "",
      label: t("profile.setting.logout"),
      onClick: onClickLogout,
    },
  ]

  const teamOptions = [
    {
      path: `/setting/${currentTeamInfo?.identifier}/members`,
      label: t("team_setting.left_panel.member"),
      hidden: notCanAccessMember,
    },
  ]

  return (
    <>
      <div css={landingTitleStyle}>{t("profile.setting.title")}</div>
      <div css={landingMenuTitleStyle}>
        <ProfileIcon />
        <span>{t("profile.setting.group.account")}</span>
      </div>
      <MobileMenuItems itemList={accountOptions} />
      {notCanAccessMember && (
        <>
          <div css={landingMenuItemsStyle} />
          {currentTeamInfo && (
            <>
              <div css={landingMenuTitleStyle}>
                <TeamIcon />
                <span>{t("profile.setting.group.team")}</span>
              </div>
            </>
          )}
          <MobileMenuItems itemList={teamOptions} />
        </>
      )}
    </>
  )
}

MobileEntrance.displayName = "MobileEntrance"

export default MobileEntrance
