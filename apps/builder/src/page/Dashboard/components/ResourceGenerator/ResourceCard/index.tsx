import { FC } from "react"
import { applyItemStyle, comingStyle, nameStyle } from "./style"
import { ResourceCardSelectorProps } from "./interface"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { useTranslation } from "react-i18next"

export const ResourceCard: FC<ResourceCardSelectorProps> = (props) => {
  const { resourceType, onSelect, isDraft } = props

  const { t } = useTranslation()

  return (
    <div
      css={applyItemStyle(isDraft)}
      onClick={() => {
        if (!isDraft) {
          onSelect?.(resourceType)
        }
      }}
    >
      {getIconFromResourceType(resourceType, "24px")}
      <span css={nameStyle}>
        {getResourceNameFromResourceType(resourceType)}
      </span>
      {isDraft && (
        <span css={comingStyle}>
          {t("editor.action.resource.card.coming_soon")}
        </span>
      )}
    </div>
  )
}

ResourceCard.displayName = "ResourceCard"
