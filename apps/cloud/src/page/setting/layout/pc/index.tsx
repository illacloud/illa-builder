import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { PreviousIcon } from "@illa-design/react"
import ProfileIcon from "@/assets/page/setting/profile.svg?react"
import { Menu } from "@/components/Menu"
import { SettingLayoutProps } from "./interface"
import {
  asideMenuStyle,
  backIconStyle,
  layoutWrapperStyle,
  leftAsideWrapperStyle,
  menuContainerStyle,
  menuWrapperTittleStyle,
  navWrapperStyle,
  rightAsideWrapperStyle,
  rightSectionContainerStyle,
} from "./style"

const SettingLayout: FC<SettingLayoutProps> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)!

  const accountOptions = [
    {
      path: "/setting/account",
      label: t("profile.setting.personal_info"),
      icon: <></>,
    },
    {
      path: "/setting/password",
      label: t("profile.setting.password.title"),
      icon: <></>,
    },
    {
      path: "/setting/language",
      label: t("profile.setting.language"),
      icon: <></>,
    },
  ]

  return (
    <div css={layoutWrapperStyle}>
      <aside css={leftAsideWrapperStyle}>
        <div css={navWrapperStyle}>
          <PreviousIcon
            css={backIconStyle}
            onClick={() => {
              navigate(`/workspace/${currentTeamInfo?.identifier}`)
            }}
          />
          {t("profile.setting.title")}
        </div>
        <div css={asideMenuStyle}>
          <div>
            <div css={menuWrapperTittleStyle}>
              <ProfileIcon />
              <span>{t("profile.setting.group.account")}</span>
            </div>
            <div css={menuContainerStyle}>
              <Menu
                itemList={accountOptions}
                containerClassName="settingMenuClass"
                itemClassName="settingMenuItemClass"
              />
            </div>
          </div>
        </div>
      </aside>
      <aside css={rightAsideWrapperStyle}>
        <section css={rightSectionContainerStyle}>{children}</section>
      </aside>
    </div>
  )
}

SettingLayout.displayName = "AccountLayout"

export default SettingLayout
