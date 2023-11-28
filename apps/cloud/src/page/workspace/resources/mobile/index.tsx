import { ResourceCard, TeamContentEmpty } from "@illa-public/dashboard"
import { USER_ROLE } from "@illa-public/public-types"
import { getCurrentTeamInfo, getPlanUtils } from "@illa-public/user-data"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  canAccess,
} from "@illa-public/user-role-utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider, Search } from "@illa-design/react"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { MobileDashboardHeader } from "@/page/workspace/components/Header"
import { useSearch } from "@/page/workspace/hooks"
import { useResourceList } from "@/services/swr/resource"
import { useDividerLine } from "../../layout/hook"
import { getDBName } from "../utils"
import { cardContainerStyle, resourceContainerStyle } from "./style"

export const MobileResourcesWorkspace: FC = () => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  const canAccessResourceList = canAccess(
    currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.RESOURCE,
    getPlanUtils(currentTeamInfo),
    ACTION_ACCESS.VIEW,
  )
  const { data, isLoading } = useResourceList(canAccessResourceList)
  const [dividerShown, onContainerScroll] = useDividerLine()

  const [resourceList, handleChangeSearch] = useSearch(data ?? [], [
    "resourceName",
  ])

  return (
    <div css={resourceContainerStyle}>
      <MobileDashboardHeader
        titleName={t("page.workspace.menu.resources")}
        actionGroupComponent={
          <Search
            w="100%"
            size="large"
            colorScheme="techPurple"
            onChange={handleChangeSearch}
            placeholder={t("dashboard.search")}
            allowClear
          />
        }
      />
      {isLoading ? (
        <FullSectionLoading />
      ) : resourceList.length > 0 ? (
        <>
          {dividerShown && <Divider direction="horizontal" />}
          <div css={cardContainerStyle} onScroll={onContainerScroll}>
            {resourceList?.map((resourceInfo) => (
              <ResourceCard
                key={resourceInfo.resourceID}
                resourceType={resourceInfo.resourceType}
                resourceName={resourceInfo.resourceName}
                resourceID={resourceInfo.resourceID}
                dbName={getDBName(resourceInfo)}
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
