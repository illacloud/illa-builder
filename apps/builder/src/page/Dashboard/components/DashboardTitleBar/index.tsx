import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  Divider,
  DownIcon,
  Dropdown,
  TabPane,
  Tabs,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { canAccess } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { Avatar } from "@/page/App/components/Avatar"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { ILLARoute } from "@/router"
import { clearLocalStorage } from "@/utils/storage"
import { isCloudVersion } from "@/utils/typeHelper"
import {
  containerStyle,
  expandStyle,
  navBarAvatarContainerStyle,
  navBarLogoContainerStyle,
  settingBodyStyle,
  settingItemStyle,
  settingListStyle,
  settingUserStyle,
  usernameStyle,
} from "./style"

const SettingTrigger: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userInfo = useSelector(getCurrentUser)
  return (
    <div css={settingBodyStyle}>
      <div css={settingUserStyle}>
        <Avatar
          userId={userInfo.userId}
          nickname={userInfo.nickname}
          avatar={userInfo?.avatar}
        />
        <span css={usernameStyle}>{userInfo?.nickname}</span>
      </div>
      <Divider />
      <div css={settingListStyle}>
        <div
          css={settingItemStyle}
          onClick={() => {
            navigate("/setting")
          }}
        >
          {t("Setting")}
        </div>
        <div
          css={settingItemStyle}
          onClick={() => {
            clearLocalStorage()
            ILLARoute.navigate("/login", {
              replace: true,
            })
          }}
        >
          {t("Logout")}
        </div>
      </div>
    </div>
  )
}

export const DashboardTitleBar: FC = () => {
  const { t } = useTranslation()
  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)
  const { teamIdentifier } = useParams()
  let navigate = useNavigate()
  let location = useLocation()
  let pathList = location.pathname.split("/")

  const tabs: {
    key: string
    title: string
    hidden?: boolean
  }[] = [
    {
      key: "apps",
      title: t("apps"),
    },
    {
      key: "resources",
      title: t("resources"),
      hidden: !canAccess(
        teamInfo?.myRole ?? USER_ROLE.VIEWER,
        ATTRIBUTE_GROUP.RESOURCE,
        ACTION_ACCESS.VIEW,
      ),
    },
    {
      key: "members",
      title: t("user_management.page.member"),
      hidden: isCloudVersion,
    },
  ]

  return (
    <Tabs
      prefix={
        <div css={navBarLogoContainerStyle} key="prefix">
          <Logo onClick={() => navigate(`/${teamIdentifier}/dashboard/apps`)} />
        </div>
      }
      suffix={
        isCloudVersion ? null : (
          <div css={navBarAvatarContainerStyle} key="suffix">
            <Dropdown
              position="bottom-end"
              trigger="click"
              triggerProps={{ closeDelay: 0, openDelay: 0 }}
              dropList={<SettingTrigger />}
            >
              <div>
                <Avatar
                  userId={userInfo?.userId}
                  nickname={userInfo?.nickname}
                  avatar={userInfo?.avatar}
                />
                <DownIcon
                  _css={expandStyle}
                  size="12px"
                  color={globalColor(`--${illaPrefix}-grayBlue-05`)}
                />
              </div>
            </Dropdown>
          </div>
        )
      }
      activeKey={pathList[pathList.length - 1]}
      css={containerStyle}
      withoutContent
      colorScheme="grayBlue"
      size="large"
      onChange={(key) => {
        switch (key) {
          case "apps":
            navigate("./apps")
            break
          case "resources":
            navigate("./resources")
            break
          case "members":
            navigate(`./members`)
            break
        }
      }}
    >
      {tabs.map((item) => {
        if (item.hidden) return null
        return <TabPane title={item.title} key={item.key} />
      })}
    </Tabs>
  )
}

DashboardTitleBar.displayName = "DashboardTitleBar"
