import { FC } from "react"
import { ActionTypeSelectorCardProps } from "./interface"
import { applyItemStyle, nameStyle } from "./style"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import { getActionNameFromActionType } from "@/redux/resource/resourceState"

export const ActionCard: FC<ActionTypeSelectorCardProps> = (props) => {
  const { actionType, onSelect } = props

  return (
    <div css={applyItemStyle} onClick={() => onSelect?.(actionType)}>
      {getIconFromActionType(actionType, "32px")}
      <span css={nameStyle}>{getActionNameFromActionType(actionType)}</span>
    </div>
  )
}

ActionCard.displayName = "ActionCard"
