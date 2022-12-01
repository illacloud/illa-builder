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
} from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { ILLARoute } from "@/router"
import { clearLocalStorage } from "@/utils/storage"
import {
  applyUserAvatarStyle,
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

const SettingTrigger: FC<{
  avatarBgColor: string
  avatarText: string
}> = (props) => {
  const { avatarBgColor, avatarText } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userInfo = useSelector(getCurrentUser)
  return (
    <div css={settingBodyStyle}>
      <div css={settingUserStyle}>
        <span css={applyUserAvatarStyle(avatarBgColor)}>{avatarText}</span>
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
            ILLARoute.navigate("/user/login", {
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
  const avatarBgColor =
    `${userInfo?.userId}`.padEnd(6, "0").substring(0, 6) || "654aec"
  const avatarText = userInfo?.nickname?.substring?.(0, 1).toUpperCase() || "U"
  let navigate = useNavigate()
  let location = useLocation()
  let pathList = location.pathname.split("/")
  const tabs: {
    key: string
    title: string
  }[] = [
    {
      key: "apps",
      title: t("apps"),
    },
    {
      key: "resources",
      title: t("resources"),
    },
  ]

  return (
    <Tabs
      prefix={
        <div css={navBarLogoContainerStyle} key="prefix">
          <Logo
            onClick={() => {
              navigate("/")
            }}
          />
        </div>
      }
      suffix={
        <div css={navBarAvatarContainerStyle} key="suffix">
          <Dropdown
            position="bottom-end"
            trigger="click"
            triggerProps={{ closeDelay: 0, openDelay: 0 }}
            dropList={
              <SettingTrigger
                avatarBgColor={avatarBgColor}
                avatarText={avatarText}
              />
            }
          >
            <div>
              <span css={applyUserAvatarStyle(avatarBgColor)}>
                {avatarText}
              </span>
              <DownIcon
                _css={expandStyle}
                size="12px"
                color={globalColor(`--${illaPrefix}-grayBlue-05`)}
              />
            </div>
          </Dropdown>
        </div>
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
        }
      }}
    >
      {tabs.map((item) => {
        return <TabPane title={item.title} key={item.key} />
      })}
    </Tabs>
  )
}

DashboardTitleBar.displayName = "DashboardTitleBar"
