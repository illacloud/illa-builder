import { FC } from "react"
import { ResourceCard } from "@/page/Dashboard/components/ResourceGenerator/ResourceCard"
import { ResourceTypeList } from "@/page/Dashboard/components/ResourceGenerator/config"
import { ResourceTypeSelectorProps } from "./interface"
import { categoryStyle, containerStyle, resourceListStyle } from "./style"

export const ResourceTypeSelector: FC<ResourceTypeSelectorProps> = (props) => {
  const { onSelect } = props

  return (
    <div css={containerStyle}>
      {ResourceTypeList.map(({ title, item, category }) => (
        <div key={category}>
          <span css={categoryStyle}>{title}</span>
          <div css={resourceListStyle}>
            {item.map((prop) => (
              <ResourceCard
                key={prop.resourceType}
                onSelect={(item) => {
                  onSelect(item)
                }}
                {...prop}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

ResourceTypeSelector.displayName = "ResourceTypeSelector"
