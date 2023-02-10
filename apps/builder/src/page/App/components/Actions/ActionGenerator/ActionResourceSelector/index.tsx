import { FC, useCallback, useState } from "react"
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
    resourceList[0]?.resourceId,
  )

  const [loading, setLoading] = useState(false)

  const handleClickCreateAction = useCallback(() => {
    handleCreateAction(
      selectedResourceId,
      () => onCreateAction?.(actionType, selectedResourceId),
      setLoading,
    )
  }, [actionType, handleCreateAction, onCreateAction, selectedResourceId])

  return (
    <div css={containerStyle}>
      <List
        bordered={false}
        height={550}
        data={resourceList}
        renderKey={(data) => {
          return data.resourceId
        }}
        renderRaw
        render={(r) => {
          return (
            <div
              css={applyResourceItemStyle(r.resourceId === selectedResourceId)}
              onClick={() => {
                setSelectedResourceId(r.resourceId)
              }}
            >
              {getIconFromActionType(r.resourceType, "24px")}
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
