import { FC } from "react"
import { ActionTypeSelectorCardProps } from "./interface"
import { applyItemStyle, nameStyle } from "./style"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import { useTranslation } from "react-i18next"
import { getActionNameFromActionType } from "@/utils/actionResourceTransformer"

export const ActionCard: FC<ActionTypeSelectorCardProps> = (props) => {
  const { actionType, onSelect, isDraft } = props
  const { t } = useTranslation()

  return (
    <div css={applyItemStyle} onClick={() => onSelect?.(actionType)}>
      {getIconFromActionType(actionType, "24px")}
      <span css={nameStyle}>{getActionNameFromActionType(actionType)}</span>
    </div>
  )
}

ActionCard.displayName = "ActionCard"
