import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { AddIcon, Button, PreviousIcon } from "@illa-design/react"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@/illa-public-component/MixpanelUtils/interface"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { getResourceTypeFromActionType } from "@/utils/actionResourceTransformer"
import { track } from "@/utils/mixpanelHelper"
import { ActionResourceSelectorProps } from "./interface"
import { containerStyle, footerStyle } from "./style"

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

  const resourceList = useSelector(getAllResources).filter(
    (r) => r.resourceType == getResourceTypeFromActionType(actionType),
  )

  const [loading, setLoading] = useState(false)

  const handleClickCreateAction = useCallback(
    (selectedResourceId: string) => {
      handleCreateAction(
        selectedResourceId,
        () => onCreateAction?.(actionType, selectedResourceId),
        setLoading,
      )
    },
    [actionType, handleCreateAction, onCreateAction],
  )

  const handleClickCreateAgent = useCallback(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
      {
        element: "agent_list_new",
        parameter1: actionType,
      },
    )
    // create agent
    // navigate to edit new agent
  }, [actionType])

  useEffect(() => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.SHOW,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR,
      {
        element: "agent_list_show",
        parameter1: actionType,
      },
    )
  }, [actionType])

  return (
    <div css={containerStyle}>
      <div>list</div>
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
        <Button
          colorScheme="techPurple"
          leftIcon={<AddIcon />}
          onClick={handleClickCreateAgent}
          loading={loading}
        >
          {t("New AI Agent")}
        </Button>
      </div>
    </div>
  )
}

ActionResourceSelector.displayName = "ActionResourceSelector"
