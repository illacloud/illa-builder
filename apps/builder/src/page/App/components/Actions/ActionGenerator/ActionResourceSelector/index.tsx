import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { FC, Suspense, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  AddIcon,
  Button,
  ButtonGroup,
  List,
  PreviousIcon,
} from "@illa-design/react"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { getResourceTypeFromActionType } from "@/utils/actionResourceTransformer"
import { fromNow } from "@/utils/dayjs"
import { track } from "@/utils/mixpanelHelper"
import { ActionResourceSelectorProps } from "./interface"
import {
  applyResourceItemStyle,
  containerStyle,
  footerStyle,
  resourceItemTimeStyle,
  resourceItemTitleStyle,
} from "./style"

export const ActionResourceSelector: FC<ActionResourceSelectorProps> = (
  props,
) => {
  const {
    actionType,
    onBack,
    onCreateAction,
    onCreateResource,
    handleCreateAction,
  } = props

  const { t } = useTranslation()

  const resourceList = useSelector(getAllResources)
    .filter((r) => r.resourceType == getResourceTypeFromActionType(actionType))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

  const [selectedResourceId, setSelectedResourceId] = useState<string>(
    resourceList[0]?.resourceID,
  )

  const [loading, setLoading] = useState(false)

  const handleClickCreateAction = useCallback(() => {
    handleCreateAction(
      selectedResourceId,
      () => onCreateAction?.(actionType, selectedResourceId),
      setLoading,
    )
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
      {
        element: "resource_list_create_action",
        parameter1: actionType,
      },
    )
  }, [actionType, handleCreateAction, onCreateAction, selectedResourceId])

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
      {
        element: "resource_list_show",
        parameter1: actionType,
      },
    )
  }, [actionType])

  return (
    <div css={containerStyle}>
      <List
        bordered={false}
        height={550}
        data={resourceList}
        split={false}
        itemHeight={48}
        renderKey={(data) => {
          return data.resourceID
        }}
        h="550px"
        renderRaw
        render={(r) => {
          return (
            <div
              css={applyResourceItemStyle(r.resourceID === selectedResourceId)}
              onClick={() => {
                setSelectedResourceId(r.resourceID)
              }}
            >
              <Suspense>
                {getIconFromActionType(r.resourceType, "24px")}
              </Suspense>
              <span css={resourceItemTitleStyle}>{r.resourceName}</span>
              <span css={resourceItemTimeStyle}>
                {t("created_at") + " " + fromNow(r.createdAt)}
              </span>
            </div>
          )
        }}
      />
      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          onClick={() => {
            onBack("select")
          }}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="gray"
            onClick={() => {
              track(
                ILLA_MIXPANEL_EVENT_TYPE.CLICK,
                ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
                {
                  element: "resource_list_new",
                  parameter1: actionType,
                },
              )
              onCreateResource?.(getResourceTypeFromActionType(actionType)!!)
            }}
          >
            {t("editor.action.action_list.action_generator.btns.new_resource")}
          </Button>
          <Button
            colorScheme="techPurple"
            onClick={handleClickCreateAction}
            loading={loading}
            disabled={resourceList.length <= 0}
          >
            {t("editor.action.action_list.action_generator.btns.create_action")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

ActionResourceSelector.displayName = "ActionResourceSelector"
