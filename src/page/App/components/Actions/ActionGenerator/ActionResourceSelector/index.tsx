import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
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
import { getActionList } from "@/redux/currentApp/action/actionSelector"

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
  const resourceList = useSelector(getActionList)
    .filter((r) => r.actionType === actionType)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  const [selectedResourceId, setSelectedResourceId] = useState<string>("")

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
            {getIconFromActionType(r.actionType, "24px")}
            <span css={resourceItemTitleStyle}>{r.displayName}</span>
            <span css={resourceItemTimeStyle}>{r.createdAt}</span>
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
          {i18n.t("editor.action.action_list.action_generator.btns.back")}
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
            onClick={() => onCreateAction?.(actionType, selectedResourceId)}
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
