import { MobileAppCardItem, TeamContentEmpty } from "@illa-public/dashboard"
import { useTranslation } from "react-i18next"
import { Divider, Search } from "@illa-design/react"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { MobileDashboardHeader } from "@/page/workspace/components/Header"
import { useSearch } from "@/page/workspace/hooks"
import { useAppList } from "@/services/swr/app"
import { useDividerLine } from "../../layout/hook"
import { appContainerStyle, cardContainerStyle } from "./style"

export const MobileAppWorkspace = () => {
  const { data, isLoading } = useAppList()
  const { t } = useTranslation()

  const [appList, handleChangeSearch] = useSearch(data ?? [], [
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
      ) : appList.length > 0 ? (
        <>
          {dividerShown && <Divider direction="horizontal" />}
          <div css={cardContainerStyle} onScroll={onContainerScroll}>
            {appList.map((appInfo) => (
              <MobileAppCardItem
                key={appInfo.appId}
                appName={appInfo.appName}
                description={appInfo.config.description}
                appDeployed={appInfo.deployed}
                appActivity={appInfo.appActivity}
                appID={appInfo.appId}
                publishedToMarketplace={appInfo.config.publishedToMarketplace}
                editorInfo={appInfo.editedBy}
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
