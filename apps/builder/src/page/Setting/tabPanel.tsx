import { css } from "@emotion/react"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { PreviousIcon, TabPane, Tabs } from "@illa-design/react"
import { SettingLayout } from "@/page/Setting/Components/Layout"
import {
  backAreaStyle,
  preIconStyle,
  tabPreTextStyle,
  tabPrefixStyle,
  tabSuffixStyle,
} from "@/page/Setting/style"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"

export const SettingTabNavBar: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const pathList = location.pathname.split("/")
  const key = pathList[pathList.length - 1]
  const teamInfo = useSelector(getCurrentTeamInfo)
  const teamIdentifier = teamInfo?.identifier
  const TabItems = [
    {
      title: t("setting.account.title"),
      key: "account",
    },
    {
      title: t("setting.password.title"),
      key: "password",
    },
    {
      title: t("setting.other.title"),
      key: "others",
    },
  ]

  const prefixTabs = (
    <div key="tab-prefix" css={tabPrefixStyle}>
      <div
        css={backAreaStyle}
        onClick={() => {
          navigate(`/${teamIdentifier}/dashboard`)
        }}
      >
        <PreviousIcon css={preIconStyle} />
        <span css={tabPreTextStyle}>{t("back")}</span>
      </div>
    </div>
  )

  const suffixTabs = (
    <div css={css(tabPrefixStyle, tabSuffixStyle)} key="tab-suffix">
      <div css={backAreaStyle}>
        <PreviousIcon css={preIconStyle} />
        <span css={tabPreTextStyle}>{t("back")}</span>
      </div>
    </div>
  )

  return (
    <>
      <Tabs
        prefix={prefixTabs}
        suffix={suffixTabs}
        activeKey={key}
        colorScheme="grayBlue"
        size="large"
        withoutContent
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
        {TabItems.map((item) => (
          <TabPane title={item.title} key={item.key}></TabPane>
        ))}
      </Tabs>
      <SettingLayout>
        <Outlet />
      </SettingLayout>
    </>
  )
}
