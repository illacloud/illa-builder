import { FC } from "react"
import { applyItemStyle, nameStyle } from "./style"
import { ResourceCardSelectorProps } from "./interface"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"

export const ResourceCard: FC<ResourceCardSelectorProps> = (props) => {
  const { resourceType, onSelect } = props

  return (
    <div css={applyItemStyle} onClick={() => onSelect?.(resourceType)}>
      {getIconFromResourceType(resourceType, "24px")}
      <span css={nameStyle}>
        {getResourceNameFromResourceType(resourceType)}
      </span>
    </div>
  )
}

ResourceCard.displayName = "ResourceCard"
