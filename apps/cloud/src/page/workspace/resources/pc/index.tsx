import { ResourceCard, TeamContentEmpty } from "@illa-public/dashboard"
import { USER_ROLE } from "@illa-public/public-types"
import { ResourceTypeSelector } from "@illa-public/resource-generator"
import {
  getCurrentId,
  getCurrentTeamInfo,
  getPlanUtils,
} from "@illa-public/user-data"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  canAccess,
} from "@illa-public/user-role-utils"
import { getAuthToken, getILLABuilderURL } from "@illa-public/utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { mutate } from "swr"
import { Button, Divider, Modal, PlusIcon, Search } from "@illa-design/react"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { DashboardHeader } from "@/page/workspace/components/Header"
import { useSearch } from "@/page/workspace/hooks"
import { fetchDeleteResource, useResourceList } from "@/services/swr/resource"
import { useDividerLine } from "../../layout/hook"
import { getDBName } from "../utils"
import { cardContainerStyle, resourceContainerStyle } from "./style"

export const PCResourcesWorkspace: FC = () => {
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  const canAccessResourceList = canAccess(
    currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.RESOURCE,
    getPlanUtils(currentTeamInfo),
    ACTION_ACCESS.VIEW,
  )
  const { data: resourceList = [], isLoading } = useResourceList(
    canAccessResourceList,
  )
  const { teamIdentifier } = useParams()
  const currentTeamID = useSelector(getCurrentId)!

  const [resourceListResult, handleChangeSearch] = useSearch(
    resourceList ?? [],
    ["resourceName"],
  )

  const [dividerShown, onContainerScroll] = useDividerLine()

  const [resourceSelectorVisible, setResourceSelectorVisible] = useState(false)

  const onSelectResourceType = (resourceType: string) => {
    window.open(
      `${getILLABuilderURL()}/${teamIdentifier}/resource/new/${resourceType}?token=${getAuthToken()}`,
    )
  }

  const onResourceDelete = (resourceID: string) => {
    const newResourceList = resourceList.filter(
      (item) => item.resourceID !== resourceID,
    )
    const options = {
      optimisticData: newResourceList,
      rollbackOnError(error: unknown) {
        if (error instanceof Error) {
          return error.name !== "AbortError"
        }
        return true
      },
    }
    return mutate(
      ["/resources", currentTeamID, canAccessResourceList],
      async (resourceList) => {
        const response = await fetchDeleteResource(resourceID, currentTeamID)
        if (Array.isArray(resourceList))
          return resourceList.filter(
            (item) => item.resourceID !== response.data.resourceID,
          )
        return []
      },
      options,
    )
  }

  return (
    <div css={resourceContainerStyle}>
      <DashboardHeader
        titleName={t("page.workspace.menu.resources")}
        actionGroupComponent={
          <>
            <Search
              w="200px"
              size="large"
              colorScheme="techPurple"
              onChange={handleChangeSearch}
              placeholder={t("dashboard.search")}
              allowClear
            />
            <Button
              size="large"
              colorScheme="techPurple"
              leftIcon={<PlusIcon />}
              w="200px"
              onClick={() => setResourceSelectorVisible(true)}
            >
              {t("new_dashboard.button.blank")}
            </Button>
          </>
        }
      />
      {isLoading ? (
        <FullSectionLoading />
      ) : resourceListResult.length > 0 ? (
        <>
          {dividerShown && <Divider direction="horizontal" />}
          <div css={cardContainerStyle} onScroll={onContainerScroll}>
            {resourceListResult?.map((resourceInfo) => (
              <ResourceCard
                key={resourceInfo.resourceID}
                resourceType={resourceInfo.resourceType}
                resourceName={resourceInfo.resourceName}
                resourceID={resourceInfo.resourceID}
                onDeleteResource={onResourceDelete}
                onEditResource={() => {
                  window.open(
                    `${getILLABuilderURL()}/${teamIdentifier}/resource/edit/${
                      resourceInfo.resourceID
                    }?token=${getAuthToken()}`,
                  )
                }}
                dbName={getDBName(resourceInfo)}
              />
            ))}
          </div>
        </>
      ) : (
        <TeamContentEmpty
          loading={false}
          onClickButton={() => setResourceSelectorVisible(true)}
          showCreate
        />
      )}
      {resourceSelectorVisible && (
        <Modal
          visible={resourceSelectorVisible}
          w="1080px"
          footer={false}
          closable
          maskClosable
          withoutLine
          withoutPadding
          title={t("editor.action.form.title.select")}
          onCancel={() => setResourceSelectorVisible(false)}
        >
          <ResourceTypeSelector onSelect={onSelectResourceType} />
        </Modal>
      )}
    </div>
  )
}
