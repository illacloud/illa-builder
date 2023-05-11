import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Divider,
  DownIcon,
  Dropdown,
  TabPane,
  Tabs,
  globalColor,
  illaPrefix,
  useMessage,
} from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { canManage } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { Avatar } from "@/page/App/components/Avatar"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { fetchLogout } from "@/services/auth"
import { ILLABuilderStorage } from "@/utils/storage"
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

interface PageLoadingProps {
  loadingCallBack?: (loading: boolean) => void
}

const SettingTrigger: FC<PageLoadingProps> = (props) => {
  const { loadingCallBack } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userInfo = useSelector(getCurrentUser)
  const message = useMessage()

  const handleClickLogout = async () => {
    loadingCallBack?.(true)
    try {
      await fetchLogout()
      ILLABuilderStorage.clearLocalStorage()
      navigate("/login", {
        replace: true,
      })
    } catch (e) {
      message.error({
        content: t("logout_failed"),
      })
    }
    loadingCallBack?.(false)
  }

  const handleClickOnSetting = () => {
    navigate(`../setting`)
  }

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
        <div css={settingItemStyle} onClick={handleClickOnSetting}>
          {t("Setting")}
        </div>
        <div css={settingItemStyle} onClick={handleClickLogout}>
          {t("Logout")}
        </div>
      </div>
    </div>
  )
}

export const DashboardTitleBar: FC<PageLoadingProps> = (props) => {
  const { loadingCallBack } = props

  const { t } = useTranslation()
  const userInfo = useSelector(getCurrentUser)
  const teamInfo = useSelector(getCurrentTeamInfo)
  let navigate = useNavigate()
  let location = useLocation()
  let pathList = location.pathname.split("/")

  const canEditApp = canManage(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.APP,
    ACTION_MANAGE.EDIT_APP,
  )

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
      hidden: !canEditApp,
    },
    {
      key: "members",
      title: t("user_management.page.member"),
      hidden: isCloudVersion,
    },
    {
      key: "tutorial",
      title: t("editor.tutorial.panel.tutorial.tab.title"),
      hidden: !canEditApp,
    },
  ]

  return (
    <Tabs
      prefix={
        <div css={navBarLogoContainerStyle} key="prefix">
          <Logo
            onClick={() => {
              if (isCloudVersion) {
                window.location.href = `//${import.meta.env.VITE_CLOUD_URL}`
              } else {
                navigate(`./apps`)
              }
            }}
          />
        </div>
      }
      suffix={
        isCloudVersion ? null : (
          <div css={navBarAvatarContainerStyle} key="suffix">
            <Dropdown
              position="bottom-end"
              trigger="click"
              triggerProps={{ closeDelay: 0, openDelay: 0, zIndex: 2 }}
              dropList={<SettingTrigger loadingCallBack={loadingCallBack} />}
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
          case "tutorial":
            navigate(`./tutorial`)
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
