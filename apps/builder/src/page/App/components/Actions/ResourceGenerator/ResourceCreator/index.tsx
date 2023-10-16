import { ResourceType } from "@illa-public/public-types"
import { FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { ResourceCreatorProps } from "@/page/App/components/Actions/ResourceGenerator/ResourceCreator/interface"
import { RootState } from "@/store"
import { ConfigElement } from "../ConfigElements"
import { ConfigElementProvider } from "../ConfigElements/provider"

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack, onFinished } = props
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const finalResourceType = resource ? resource.resourceType : resourceType
  const handleBack = useCallback(() => onBack("select"), [onBack])

  return (
    <ConfigElementProvider
      resourceType={finalResourceType as ResourceType}
      onFinished={onFinished}
      resourceID={resourceID}
    >
      <ConfigElement
        resourceType={finalResourceType}
        resourceID={resourceID}
        onBack={handleBack}
      />
    </ConfigElementProvider>
  )
}
