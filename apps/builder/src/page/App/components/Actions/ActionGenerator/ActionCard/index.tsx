import { FC, Suspense, useCallback } from "react"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import {
  subTitleStyle,
  titleContainerStyle,
} from "@/page/Dashboard/components/ResourceGenerator/ResourceCard/style"
import {
  getActionNameFromActionType,
  getActionSubTitleFromActionType,
} from "@/utils/actionResourceTransformer"
import { ReactComponent as AgentCard } from "./assets/agent-card.svg"
import { ActionTypeSelectorCardProps } from "./interface"
import { applyAgentCardStyle, applyItemStyle, nameStyle } from "./style"

export const ActionCard: FC<ActionTypeSelectorCardProps> = (props) => {
  const { actionType, onSelect, isDraft } = props

  const subTitle = getActionSubTitleFromActionType(actionType)

  const onClickCard = useCallback(() => {
    if (!isDraft) {
      onSelect?.(actionType)
    }
  }, [actionType, isDraft, onSelect])

  if (actionType === "agent") {
    return (
      <AgentCard css={applyAgentCardStyle(isDraft)} onClick={onClickCard} />
    )
  }

  return (
    <div css={applyItemStyle(isDraft)} onClick={onClickCard}>
      <Suspense> {getIconFromActionType(actionType, "24px")}</Suspense>
      <div css={titleContainerStyle}>
        <div css={nameStyle}>{getActionNameFromActionType(actionType)}</div>
        {subTitle !== "" && <div css={subTitleStyle}>{subTitle}</div>}
      </div>
    </div>
  )
}

ActionCard.displayName = "ActionCard"
