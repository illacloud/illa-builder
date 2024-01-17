import { getIconFromResourceType } from "@illa-public/icon"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { Resource, ResourceType } from "@illa-public/public-types"
import {
  ResourceGenerator,
  ResourceGeneratorProvider,
} from "@illa-public/resource-generator"
import { FC, Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { AddIcon, Select, SelectOptionObject, Space } from "@illa-design/react"
import { getAgentIcon } from "@/page/App/components/Actions/getIcon"
import { getDashboardTeamAIAgentList } from "@/redux/aiAgent/dashboardTeamAIAgentSelector"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { track } from "@/utils/mixpanelHelper"
import { createNewStyle, itemContainer, itemLogo, itemText } from "./style"
import { LIKE_MYSQL_TYPES, getSameTypeResourceList } from "./utils"

interface ResourceChooseProps {
  changeResourceID: (resourceID: string) => void
  resourceID?: string
  resourceType: string
}

const ResourceChoose: FC<ResourceChooseProps> = ({
  resourceID,
  resourceType: origanResourceType,
  changeResourceID,
}) => {
  const { t } = useTranslation()

  const resourceList = useSelector(getAllResources)
  const aiAgentList = useSelector(getDashboardTeamAIAgentList)
  const finalResourceList = getSameTypeResourceList(
    resourceList,
    origanResourceType,
  )
  const [generatorVisible, setGeneratorVisible] = useState(false)
  const dispatch = useDispatch()
  const isMysqlLike = LIKE_MYSQL_TYPES.includes(origanResourceType)
  const isAIAgent = origanResourceType === "aiagent"

  const createOrUpdateResourceCallback = (
    resource: Resource,
    isUpdate: boolean,
  ) => {
    setGeneratorVisible(false)
    if (!isUpdate) {
      dispatch(resourceActions.addResourceItemReducer(resource))
      changeResourceID(resource.resourceID)
    }
  }

  const options: SelectOptionObject[] = isAIAgent
    ? aiAgentList.map((item) => ({
        label: (
          <div css={itemContainer}>
            <span css={itemLogo}>{getAgentIcon(item, "14px")}</span>
            <span css={itemText}>{item.name}</span>
          </div>
        ),
        value: item.aiAgentID,
      }))
    : finalResourceList.map((item) => ({
        label: (
          <div css={itemContainer}>
            <span css={itemLogo}>
              <Suspense>
                {getIconFromResourceType(item.resourceType, "14px")}
              </Suspense>
            </span>
            <span css={itemText}>{item.resourceName}</span>
          </div>
        ),
        value: item.resourceID,
      }))
  if (!isAIAgent) {
    options.unshift({
      label: (
        <Space
          size="8px"
          direction="horizontal"
          alignItems="center"
          css={createNewStyle}
        >
          <AddIcon size="16px" />
          {t("editor.action.panel.option.resource.new")}
        </Space>
      ),
      value: "create",
    })
  }

  return (
    <>
      <Select
        w="100%"
        colorScheme="techPurple"
        options={options}
        value={resourceID || " Choose a resource"}
        onChange={(value) => {
          if (value === "create" && !isAIAgent) {
            setGeneratorVisible(true)
            return
          }
          changeResourceID(value as string)
        }}
      />
      <MixpanelTrackProvider
        basicTrack={track}
        pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
      >
        <ResourceGeneratorProvider
          getAllResourceSelector={getAllResources}
          createOrUpdateResourceCallback={createOrUpdateResourceCallback}
        >
          <ResourceGenerator
            visible={generatorVisible}
            onClose={() => {
              setGeneratorVisible(false)
            }}
            defaultConfig={{
              defaultResourceType: origanResourceType as ResourceType,
              defaultStep: isMysqlLike ? "select" : "createResource",
            }}
            filterResourceType={(resourceType) => {
              if (isMysqlLike) {
                return LIKE_MYSQL_TYPES.includes(resourceType)
              }
              return true
            }}
          />
        </ResourceGeneratorProvider>
      </MixpanelTrackProvider>
    </>
  )
}

export default ResourceChoose
