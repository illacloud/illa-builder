import { MobileAppCardItem, TeamContentEmpty } from "@illa-public/dashboard"
import { USER_ROLE } from "@illa-public/public-types"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  canAccess,
} from "@illa-public/user-role-utils"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider, Search } from "@illa-design/react"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { MobileDashboardHeader } from "@/page/workspace/components/Header"
import { useSearch } from "@/page/workspace/hooks"
import { useAppList } from "@/services/swr/app"
import { useDividerLine } from "../../layout/hook"
import { appContainerStyle, cardContainerStyle } from "./style"

export const MobileAppWorkspace = () => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const canAccessApps = canAccess(
    currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.APP,
    getPlanUtils(currentTeamInfo),
    ACTION_ACCESS.VIEW,
  )
  const { data: appList = [], isLoading } = useAppList(canAccessApps)
  const { t } = useTranslation()
  const appListFilter = appList.filter((app) => app.deployed)

  const [appListResult, handleChangeSearch] = useSearch(appListFilter ?? [], [
    "appName",
    "config.description",
  ])

  const [dividerShown, onContainerScroll] = useDividerLine()

  return (
    <div css={appContainerStyle}>
      <MobileDashboardHeader
        titleName={t("page.workspace.menu.apps")}
        actionGroupComponent={
          <>
            <Search
              size="large"
              colorScheme="techPurple"
              onChange={handleChangeSearch}
              placeholder={t("dashboard.search")}
              allowClear
            />
          </>
        }
      />
      {isLoading ? (
        <FullSectionLoading />
      ) : appListResult.length > 0 ? (
        <>
          {dividerShown && <Divider direction="horizontal" />}
          <div css={cardContainerStyle} onScroll={onContainerScroll}>
            {appListResult.map((appInfo) => (
              <MobileAppCardItem
                key={appInfo.appId}
                appName={appInfo.appName}
                description={appInfo.config.description}
                appDeployed={appInfo.deployed}
                appActivity={appInfo.appActivity}
                appID={appInfo.appId}
                publishedToMarketplace={appInfo.config.publishedToMarketplace}
                editorInfo={appInfo.editedBy}
                cardType="app"
              />
            ))}
          </div>
        </>
      ) : (
        <TeamContentEmpty loading={false} showCreate={false} />
      )}
    </div>
  )
}
