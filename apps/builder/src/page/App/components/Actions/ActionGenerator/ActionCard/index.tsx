import { getIconFromResourceType } from "@illa-public/icon"
import {
  getResourceNameFromResourceType,
  useResourceTypeToResourceName,
} from "@illa-public/resource-generator"
import { FC, Suspense, useCallback } from "react"
import AIAgentCard from "./components/AIAgentCard"
import { ActionTypeSelectorCardProps } from "./interface"
import {
  applyItemStyle,
  nameStyle,
  subTitleStyle,
  titleContainerStyle,
} from "./style"

export const ActionCard: FC<ActionTypeSelectorCardProps> = (props) => {
  const { actionType, onSelect } = props

  const subTitle = useResourceTypeToResourceName(actionType)

  const onClickCard = useCallback(() => {
    onSelect?.(actionType)
  }, [actionType, onSelect])

  if (actionType === "aiagent") {
    return <AIAgentCard onClickCard={onClickCard} />
  }

  return (
    <div css={applyItemStyle} onClick={onClickCard}>
      <Suspense> {getIconFromResourceType(actionType, "24px")}</Suspense>
      <div css={titleContainerStyle}>
        <div css={nameStyle}>{getResourceNameFromResourceType(actionType)}</div>
        {subTitle !== "" && <div css={subTitleStyle}>{subTitle}</div>}
      </div>
    </div>
  )
}

ActionCard.displayName = "ActionCard"
