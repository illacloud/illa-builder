import { FC, useEffect, useState } from "react"
import { css } from "@emotion/react"
import { useSelector } from "react-redux"
import { AddIcon, PaginationPreIcon } from "@illa-design/icon"
import { Button, ButtonGroup } from "@illa-design/button"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { ActionTypeIcon } from "@/page/App/components/ActionEditor/components/ActionTypeIcon"
import { ActionResourceSeletorProps } from "./interface"
import {
  containerStyle,
  titleStyle,
  footerStyle,
  listStyle,
  resourceItemContainerStyle,
  resourceItemTitleStyle,
  resourceItemTimeStyle,
  resourceItemIconStyle,
  resourceItemSelectedStyle,
} from "./style"

export const ActionResourceSelector: FC<ActionResourceSeletorProps> = (
  props,
) => {
  const {
    resourceType,
    onBack,
    onCreateAction,
    onCreateResource,
    defaultSelectedResourceId = "",
  } = props
  const resourceList = useSelector(selectAllResource)
    .filter((r) => r.resourceType === resourceType)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  const [selectedResourceId, setSelectedResourceId] = useState<string>("")

  useEffect(() => {
    if (resourceList.length === 0) {
      onCreateResource?.(resourceType)
    }
  }, [])

  useEffect(() => {
    setSelectedResourceId(defaultSelectedResourceId || (resourceList[0]?.resourceId ?? ""))
  }, [defaultSelectedResourceId])

  return (
    <div css={containerStyle}>
      <div css={titleStyle}>Choose a resource</div>

      <div css={listStyle}>
        {resourceList.map((r) => (
          <div
            key={r.resourceId}
            css={css(
              resourceItemContainerStyle,
              r.resourceId === selectedResourceId && resourceItemSelectedStyle,
            )}
            onClick={() => setSelectedResourceId(r.resourceId)}
          >
            <ActionTypeIcon
              actionType={r.resourceType}
              css={resourceItemIconStyle}
            />
            <span css={resourceItemTitleStyle}>{r.resourceName}</span>
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
          Back
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            leftIcon={<AddIcon />}
            colorScheme="gray"
            onClick={() => {
              onCreateResource?.(resourceType)
            }}
          >
            New Resource
          </Button>
          <Button
            colorScheme="techPurple"
            onClick={() => onCreateAction?.(resourceType, selectedResourceId)}
          >
            Create Action
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

ActionResourceSelector.displayName = "ActionResourceSelector"
