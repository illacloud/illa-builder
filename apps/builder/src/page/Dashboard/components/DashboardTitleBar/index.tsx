import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import {
  USER_ROLE,
  getCurrentTeamInfo,
  getCurrentUser,
  getPlanUtils,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { isCloudVersion } from "@illa-public/utils"
import { debounce } from "lodash"
import { FC, ReactNode, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
  Divider,
  DownIcon,
  Dropdown,
  Search,
  TabPane,
  Tabs,
  globalColor,
  illaPrefix,
  useMessage,
} from "@illa-design/react"
import { ReactComponent as Logo } from "@/assets/illa-logo.svg"
import { Avatar } from "@/page/App/components/Avatar"
import { fetchLogout } from "@/services/auth"
import { track } from "@/utils/mixpanelHelper"
import { ILLABuilderStorage } from "@/utils/storage"
import {
  aiAgentBetaStyle,
  containerStyle,
  expandStyle,
  navBarAvatarContainerStyle,
  navBarLogoContainerStyle,
  settingBodyStyle,
  settingItemStyle,
  settingListStyle,
  settingUserStyle,
  tabsContainer,
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
      // clear redux
      window.location.href = "/login"
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
          userID={userInfo.userID}
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

  const currentActiveKey = pathList[pathList.length - 1]

  const canEditApp = canManage(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(teamInfo),
    ACTION_MANAGE.EDIT_APP,
  )

  const [searchParams, setSearchParams] = useSearchParams()

  const tabs: {
    key: string
    title: string
    hidden?: boolean
    tabsItemActiveColorScheme?: string
    tabsItemColorScheme?: string
    tabsItemAfter?: ReactNode
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
      hidden: isCloudVersion || !canEditApp,
    },
    {
      key: "ai-agents",
      title: t("user_management.page.ai-agent"),
      hidden: !isCloudVersion,
      tabsItemActiveColorScheme:
        "linear-gradient(90deg, #853DFF 0%, #E13EFF 100%)",
      tabsItemColorScheme: "linear-gradient(90deg, #853DFF 0%, #E13EFF 100%)",
      tabsItemAfter: <div css={aiAgentBetaStyle}>Beta</div>,
    },
    {
      key: "tutorial",
      title: t("editor.tutorial.panel.tutorial.tab.title"),
      hidden: !canEditApp,
    },
  ]

  const debounceSearchKeywords = useRef(
    debounce(
      (params: URLSearchParams, pageName: ILLA_MIXPANEL_BUILDER_PAGE_NAME) => {
        setSearchParams(params)
        track(ILLA_MIXPANEL_EVENT_TYPE.REQUEST, pageName, {
          element: "search",
          parameter1: params.get("list") ?? "team",
          parameter3: params.get("keywords"),
        })
      },
      160,
      { leading: false },
    ),
  )

  const handleSearchFocus = (pageName: ILLA_MIXPANEL_BUILDER_PAGE_NAME) => {
    track(ILLA_MIXPANEL_EVENT_TYPE.FOCUS, pageName, {
      element: "search",
    })
  }

  return (
    <div css={tabsContainer}>
      <Tabs
        withoutBorderLine
        prefix={
          <div css={navBarLogoContainerStyle} key="prefix">
            <Logo
              onClick={() => {
                if (isCloudVersion) {
                  window.location.href = `${import.meta.env.ILLA_CLOUD_URL}`
                } else {
                  navigate(`./apps`)
                }
              }}
            />
          </div>
        }
        suffix={
          <div css={navBarAvatarContainerStyle}>
            {!isCloudVersion && (
              <Dropdown
                position="bottom-end"
                trigger="click"
                triggerProps={{ closeDelay: 0, openDelay: 0, zIndex: 2 }}
                dropList={<SettingTrigger loadingCallBack={loadingCallBack} />}
              >
                <div>
                  <Avatar
                    userID={userInfo?.userID}
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
            )}
            {currentActiveKey === "apps" && (
              <Search
                pd="0px 24px"
                w="240px"
                colorScheme="techPurple"
                defaultValue={searchParams.get("keywords") ?? ""}
                onFocus={() =>
                  handleSearchFocus(ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP)
                }
                onChange={(v) => {
                  if (v === "" || v === undefined) {
                    searchParams.delete("keywords")
                  } else {
                    searchParams.set("keywords", v)
                  }
                  debounceSearchKeywords.current(
                    searchParams,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.APP,
                  )
                }}
                placeholder={t("dashboard.search")}
                allowClear
              />
            )}
            {currentActiveKey === "ai-agents" && (
              <Search
                pd="0px 24px"
                w="240px"
                colorScheme="techPurple"
                defaultValue={searchParams.get("keywords") ?? ""}
                onFocus={() =>
                  handleSearchFocus(
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
                  )
                }
                onChange={(v) => {
                  if (v === "" || v === undefined) {
                    searchParams.delete("keywords")
                  } else {
                    searchParams.set("keywords", v)
                  }
                  debounceSearchKeywords.current(
                    searchParams,
                    ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
                  )
                }}
                placeholder={t("dashboard.search")}
                allowClear
              />
            )}
          </div>
        }
        activeKey={currentActiveKey}
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
            case "ai-agents":
              navigate(`./ai-agents`)
              break
            case "tutorial":
              navigate(`./tutorial`)
              break
          }
        }}
      >
        {tabs.map((item) => {
          if (item.hidden) return null
          return (
            <TabPane
              title={item.title}
              key={item.key}
              tabsItemAfter={item.tabsItemAfter}
              tabsItemActiveColorScheme={item.tabsItemActiveColorScheme}
              tabsItemColorScheme={item.tabsItemColorScheme}
            />
          )
        })}
      </Tabs>
    </div>
  )
}

DashboardTitleBar.displayName = "DashboardTitleBar"
