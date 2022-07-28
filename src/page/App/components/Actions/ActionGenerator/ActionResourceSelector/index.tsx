import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddIcon, PaginationPreIcon } from "@illa-design/icon"
import { Button, ButtonGroup } from "@illa-design/button"
import { ActionResourceSeletorProps } from "./interface"
import {
  containerStyle,
  titleStyle,
  footerStyle,
  listStyle,
  resourceItemTitleStyle,
  resourceItemTimeStyle,
  applyResourceItemStyle,
} from "./style"
import i18n from "@/i18n/config"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import dayjs from "dayjs"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { useParams } from "react-router-dom"
import {
  ActionContent,
  ActionItem,
  ActionType,
} from "@/redux/currentApp/action/actionState"
import { Api } from "@/api/base"
import { actionActions } from "@/redux/currentApp/action/actionSlice"
import { DisplayNameGenerator } from "@/utils/generators/generateDisplayName"
import { Message } from "@illa-design/message"

export const ActionResourceSelector: FC<ActionResourceSeletorProps> = (
  props,
) => {
  const {
    actionType,
    onBack,
    onCreateAction,
    onCreateResource,
    defaultSelected = "",
  } = props
  const dispatch = useDispatch()
  const resourceList = useSelector(getAllResources)
    .filter((r) => r.resourceType === actionType)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  const [selectedResourceId, setSelectedResourceId] = useState<string>("")
  const [loading, setLoading] = useState<boolean>()

  const params = useParams()
  const baseActionUrl = `/apps/${params.appId}/actions`

  function onAddActionItem(actionType: ActionType) {
    const displayName = DisplayNameGenerator.getDisplayName(actionType)
    const data: Partial<ActionItem<{}>> = {
      displayName,
      actionType,
      resourceId: selectedResourceId,
    }
    Api.request(
      {
        url: baseActionUrl,
        method: "POST",
        data,
      },
      ({ data }: { data: ActionItem<ActionContent> }) => {
        dispatch(actionActions.addActionItemReducer(data))
        onCreateAction?.(actionType, selectedResourceId)
        Message.success(
          i18n.t("editor.action.action_list.message.success_created"),
        )
      },
      () => {
        Message.error(i18n.t("editor.action.action_list.message.failed"))
        DisplayNameGenerator.removeDisplayName(displayName)
      },
      () => {},
      (loading) => {
        setLoading(loading)
      },
    )
  }

  useEffect(() => {
    console.log({ resourceList })
    if (resourceList.length === 0) {
      onCreateResource?.(actionType)
    }
  }, [])

  useEffect(() => {
    setSelectedResourceId(
      defaultSelected || (resourceList[0]?.resourceId ?? ""),
    )
  }, [defaultSelected])

  return (
    <div css={containerStyle}>
      <div css={titleStyle}>
        {i18n.t(
          "editor.action.action_list.action_generator.title.choose_resource",
        )}
      </div>

      <div css={listStyle}>
        {resourceList.map((r) => (
          <div
            key={r.resourceId}
            css={applyResourceItemStyle(r.resourceId === selectedResourceId)}
            onClick={() => setSelectedResourceId(r.resourceId ?? "")}
          >
            {getIconFromActionType(r.resourceType, "24px")}
            <span css={resourceItemTitleStyle}>{r.resourceName}</span>
            <span css={resourceItemTimeStyle}>
              {dayjs.utc(r.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        ))}
      </div>

      <div css={footerStyle}>
        <Button
          leftIcon={<PaginationPreIcon />}
          variant="text"
          colorScheme="gray"
          onClick={onBack}
        >
          {i18n.t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="gray"
            onClick={() => {
              onCreateResource?.(actionType)
            }}
          >
            {i18n.t(
              "editor.action.action_list.action_generator.btns.new_resource",
            )}
          </Button>
          <Button
            colorScheme="techPurple"
            onClick={() => actionType && onAddActionItem(actionType)}
            loading={loading}
          >
            {i18n.t(
              "editor.action.action_list.action_generator.btns.create_action",
            )}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

ActionResourceSelector.displayName = "ActionResourceSelector"
