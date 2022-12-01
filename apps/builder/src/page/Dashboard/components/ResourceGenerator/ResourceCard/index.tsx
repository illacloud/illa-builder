import { FC } from "react"
import { useTranslation } from "react-i18next"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { ResourceCardSelectorProps } from "./interface"
import { applyItemStyle, comingStyle, nameStyle } from "./style"

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
