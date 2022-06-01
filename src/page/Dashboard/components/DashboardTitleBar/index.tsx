import { FC } from "react"
import {
  containerStyle,
  expandStyle,
  navBarAvatarContainerStyle,
  navBarLogoContainerStyle,
} from "./style"
import { TabPane, Tabs } from "@illa-design/tabs"
import { useTranslation } from "react-i18next"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { Avatar } from "@illa-design/avatar"
import { DownIcon } from "@illa-design/icon"
import { globalColor, illaPrefix } from "@illa-design/theme"

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
  console.log(t`${pathList[pathList.length - 1]}`)
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
          <Avatar size="small" />
          <DownIcon
            css={expandStyle}
            color={globalColor(`--${illaPrefix}-grayBlue-05`)}
          />
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
