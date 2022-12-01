import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  AddIcon,
  Button,
  ButtonGroup,
  List,
  PaginationPreIcon,
  useMessage,
} from "@illa-design/react"
import { Api } from "@/api/base"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import { configActions } from "@/redux/config/configSlice"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import {
  ActionContent,
  ActionItem,
  actionItemInitial,
} from "@/redux/currentApp/action/actionState"
import { getInitialContent } from "@/redux/currentApp/action/getInitialContent"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { getResourceTypeFromActionType } from "@/utils/actionResourceTransformer"
import { fromNow } from "@/utils/dayjs"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
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
  const { actionType, onBack, onCreateAction, onCreateResource } = props

  const { t } = useTranslation()

  const appInfo = useSelector(getAppInfo)

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

  const message = useMessage()

  const dispatch = useDispatch()

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
          leftIcon={<PaginationPreIcon />}
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
            onClick={() => {
              const displayName =
                DisplayNameGenerator.generateDisplayName(actionType)
              const initialContent = getInitialContent(actionType)
              const data: Partial<ActionItem<ActionContent>> = {
                actionType,
                displayName,
                resourceId: selectedResourceId,
                content: initialContent,
                ...actionItemInitial,
              }
              Api.request(
                {
                  url: `/apps/${appInfo.appId}/actions`,
                  method: "POST",
                  data,
                },
                ({ data }: { data: ActionItem<ActionContent> }) => {
                  message.success({
                    content: t(
                      "editor.action.action_list.message.success_created",
                    ),
                  })
                  dispatch(actionActions.addActionItemReducer(data))
                  dispatch(configActions.changeSelectedAction(data))
                  onCreateAction?.(actionType, selectedResourceId)
                },
                () => {
                  message.error({
                    content: t("editor.action.action_list.message.failed"),
                  })
                  DisplayNameGenerator.removeDisplayName(displayName)
                },
                () => {
                  DisplayNameGenerator.removeDisplayName(displayName)
                },
                (loading) => {
                  setLoading(loading)
                },
              )
            }}
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
