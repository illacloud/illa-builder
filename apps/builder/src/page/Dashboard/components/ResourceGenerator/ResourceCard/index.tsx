import { FC } from "react"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import {
  getResourceNameFromResourceType,
  getResourceSubTitleFromResourceType,
} from "@/utils/actionResourceTransformer"
import { ResourceCardSelectorProps } from "./interface"
import {
  applyItemStyle,
  nameStyle,
  subTitleStyle,
  titleContainerStyle,
} from "./style"

export const ResourceCard: FC<ResourceCardSelectorProps> = (props) => {
  const { resourceType, onSelect, isDraft } = props

  const subTitle = getResourceSubTitleFromResourceType(resourceType)

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
      <div css={titleContainerStyle}>
        <div css={nameStyle}>
          {getResourceNameFromResourceType(resourceType)}
        </div>
        {subTitle !== "" && <div css={subTitleStyle}>{subTitle}</div>}
      </div>
    </div>
  )
}

ResourceCard.displayName = "ResourceCard"
