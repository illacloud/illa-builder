import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getIconFromActionType } from "@/page/App/components/Actions/getIcon"
import { getActionNameFromActionType } from "@/utils/actionResourceTransformer"
import { ActionTypeSelectorCardProps } from "./interface"
import { applyItemStyle, comingStyle, nameStyle } from "./style"

export const ActionCard: FC<ActionTypeSelectorCardProps> = (props) => {
  const { actionType, onSelect, isDraft } = props
  const { t } = useTranslation()

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
      <span css={nameStyle}>{getActionNameFromActionType(actionType)}</span>
      {isDraft && (
        <span css={comingStyle}>
          {t("editor.action.resource.card.coming_soon")}
        </span>
      )}
    </div>
  )
}

ActionCard.displayName = "ActionCard"
