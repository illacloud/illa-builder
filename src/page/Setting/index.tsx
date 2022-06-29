import { FC } from "react"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { TabPane, Tabs } from "@illa-design/tabs"
import { PreIcon } from "@illa-design/icon"
import {
  navBarStyle,
  navBarLogoStyle,
  navBarTabStyle,
  tabPrefixStyle,
  preIconStyle,
  tabPreTextStyle,
  tabSuffixStyle,
  backAreaStyle,
} from "./style"

export const Setting: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const pathList = location.pathname.split("/")

  const tabs: {
    key: string
    title: string
  }[] = [
    {
      key: "account",
      title: t("setting.account.title"),
    },
    {
      key: "password",
      title: t("setting.password.title"),
    },
    {
      key: "others",
      title: t("setting.other.title"),
    },
  ]

  return (
    <>
      <div css={navBarStyle}>
        <Logo
          css={navBarLogoStyle}
          onClick={() => {
            navigate("/")
          }}
        />
        <span css={navBarTabStyle} onClick={() => navigate("/dashboard/apps")}>
          {t("apps")}
        </span>
        <span
          css={navBarTabStyle}
          onClick={() => navigate("/dashboard/resources")}
        >
          {t("resources")}
        </span>
      </div>
      <Tabs
        prefix={
          <div key="prefix" css={tabPrefixStyle}>
            <div
              css={backAreaStyle}
              onClick={() => {
                navigate("/dashboard")
              }}
            >
              <PreIcon css={preIconStyle} />
              <span css={tabPreTextStyle}>back</span>
            </div>
          </div>
        }
        suffix={<div css={tabSuffixStyle}></div>}
        activeKey={pathList[pathList.length - 1]}
        withoutContent
        colorScheme="grayBlue"
        size="large"
        onChange={(key) => {
          switch (key) {
            case "account":
              navigate("./account")
              break
            case "password":
              navigate("./password")
              break
            case "others":
              navigate("./others")
              break
          }
        }}
      >
        {tabs.map((item) => {
          return <TabPane title={item.title} key={item.key} />
        })}
      </Tabs>
      <Outlet />
    </>
  )
}

Setting.displayName = "Setting"
