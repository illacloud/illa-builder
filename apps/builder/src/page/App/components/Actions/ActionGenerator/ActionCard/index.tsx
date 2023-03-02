import { FC } from "react"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import {
  subTitleStyle,
  titleContainerStyle,
} from "@/page/Dashboard/components/ResourceGenerator/ResourceCard/style"
import {
  getActionNameFromActionType,
  getActionSubTitleFromActionType,
} from "@/utils/actionResourceTransformer"
import { ActionTypeSelectorCardProps } from "./interface"
import { applyItemStyle, nameStyle } from "./style"

export const ActionCard: FC<ActionTypeSelectorCardProps> = (props) => {
  const { actionType, onSelect, isDraft } = props

  const subTitle = getActionSubTitleFromActionType(actionType)

  return (
    <div
      css={applyItemStyle(isDraft)}
      onClick={() => {
        if (!isDraft) {
          onSelect?.(actionType)
        }
      }}
    >
      {getIconFromActionType(actionType, "24px")}
      <div css={titleContainerStyle}>
        <div css={nameStyle}>{getActionNameFromActionType(actionType)}</div>
        {subTitle !== "" && <div css={subTitleStyle}>{subTitle}</div>}
      </div>
    </div>
  )
}

ActionCard.displayName = "ActionCard"
