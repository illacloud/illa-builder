import { FC } from "react"
import {
  applyContainerCss,
  applyExpandCss,
  applyNavBarAvatarContainerCss,
  applyNavBarLogoContainerCss,
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
    title: string
  }[] = [
    {
      title: t("apps"),
    },
    {
      title: t("resources"),
    },
  ]

  return (
    <Tabs
      prefix={
        <div css={applyNavBarLogoContainerCss} key="prefix">
          <Logo
            onClick={() => {
              navigate("/")
            }}
          />
        </div>
      }
      suffix={
        <div css={applyNavBarAvatarContainerCss} key="suffix">
          <Avatar size="small" />
          <DownIcon
            css={applyExpandCss}
            color={globalColor(`--${illaPrefix}-grayBlue-05`)}
          />
        </div>
      }
      activeKey={t(pathList[pathList.length - 1])}
      css={applyContainerCss}
      withoutContent
      colorScheme="grayBlue"
      size="large"
      onChange={(key) => {
        switch (key) {
          case t("apps"):
            navigate("./apps")
            break
          case t("resources"):
            navigate("./resources")
            break
        }
      }}
    >
      {tabs.map((item) => {
        return <TabPane title={item.title} key={item.title} />
      })}
    </Tabs>
  )
}
