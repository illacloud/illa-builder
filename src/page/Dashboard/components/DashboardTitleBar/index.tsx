import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { TabPane, Tabs } from "@illa-design/tabs"
import { Avatar } from "@illa-design/avatar"
import { DownIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Divider } from "@illa-design/divider"
import { Dropdown } from "@illa-design/dropdown"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import {
  containerStyle,
  expandStyle,
  navBarAvatarContainerStyle,
  navBarLogoContainerStyle,
  settingBodyStyle,
  settingUserStyle,
  userAvatarStyle,
  usernameStyle,
  settingItemStyle,
  settingListStyle,
} from "./style"

const SettingTrigger: FC = () => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  return (
    <div css={settingBodyStyle}>
      <div css={settingUserStyle}>
        <Avatar size="small" css={userAvatarStyle} />
        <span css={usernameStyle}>OnlyBoA</span>
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
            navigate("/user/login")
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
            position="br"
            trigger="click"
            triggerProps={{ closeDelay: 0, openDelay: 0 }}
            dropList={<SettingTrigger />}
          >
            <div>
              <Avatar colorScheme="techPurple" size="small" />
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
